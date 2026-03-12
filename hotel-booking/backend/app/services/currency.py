from typing import Dict
from app.core.config import settings

class CurrencyService:
    @staticmethod
    async def get_exchange_rates(base: str = "USD") -> Dict[str, float]:
        """
        Retrieves live exchange rates (Stub).
        In production, this would call an external provider like Fixer.io.
        """
        # Mock rates for Bhutan, India, Thailand
        return {
            "USD": 1.0,
            "BTN": 83.2,
            "INR": 83.2,
            "THB": 35.5,
            "EUR": 0.92
        }

    async def convert(self, amount: float, from_curr: str, to_curr: str) -> float:
        rates = await self.get_exchange_rates()
        if from_curr == to_curr: return amount

        # Convert to USD base first
        usd_amount = amount / rates.get(from_curr, 1.0)
        return usd_amount * rates.get(to_curr, 1.0)

currency_service = CurrencyService()
