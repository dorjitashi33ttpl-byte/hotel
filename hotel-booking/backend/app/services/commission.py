from sqlalchemy.orm import Session
from app.models.hotel import Booking
from app.models.payment import CommissionLedger
import uuid

class CommissionService:
    @staticmethod
    async def process_booking_commission(db: Session, booking: Booking):
        """
        Calculates and records platform commission for a confirmed booking.
        Fixed at 2% as per requirements.
        """
        commission_rate = 0.02
        commission_amount = booking.total_price * commission_rate
        net_amount = booking.total_price - commission_amount

        ledger_entry = CommissionLedger(
            id=str(uuid.uuid4()),
            booking_id=booking.id,
            hotel_id=booking.hotel_id,
            gross_amount=booking.total_price,
            commission_amount=commission_amount,
            net_amount=net_amount,
            status="PENDING_PAYOUT"
        )

        db.add(ledger_entry)
        await db.commit()
        return ledger_entry

commission_service = CommissionService()
