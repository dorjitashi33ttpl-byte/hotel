from sqlalchemy.orm import Session
from sqlalchemy import select, and_, func
from app.models.hotel import Room, Booking, RoomType, ChannelAllocation
from datetime import date, timedelta
from typing import List, Optional

class InventoryService:
    @staticmethod
    async def get_available_quantity(db: Session, room_type_id: str, start_date: date, end_date: date, channel: str = "DIRECT") -> int:
        """
        Calculates available quantity, respecting channel allocations.
        """
        room_type = await db.get(RoomType, room_type_id)
        if not room_type: return 0

        # 1. Check channel-specific limit
        alloc = db.query(ChannelAllocation).filter(
            ChannelAllocation.room_type_id == room_type_id,
            ChannelAllocation.channel == channel
        ).first()

        limit = alloc.allocated_quantity if alloc else room_type.total_quantity

        # 2. Count existing bookings for this channel
        # (In a real system, we'd check availability across all channels to prevent overbooking total capacity)
        stmt = select(func.count(Booking.id)).where(
            Booking.room_type_id == room_type_id,
            Booking.status != "CANCELLED",
            and_(
                Booking.check_in < end_date,
                Booking.check_out > start_date
            )
        )
        booked_count = await db.scalar(stmt)

        return max(0, min(limit, room_type.total_quantity) - booked_count)

    @staticmethod
    async def get_available_room_numbers(db: Session, room_type_id: str, start_date: date, end_date: date) -> List[Room]:
        all_rooms_stmt = select(Room).where(Room.room_type_id == room_type_id, Room.is_maintenance == False)
        all_rooms = (await db.execute(all_rooms_stmt)).scalars().all()

        booked_room_ids_stmt = select(Booking.room_id).where(
            Booking.room_type_id == room_type_id,
            Booking.room_id != None,
            Booking.status != "CANCELLED",
            and_(
                Booking.check_in < end_date,
                Booking.check_out > start_date
            )
        )
        booked_room_ids = (await db.execute(booked_room_ids_stmt)).scalars().all()

        return [r for r in all_rooms if r.id not in booked_room_ids]

inventory_service = InventoryService()
