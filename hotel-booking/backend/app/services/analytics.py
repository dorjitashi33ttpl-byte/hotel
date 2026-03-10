from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.booking import Booking
from app.models.payment import PaymentRecord
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    async def get_tenant_revenue_metrics(db: Session, tenant_id: int):
        last_30_days = datetime.utcnow() - timedelta(days=30)

        # Calculate gross revenue
        gross_rev = db.query(func.sum(Booking.total_amount)).filter(
            Booking.tenant_id == tenant_id,
            Booking.status.in_(["confirmed", "checked_in", "checked_out", "completed"]),
            Booking.created_at >= last_30_days
        ).scalar() or 0

        # Calculate platform commission (2%)
        commission = gross_rev * 0.02

        # Calculate current occupancy %
        total_rooms = 20 # Placeholder for actual room count
        occupied_rooms = db.query(func.count(Booking.id)).filter(
            Booking.tenant_id == tenant_id,
            Booking.status == "checked_in"
        ).scalar() or 0

        occupancy_rate = (occupied_rooms / total_rooms) * 100 if total_rooms > 0 else 0

        return {
            "gross_revenue": gross_rev,
            "net_revenue": gross_rev - commission,
            "platform_commission": commission,
            "occupancy_rate": occupancy_rate,
            "period": "last_30_days"
        }

analytics_service = AnalyticsService()
