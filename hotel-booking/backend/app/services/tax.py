from typing import Dict, Any, List

class TaxRule:
    def __init__(self, id: int, country: str, region: str, rate: float, name: str, inclusive: bool = False):
        self.id = id
        self.country = country
        self.region = region
        self.rate = rate
        self.name = name
        self.inclusive = inclusive

class TaxService:
    def __init__(self):
        self._rules = [
            TaxRule(1, "BT", "Global", 0.05, "SDF (Sustainable Dev Fee)", inclusive=False),
            TaxRule(2, "BT", "Global", 0.05, "Sales Tax", inclusive=False)
        ]

    def calculate_total_with_tax(self, amount: float, country: str, region: str = "Global") -> Dict[str, Any]:
        applicable = [r for r in self._rules if r.country == country and r.region in [region, "Global"]]

        exclusive_rate = sum(r.rate for r in applicable if not r.inclusive)
        inclusive_rate = sum(r.rate for r in applicable if r.inclusive)

        # Exclusive: total = amount * (1 + rate)
        # Inclusive: total = amount (tax is already inside)

        tax_from_exclusive = amount * exclusive_rate
        total = amount + tax_from_exclusive

        return {
            "base_amount": amount,
            "exclusive_tax": tax_from_exclusive,
            "total_with_tax": total,
            "currency": "BTN"
        }

tax_service = TaxService()
