from datetime import datetime
from sqlalchemy.orm import Session
from app.models.payment import CommissionLedger, Payout
from app.models.tenant import Tenant
from app.models.user import User

class CommissionService:
    @staticmethod
    def calculate_commission(total_amount: float, commission_rate: float = 0.02) -> float:
        return total_amount * commission_rate

    @staticmethod
    def record_payout(db: Session, tenant_id: int, booking_id: int, gross_total: float, commission_amount: float):
        ledger = CommissionLedger(
            tenant_id=tenant_id, booking_id=booking_id,
            gross_amount=gross_total, commission_amount=commission_amount,
            net_amount=gross_total - commission_amount,
            currency="BTN", status="pending"
        )
        db.add(ledger)
        db.commit()
        return True

    @staticmethod
    def process_payout_request(db: Session, tenant_id: int, amount: float):
        # 1. Create Payout record
        payout = Payout(
            tenant_id=tenant_id, amount=amount,
            currency="BTN", payout_date=datetime.utcnow(),
            status="processed", reference="REF-MOCK-123"
        )
        db.add(payout)
        db.flush()

        # 2. Link ledger entries to this payout and mark as paid
        ledger_entries = db.query(CommissionLedger).filter(
            CommissionLedger.tenant_id == tenant_id,
            CommissionLedger.status == "pending"
        ).all()

        for entry in ledger_entries:
            entry.status = "paid"
            entry.payout_id = payout.id

        db.commit()
        return payout

    @staticmethod
    def check_plan_limits(db: Session, tenant_id: int, feature: str) -> bool:
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        if not tenant: return False
        if tenant.subscription_plan == "platinum": return True
        return True

commission_service = CommissionService()
