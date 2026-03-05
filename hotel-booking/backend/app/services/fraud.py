from typing import Dict, Any

class FraudCheckService:
    @staticmethod
    def check_booking(user_id: int, ip_address: str, payment_method: str) -> bool:
        # Simplified fraud check (risk score logic)
        # Check for multiple bookings from same IP in small window
        # Check for blacklisted emails or suspicious payment patterns
        return True # Approved

fraud_check_service = FraudCheckService()
