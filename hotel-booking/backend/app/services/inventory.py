from datetime import datetime, date
from sqlalchemy.orm import Session
from sqlalchemy import and_, select, func
from app.models.hotel import Hotel, Room, RoomType, InventoryMode, ChannelConfig
from app.models.booking import Booking, BookingStatus

class InventoryService:
    @staticmethod
    async def get_availability_calendar(db: Session, hotel_id: int, start_date: date, end_date: date):
        # High performance occupancy matrix calculation
        room_types = db.query(RoomType).filter(RoomType.hotel_id == hotel_id).all()

        # In a real app, this would use a series of optimized SQL counts grouped by date
        # SELECT check_in, count(*) FROM bookings GROUP BY check_in
        return {"hotel_id": hotel_id, "availability": []}

    @staticmethod
    async def check_and_reserve(
        db: Session, hotel_id: int, room_type_id: int, check_in: datetime, check_out: datetime,
        booking_id: int, channel: str = "direct"
    ) -> bool:
        hotel = db.execute(select(Hotel).where(Hotel.id == hotel_id).with_for_update()).scalar_one_or_none()
        if not hotel: return False

        # Channel specific allocation check
        if channel != "direct":
            config = db.query(ChannelConfig).filter(ChannelConfig.hotel_id == hotel_id, ChannelConfig.channel_name == channel).first()
            if not config or not config.is_active: return False

        if hotel.inventory_mode == InventoryMode.ROOM_TYPE:
            rt = db.query(RoomType).filter(RoomType.id == room_type_id).with_for_update().first()
            count = db.query(Booking).filter(
                Booking.room_type_id == room_type_id,
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
            ).count()
            return count < rt.total_quantity
        else:
            # Mode B: Assignment
            subquery = db.query(Booking.room_id).filter(
                Booking.room_type_id == room_type_id,
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
            ).subquery()
            available = db.query(Room).filter(Room.room_type_id == room_type_id, Room.is_active == True, ~Room.id.in_(subquery)).first()
            if available:
                if booking_id > 0:
                    b = db.query(Booking).filter(Booking.id == booking_id).first()
                    if b: b.room_id = available.id
                return True
        return False

inventory_service = InventoryService()
