from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.booking import Booking

class FraudCheckService:
    @staticmethod
    def calculate_risk_score(db: Session, user_id: int, ip_address: str) -> float:
        score = 0.0

        # 1. Check recent booking frequency
        # count = db.query(Booking).filter(Booking.user_id == user_id, ...).count()
        # if count > 5: score += 0.5

        # 2. Check for blacklisted IPs (mocked)
        if ip_address == "1.2.3.4": score += 1.0

        return min(score, 1.0)

    @staticmethod
    def check_booking(user_id: int, ip_address: str, payment_method: str) -> bool:
        # If risk score >= 0.8, block booking
        # score = FraudCheckService.calculate_risk_score(None, user_id, ip_address)
        # return score < 0.8
        return True

fraud_check_service = FraudCheckService()
