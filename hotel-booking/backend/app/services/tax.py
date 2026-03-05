from typing import Dict, Any, List

class TaxRule:
    def __init__(self, id: int, country: str, region: str, rate: float, name: str):
        self.id = id
        self.country = country
        self.region = region
        self.rate = rate
        self.name = name

class TaxService:
    def __init__(self):
        # Multiple active rules support
        self._rules = [
            TaxRule(1, "BT", "Global", 0.05, "Bhutan Sustainable Development Fee"),
            TaxRule(2, "BT", "Global", 0.05, "Sales Tax"),
            TaxRule(3, "IN", "Global", 0.12, "GST")
        ]

    def calculate_total_with_tax(self, amount: float, country: str, region: str = "Global") -> Dict[str, Any]:
        applicable = [r for r in self._rules if r.country == country and r.region in [region, "Global"]]

        total_tax_rate = sum(r.rate for r in applicable)
        tax_amount = amount * total_tax_rate

        return {
            "base_amount": amount,
            "taxes": [{"name": r.name, "rate": r.rate, "amount": amount * r.rate} for r in applicable],
            "total_tax_amount": tax_amount,
            "total_with_tax": amount + tax_amount
        }

tax_service = TaxService()
