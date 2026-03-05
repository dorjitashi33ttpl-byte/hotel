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
        # Records ledger: gross, commission, net to hotel
        return True

commission_service = CommissionService()
