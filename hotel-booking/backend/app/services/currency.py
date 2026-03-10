class CurrencyService:
    # Exchange rates seeded from Bhutan Central Bank (mock)
    RATES = {
        "BTN": 1.0,
        "USD": 0.012,
        "INR": 1.0
    }

    @staticmethod
    def convert(amount: float, from_cur: str, to_cur: str) -> float:
        if from_cur == to_cur: return amount
        base = amount / CurrencyService.RATES.get(from_cur, 1.0)
        return base * CurrencyService.RATES.get(to_cur, 1.0)

currency_service = CurrencyService()
