from typing import Dict, Any, List
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.booking import Booking, BookingStatus

class PricingInsightsService:
    @staticmethod
    def get_occupancy_trends(db: Session, hotel_id: int) -> Dict[str, Any]:
        # SELECT COUNT(*) FROM bookings WHERE hotel_id = :id AND status = 'confirmed'
        count = db.query(Booking).filter(
            Booking.hotel_id == hotel_id,
            Booking.status == BookingStatus.CONFIRMED
        ).count()

        return {
            "avg_occupancy": 75.5, # mock analytics
            "revenue_growth": 12.0,
            "total_bookings": count
        }

pricing_service = PricingInsightsService()
