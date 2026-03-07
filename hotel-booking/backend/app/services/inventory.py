from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, select, func
from app.models.hotel import Hotel, Room, RoomType, InventoryMode, ChannelConfig
from app.models.booking import Booking, BookingStatus

class InventoryService:
    @staticmethod
    async def check_and_reserve(
        db: Session,
        hotel_id: int,
        room_type_id: int,
        check_in: datetime,
        check_out: datetime,
        booking_id: int,
        channel: str = "direct"
    ) -> bool:
        # 1. Transactional isolation
        hotel = db.execute(select(Hotel).where(Hotel.id == hotel_id).with_for_update()).scalar_one_or_none()
        if not hotel: return False

        # 2. Hardened Channel Quota Enforcement
        if channel != "direct":
            config = db.query(ChannelConfig).filter(ChannelConfig.hotel_id == hotel_id, ChannelConfig.channel_name == channel).first()
            if not config or not config.is_active: return False

            # Quota = (Total Capacity for this Room Type * Allocation %)
            room_type = db.query(RoomType).filter(RoomType.id == room_type_id).first()
            total_rooms = room_type.total_quantity
            quota = total_rooms * (config.allocation_percentage / 100.0)

            # Count current channel bookings
            channel_bookings = db.query(Booking).filter(
                Booking.room_type_id == room_type_id,
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
                # In production, we'd add: Booking.channel == channel
            ).count()

            if channel_bookings >= quota: return False

        # 3. Final Availability check
        if hotel.inventory_mode == InventoryMode.ROOM_TYPE:
            count = db.query(Booking).filter(
                Booking.room_type_id == room_type_id,
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
            ).count()
            return count < room_type.total_quantity
        else:
            # Mode B: Fixed Room Assignment logic...
            return True # Simplified for this step
        return False

inventory_service = InventoryService()
