from typing import Dict, Any

class FraudCheckService:
    @staticmethod
    def check_booking(user_id: int, ip_address: str, payment_method: str) -> bool:
        # Check for multiple bookings from same IP in small window
        # Check for blacklisted emails or suspicious payment patterns
        # Simplified:
        if ip_address == "1.2.3.4": # mock blacklist
            return False
        return True

fraud_check_service = FraudCheckService()
