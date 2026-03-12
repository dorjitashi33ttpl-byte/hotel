from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.hotel import Booking, RoomType
from datetime import date, timedelta

class AnalyticsService:
    @staticmethod
    def get_hotel_metrics(db: Session, hotel_id: str, days: int = 30):
        """
        Calculates key performance indicators for a hotel.
        """
        end_date = date.today()
        start_date = end_date - timedelta(days=days)

        # 1. Total Revenue
        revenue = db.query(func.sum(Booking.total_price)).filter(
            Booking.hotel_id == hotel_id,
            Booking.status == "COMPLETED",
            Booking.check_in >= start_date
        ).scalar() or 0.0

        # 2. ADR (Average Daily Rate)
        # 3. RevPAR (Revenue Per Available Room)
        # 4. Occupancy Rate

        return {
            "total_revenue": revenue,
            "adr": 250.0,  # Stub logic
            "revpar": 180.0,
            "occupancy": 72.0
        }

analytics_service = AnalyticsService()
