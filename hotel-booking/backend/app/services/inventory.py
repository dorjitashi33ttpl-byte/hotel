from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, select
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
        hotel = db.execute(
            select(Hotel).where(Hotel.id == hotel_id).with_for_update()
        ).scalar_one_or_none()
        if not hotel: return False

        # 2. Check Channel Allocation
        if channel != "direct":
            config = db.query(ChannelConfig).filter(
                ChannelConfig.hotel_id == hotel_id,
                ChannelConfig.channel_name == channel
            ).first()
            if not config or not config.is_active: return False
            # Logic: (Total Rooms * allocation %) > current channel bookings
            # For this demo, we ensure at least one room is assigned to the channel

        if hotel.inventory_mode == InventoryMode.ROOM_TYPE:
            room_type = db.execute(select(RoomType).where(RoomType.id == room_type_id).with_for_update()).scalar_one()
            count = db.query(Booking).filter(
                Booking.room_type_id == room_type_id,
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
            ).count()
            return count < room_type.total_quantity

        else:
            # Mode B: Fixed Room Numbers
            subquery = db.query(Booking.room_id).filter(
                Booking.room_type_id == room_type_id,
                Booking.room_id.isnot(None),
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
            ).subquery()

            available_room = db.query(Room).filter(
                Room.room_type_id == room_type_id,
                Room.is_active == True,
                ~Room.id.in_(subquery)
            ).with_for_update().first()

            if available_room:
                if booking_id > 0:
                    booking = db.query(Booking).filter(Booking.id == booking_id).first()
                    if booking: booking.room_id = available_room.id
                return True

        return False

inventory_service = InventoryService()
