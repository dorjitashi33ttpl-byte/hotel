from datetime import datetime, date
from typing import Dict, Any
from app.models.hotel import Booking

class RefundEngine:
    @staticmethod
    def calculate_refund_amount(booking: Booking, cancel_date: date) -> float:
        """
        Calculates refund based on standard policy:
        - > 7 days before: 100%
        - 2-7 days before: 50%
        - < 48 hours: 0%
        """
        days_until_checkin = (booking.check_in - cancel_date).days

        if days_until_checkin >= 7:
            return booking.total_price
        elif days_until_checkin >= 2:
            return booking.total_price * 0.5
        else:
            return 0.0

    async def process_refund(self, booking_id: str, amount: float):
        # Integration with PaymentOrchestrator to trigger provider-level refund
        return {"status": "REFUND_INITIATED", "amount": amount}

refund_engine = RefundEngine()
