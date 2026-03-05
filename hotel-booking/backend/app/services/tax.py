from typing import Dict, Any, List
from decimal import Decimal

class TaxRule:
    def __init__(self, country: str, rate: float, name: str):
        self.country = country
        self.rate = rate
        self.name = name

class TaxService:
    def __init__(self):
        # Admin-configured tax rules (mock)
        self._rules = {
            "BT": TaxRule("BT", 0.10, "Sales Tax"),
            "IN": TaxRule("IN", 0.12, "GST")
        }

    def calculate_total_with_tax(self, amount: float, country: str) -> Dict[str, Any]:
        rule = self._rules.get(country, TaxRule(country, 0.05, "Default Tax"))
        tax_amount = amount * rule.rate
        total = amount + tax_amount
        return {
            "base_amount": amount,
            "tax_name": rule.name,
            "tax_rate": rule.rate,
            "tax_amount": tax_amount,
            "total_with_tax": total
        }

tax_service = TaxService()
