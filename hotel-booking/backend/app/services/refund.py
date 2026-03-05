from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.payment import Payment
from app.services.payment import payment_service

class RefundService:
    @staticmethod
    async def process_refund(db: Session, payment_id: int, amount: Optional[float] = None) -> Dict[str, Any]:
        payment = db.query(Payment).filter(Payment.id == payment_id).first()
        if not payment:
            return {"status": "failed", "message": "Payment record not found"}

        # Determine provider and get appropriate adapter
        # config = payment_config_service.get_provider_config(...)
        config = {} # placeholder for demo
        adapter = payment_service.get_adapter(payment.provider, config)

        result = await adapter.refund_payment(payment.provider_payment_id, amount)

        if result["status"] == "succeeded":
            payment.status = "refunded"
            db.commit()

        return result

refund_service = RefundService()
