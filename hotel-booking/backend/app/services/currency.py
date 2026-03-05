from typing import Dict, Any

class CurrencyService:
    def __init__(self):
        # Mock exchange rates relative to USD
        self._rates = {
            "USD": 1.0,
            "BTN": 83.0,
            "INR": 83.0,
            "THB": 35.0
        }

    def convert(self, amount: float, from_curr: str, to_curr: str) -> float:
        if from_curr == to_curr:
            return amount

        # Convert to base (USD) then to target
        usd_amount = amount / self._rates[from_curr]
        return usd_amount * self._rates[to_curr]

currency_service = CurrencyService()
