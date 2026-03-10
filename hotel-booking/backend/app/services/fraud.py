from app.models.user import User

class FraudCheckService:
    @staticmethod
    async def run_risk_assessment(user: User, ip_address: str) -> dict:
        risk_score = 0
        reasons = []

        # Logic for frequency checks, blacklisted IPs, etc.
        if not user.is_active:
            risk_score += 100
            reasons.append("Inactive user account")

        return {
            "risk_score": risk_score,
            "is_blocked": risk_score >= 100,
            "reasons": reasons
        }

fraud_check_service = FraudCheckService()
