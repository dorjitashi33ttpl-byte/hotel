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
    def check_plan_limits(db: Session, tenant_id: int, feature: str) -> bool:
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        if not tenant: return False

        # Mock Plan Limits
        # Silver: max 5 staff, 2 room types
        # Gold: max 20 staff, 10 room types
        # Platinum: unlimited
        if tenant.subscription_plan == "platinum":
            return True

        if feature == "staff_count":
            count = db.query(User).filter(User.tenant_id == tenant_id).count()
            limit = 5 if tenant.subscription_plan == "silver" else 20
            return count < limit

        return True

commission_service = CommissionService()
