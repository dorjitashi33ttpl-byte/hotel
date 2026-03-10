from app.models.user import User

class FraudCheckService:
    @staticmethod
    async def run_check(user: User, ip_address: str) -> dict:
        risk_score = 0
        reasons = []

        # Example rules
        if not user.is_active:
            risk_score += 100
            reasons.append("Inactive user account")

        # In a real app, check booking frequency, blacklisted IPs, etc.
        # if await redis.get(f"holds:{ip_address}") > 5: risk_score += 50

        return {
            "is_blocked": risk_score >= 100,
            "risk_score": risk_score,
            "reasons": reasons
        }

fraud_check_service = FraudCheckService()
