from datetime import date
from typing import Optional
from sqlalchemy.orm import Session
from app.models.geo import TaxRule

class TaxService:
    @staticmethod
    async def get_applicable_taxes(db: Session, country_id: str, region_id: Optional[str] = None):
        """
        Retrieves active tax rules for a location.
        """
        today = date.today()
        query = db.query(TaxRule).filter(
            TaxRule.country_id == country_id,
            TaxRule.effective_from <= today,
            (TaxRule.effective_to == None) | (TaxRule.effective_to >= today)
        )
        if region_id:
            query = query.filter((TaxRule.region_id == region_id) | (TaxRule.region_id == None))

        return query.all()

tax_service = TaxService()
