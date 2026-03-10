from app.models.payment import PaymentRecord
from app.services.payment import payment_service
from sqlalchemy.orm import Session

class RefundEngine:
    @staticmethod
    async def initiate_automated_refund(db: Session, payment_id: int):
        payment = db.query(PaymentRecord).filter(PaymentRecord.id == payment_id).first()
        if not payment: return False

        # Call provider adapter
        adapter = payment_service.get_adapter(payment.provider, {})
        result = await adapter.refund(payment.provider_payment_id)

        if result.get("status") == "succeeded":
            payment.status = "refunded"
            db.commit()
            return True
        return False

refund_engine = RefundEngine()
