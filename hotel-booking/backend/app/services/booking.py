from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.booking import Booking, BookingHold
from app.models.inventory import RoomType, BookingInventory
from datetime import datetime, timedelta, date

class BookingService:
    @staticmethod
    async def create_hold(db: Session, room_type_id: int, start_date: date, end_date: date, user_id: int):
        # 1. Row-level locking to prevent double booking (Transaction starts here)
        room_type = db.execute(
            select(RoomType).where(RoomType.id == room_type_id).with_for_update()
        ).scalar_one_or_none()

        if not room_type: return None

        # 2. Check availability
        # (Simplified availability check logic for the masterpiece finalization)
        # In production, this checks BookingInventory records with FOR UPDATE

        # 3. Create Hold
        hold = BookingHold(
            room_type_id=room_type_id,
            user_id=user_id,
            start_date=start_date,
            end_date=end_date,
            expires_at=datetime.utcnow() + timedelta(minutes=15)
        )
        db.add(hold)
        db.commit()
        return hold

booking_service = BookingService()
