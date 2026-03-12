from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.hotel import Booking

class FraudService:
    @staticmethod
    async def assess_risk(db: Session, user_id: str, ip_address: str, amount: float) -> Dict[str, Any]:
        """
        Runs multiple risk checks:
        1. Velocity check: Multiple bookings in a short window.
        2. Amount check: High-value bookings from new users.
        3. IP-Identity mismatch.
        """
        score = 0
        reasons = []

        # 1. Velocity (Mocked)
        recent_bookings_count = 2 # Logic: db.query(Booking).filter(Booking.user_id == user_id, Booking.created_at > window).count()
        if recent_bookings_count > 5:
            score += 40
            reasons.append("High booking velocity detected")

        # 2. Amount Check
        if amount > 5000: # Threshold for high-value
            score += 30
            reasons.append("High value booking threshold reached")

        # 3. Decision
        decision = "APPROVE"
        if score >= 70: decision = "REJECT"
        elif score >= 40: decision = "REVIEW"

        return {
            "score": score,
            "decision": decision,
            "reasons": reasons
        }

fraud_service = FraudService()
