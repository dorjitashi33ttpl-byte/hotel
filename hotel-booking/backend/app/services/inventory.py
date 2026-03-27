from sqlalchemy.orm import Session
from sqlalchemy import select, and_, func, or_
from app.models.hotel import Room, Booking, RoomType, ChannelAllocation
from datetime import date, timedelta
from typing import List, Optional

class InventoryService:
    @staticmethod
    def get_available_quantity(
        db: Session,
        room_type_id: str,
        start_date: date,
        end_date: date,
        channel: str = "DIRECT"
    ) -> int:
        """
        Calculates available quantity using pessimistic locking for safe booking.
        Strictly enforces channel allocations.
        """
        # 1. Lock the room type row for update to serialize availability checks
        room_type = db.query(RoomType).filter(RoomType.id == room_type_id).with_for_update().first()
        if not room_type:
            return 0

        # 2. Check channel-specific limit if exists
        alloc = db.query(ChannelAllocation).filter(
            ChannelAllocation.room_type_id == room_type_id,
            ChannelAllocation.channel == channel
        ).first()

        channel_limit = alloc.allocated_quantity if (alloc and alloc.allocated_quantity > 0) else room_type.total_quantity

        # 3. Count total booked across ALL channels to ensure physical capacity
        total_booked_count = db.query(func.count(Booking.id)).filter(
            Booking.room_type_id == room_type_id,
            Booking.status.in_(["CONFIRMED", "CHECKED_IN", "HOLD"]),
            Booking.check_in < end_date,
            Booking.check_out > start_date
        ).scalar() or 0

        # 4. Count booked for THIS SPECIFIC channel (to enforce allocation limit)
        channel_booked_count = db.query(func.count(Booking.id)).filter(
            Booking.room_type_id == room_type_id,
            Booking.channel == channel,
            Booking.status.in_(["CONFIRMED", "CHECKED_IN", "HOLD"]),
            Booking.check_in < end_date,
            Booking.check_out > start_date
        ).scalar() or 0

        physical_avail = room_type.total_quantity - total_booked_count
        channel_avail = channel_limit - channel_booked_count

        return max(0, min(physical_avail, channel_avail))

    @staticmethod
    def get_available_rooms(
        db: Session,
        room_type_id: str,
        start_date: date,
        end_date: date,
        channel: str = "DIRECT"
    ) -> List[Room]:
        """
        Returns specific available rooms (Mode B).
        """
        qty = InventoryService.get_available_quantity(db, room_type_id, start_date, end_date, channel)
        if qty <= 0:
            return []

        # Get all rooms for this type that are NOT undergoing maintenance
        all_rooms = db.query(Room).filter(
            Room.room_type_id == room_type_id,
            Room.is_maintenance == False
        ).all()

        # Get rooms already assigned to overlapping confirmed/hold bookings
        booked_room_ids = db.query(Booking.room_id).filter(
            Booking.room_type_id == room_type_id,
            Booking.room_id != None,
            Booking.status.in_(["CONFIRMED", "CHECKED_IN", "HOLD"]),
            Booking.check_in < end_date,
            Booking.check_out > start_date
        ).all()
        booked_room_ids = [r[0] for r in booked_room_ids]

        return [r for r in all_rooms if r.id not in booked_room_ids]

    @staticmethod
    def validate_and_allocate(
        db: Session,
        room_type_id: str,
        start_date: date,
        end_date: date,
        preferred_room_id: Optional[str] = None,
        channel: str = "DIRECT"
    ) -> Optional[str]:
        """
        Transaction-safe allocation logic.
        """
        qty = InventoryService.get_available_quantity(db, room_type_id, start_date, end_date, channel)
        if qty <= 0:
            return None

        room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()

        if room_type.inventory_mode == "MODE_B":
            available_rooms = InventoryService.get_available_rooms(db, room_type_id, start_date, end_date, channel)
            if not available_rooms:
                return None

            if preferred_room_id:
                target = next((r for r in available_rooms if r.id == preferred_room_id), None)
                if target: return target.id

            return available_rooms[0].id

        return "QUANTITY_RESERVED"

inventory_service = InventoryService()
