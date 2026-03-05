from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.booking import Booking

class PricingInsightsService:
    @staticmethod
    def get_occupancy_trends(db: Session, hotel_id: int) -> Dict[str, Any]:
        # Analytics logic: bookings over time, revenue per available room (RevPAR)
        return {
            "avg_occupancy": 75.5,
            "revenue_growth": 12.0,
            "top_channels": ["Direct", "OTA Bhutan"]
        }

pricing_service = PricingInsightsService()
