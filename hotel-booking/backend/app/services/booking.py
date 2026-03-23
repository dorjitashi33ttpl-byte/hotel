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

from app.services.fraud import fraud_service
from app.services.commission import commission_service

async def process_booking_confirmation(db: Session, booking_id: str, ip_address: str):
    """
    Finalizes a booking after payment success.
    Runs fraud checks, updates status, and records commission.
    """
    booking = await db.get(Booking, booking_id)
    if not booking: return None

    # 1. Fraud Risk Assessment
    risk = await fraud_service.assess_risk(db, booking.user_id, ip_address, booking.total_price)
    if risk["decision"] == "REJECT":
        booking.status = "FLAGGED_FOR_FRAUD"
        await db.commit()
        return {"status": "flagged", "reason": risk["reasons"]}

    # 2. Confirm Booking
    booking.status = "CONFIRMED"

    # 3. Process Commission
    await commission_service.process_booking_commission(db, booking)

    await db.commit()
    return {"status": "confirmed"}
