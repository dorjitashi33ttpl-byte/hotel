from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, select
from app.models.hotel import Hotel, Room, RoomType, InventoryMode
from app.models.booking import Booking, BookingStatus

class InventoryService:
    @staticmethod
    async def check_and_reserve(
        db: Session,
        hotel_id: int,
        room_type_id: int,
        check_in: datetime,
        check_out: datetime,
        booking_id: int
    ) -> bool:
        # Use SELECT ... FOR UPDATE for transactional safety
        # This prevents double booking by locking the relevant rows
        hotel = db.execute(
            select(Hotel).where(Hotel.id == hotel_id).with_for_update()
        ).scalar_one_or_none()

        if not hotel: return False

        # Mode A: Room-Type Inventory (quantity based)
        if hotel.inventory_mode == InventoryMode.ROOM_TYPE:
            room_type = db.execute(
                select(RoomType).where(RoomType.id == room_type_id).with_for_update()
            ).scalar_one()

            # Count existing confirmed/hold bookings
            count = db.query(Booking).filter(
                Booking.room_type_id == room_type_id,
                Booking.status.in_([BookingStatus.CONFIRMED, BookingStatus.HOLD]),
                and_(Booking.check_in < check_out, Booking.check_out > check_in)
            ).count()

            if count < room_type.total_quantity:
                # Room available
                return True

        # Mode B: Fixed Room Numbers
        else:
            # Find an available room that isn't booked
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
                # Assign this specific room to the booking
                booking = db.query(Booking).filter(Booking.id == booking_id).first()
                booking.room_id = available_room.id
                return True

        return False

inventory_service = InventoryService()
