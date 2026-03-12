from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.payment import PaymentProviderRegistry

class GatewayRegistryService:
    @staticmethod
    async def get_active_providers(db: Session, country_id: str) -> List[Dict[str, Any]]:
        """
        Retrieves active payment providers for a specific country.
        """
        providers = db.query(PaymentProviderRegistry).filter(
            PaymentProviderRegistry.country_id == country_id,
            PaymentProviderRegistry.is_active == True
        ).all()

        return [
            {
                "id": p.id,
                "type": p.provider_type,
                "settings": p.settings
            } for p in providers
        ]

gateway_registry = GatewayRegistryService()
