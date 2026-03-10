from typing import Optional
from app.services.payment import payment_service
from app.models.payment import PaymentRecord
from sqlalchemy.orm import Session

class RefundEngine:
    @staticmethod
    async def process_refund(db: Session, payment_id: int, amount: Optional[float] = None) -> bool:
        payment = db.query(PaymentRecord).filter(PaymentRecord.id == payment_id).first()
        if not payment: return False

        adapter = payment_service.get_adapter(payment.provider, {}) # Config would be fetched here
        result = await adapter.refund(payment.provider_payment_id, amount)

        if result.get("status") == "succeeded" or result.get("status") == "manual":
            payment.status = "refunded"
            db.commit()
            return True
        return False

refund_engine = RefundEngine()
