from sqlalchemy.orm import Session
from app.models.payment import CommissionLedger
from app.models.booking import Booking

class CommissionService:
    @staticmethod
    async def record_commission(db: Session, booking: Booking):
        # 2% platform commission
        commission_rate = 0.02
        amount = booking.total_amount * commission_rate

        ledger = CommissionLedger(
            booking_id=booking.id,
            tenant_id=booking.tenant_id,
            gross_amount=booking.total_amount,
            commission_amount=amount,
            net_to_hotel=booking.total_amount - amount,
            status="pending"
        )
        db.add(ledger)
        db.commit()
        return ledger

commission_service = CommissionService()
