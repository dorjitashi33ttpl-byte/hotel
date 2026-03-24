from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.hotel import Booking, RoomType, Hotel
from datetime import date, timedelta
from typing import Dict, Any

class AnalyticsService:
    @staticmethod
    def get_hotel_metrics(db: Session, hotel_id: str, days: int = 30) -> Dict[str, Any]:
        """
        Calculates key performance indicators for a hotel.
        """
        end_date = date.today()
        start_date = end_date - timedelta(days=days)

        # 1. Total Revenue (Completed Bookings)
        revenue = db.query(func.sum(Booking.total_price)).filter(
            Booking.hotel_id == hotel_id,
            Booking.status == "COMPLETED",
            Booking.check_in >= start_date
        ).scalar() or 0.0

        # 2. Occupancy Rate
        total_rooms = db.query(func.sum(RoomType.total_quantity)).filter(RoomType.hotel_id == hotel_id).scalar() or 1
        occupied_nights = db.query(func.count(Booking.id)).filter(
            Booking.hotel_id == hotel_id,
            Booking.status.in_(["CONFIRMED", "CHECKED_IN", "COMPLETED"]),
            Booking.check_in >= start_date
        ).scalar() or 0

        occupancy = (occupied_nights / (total_rooms * days)) * 100

        # 3. ADR (Average Daily Rate)
        adr = revenue / occupied_nights if occupied_nights > 0 else 0

        # 4. RevPAR (Revenue Per Available Room)
        revpar = (revenue / (total_rooms * days)) if total_rooms > 0 else 0

        # 5. Eco-Impact Stub (2026 Trend)
        eco_score = 88 # Percent sustainable energy/waste

        return {
            "total_revenue": round(revenue, 2),
            "adr": round(adr, 2),
            "revpar": round(revpar, 2),
            "occupancy": round(min(occupancy, 100), 1),
            "eco_score": eco_score,
            "period_days": days
        }

analytics_service = AnalyticsService()
