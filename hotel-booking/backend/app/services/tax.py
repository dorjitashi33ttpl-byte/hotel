from typing import Dict
from app.models.geo import Country, Region

class TaxService:
    @staticmethod
    def calculate_taxes(base_amount: float, country: Country, region: Region = None) -> Dict[str, float]:
        # SDF (Sustainable Development Fee) logic for Bhutan
        if country.iso_code == "BT":
            sdf = 100.0 # BTN 100 per night per person (mock)
            sales_tax = base_amount * 0.10 # 10%
            return {"SDF": sdf, "Sales Tax": sales_tax, "total": sdf + sales_tax}

        # Default global logic
        global_tax = base_amount * 0.05
        return {"Global Tax": global_tax, "total": global_tax}

tax_service = TaxService()
