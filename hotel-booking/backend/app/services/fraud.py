from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.user import User

class FraudService:
    @staticmethod
    async def assess_risk(db: Session, user: User, ip_address: str) -> Dict[str, Any]:
        """
        Runs risk assessment for a booking request.
        """
        score = 0
        reasons = []

        # 1. New user with high value booking
        # 2. IP address from high-risk country
        # 3. User with previous failed payments

        # Simple velocity check logic stub

        return {
            "score": score,
            "is_high_risk": score >= 80,
            "recommendation": "APPROVE" if score < 50 else "REVIEW"
        }

fraud_service = FraudService()
