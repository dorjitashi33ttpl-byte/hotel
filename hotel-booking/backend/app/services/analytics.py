from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.booking import Booking
from app.models.inventory import Room
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    async def calculate_yield_metrics(db: Session, hotel_id: int):
        # 1. Total Revenue (Last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        revenue = db.query(func.sum(Booking.total_amount)).filter(
            Booking.tenant_id == hotel_id,
            Booking.status == "confirmed",
            Booking.created_at >= thirty_days_ago
        ).scalar() or 0

        # 2. Occupancy Rate
        total_rooms = db.query(func.count(Room.id)).filter(Room.hotel_id == hotel_id).scalar() or 1
        occupied_rooms = db.query(func.count(Booking.id)).filter(
            Booking.tenant_id == hotel_id,
            Booking.status == "checked_in"
        ).scalar() or 0

        occupancy = (occupied_rooms / total_rooms) * 100

        # 3. RevPAR (Revenue Per Available Room)
        revpar = (revenue / total_rooms) / 30

        return {
            "gross_revenue": revenue,
            "occupancy_rate": occupancy,
            "revpar": revpar,
            "adr": (revenue / occupied_rooms) if occupied_rooms > 0 else 0
        }

analytics_service = AnalyticsService()
