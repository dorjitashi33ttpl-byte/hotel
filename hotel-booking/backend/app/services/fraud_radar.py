from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.booking import Booking

class FraudRadarService:
    @staticmethod
    def get_high_risk_alerts(db: Session) -> List[Dict[str, Any]]:
        """
        Returns currently flagged bookings for admin review.
        """
        flagged = db.query(Booking).filter(Booking.status == "FLAGGED_FOR_FRAUD").all()
        return [
            {
                "booking_id": b.id,
                "guest_name": b.guest_name,
                "risk_score": 85, # Stub
                "reasons": ["High velocity", "New account"],
                "amount": b.total_price
            } for b in flagged
        ]

fraud_radar = FraudRadarService()
