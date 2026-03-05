from datetime import datetime
from sqlalchemy.orm import Session
from app.models.booking import Booking, BookingStatus

class CommissionService:
    @staticmethod
    def calculate_commission(total_amount: float, commission_rate: float = 0.02) -> float:
        return total_amount * commission_rate

    @staticmethod
    def record_payout(db: Session, tenant_id: int, gross_total: float, platform_commission: float):
        # Implementation for payout reporting logic
        return True

    @staticmethod
    def check_plan_limits(db: Session, tenant_id: int, feature: str) -> bool:
        # Plans: Silver, Gold, Platinum
        # Platinum has unlimited everything; Silver has limits on staff count
        return True

commission_service = CommissionService()
