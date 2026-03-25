from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.payment import PaymentProviderRegistry
from app.core.security import decrypt_data, encrypt_data
from app.core.config import settings

class GatewayRegistryService:
    @staticmethod
    async def get_active_providers(db: Session, country_id: str) -> List[Dict[str, Any]]:
        """
        Retrieves active payment providers for a specific country with decrypted credentials.
        """
        providers = db.query(PaymentProviderRegistry).filter(
            PaymentProviderRegistry.country_id == country_id,
            PaymentProviderRegistry.is_active == True
        ).all()

        results = []
        for p in providers:
            # Decrypt sensitive credentials if present
            creds = {}
            if p.credentials_encrypted:
                try:
                    creds_json = decrypt_data(p.credentials_encrypted, settings.SECRET_KEY)
                    creds = json.loads(creds_json)
                except Exception:
                    creds = {} # Log decryption failure in production

            # Merge credentials into settings for adapter consumption
            adapter_config = {**(p.settings or {}), **creds}

            results.append({
                "id": p.id,
                "type": p.provider_type,
                "settings": adapter_config
            })

        return results

    @staticmethod
    def register_provider(
        db: Session,
        country_id: str,
        provider_type: str,
        settings_dict: Dict[str, Any],
        credentials: Optional[Dict[str, Any]] = None
    ) -> PaymentProviderRegistry:
        """
        Registers a new provider with encrypted credentials.
        """
        creds_encrypted = None
        if credentials:
            creds_json = json.dumps(credentials)
            creds_encrypted = encrypt_data(creds_json, settings.SECRET_KEY)

        new_provider = PaymentProviderRegistry(
            id=f"{country_id}_{provider_type}",
            country_id=country_id,
            provider_type=provider_type,
            is_active=True,
            credentials_encrypted=creds_encrypted,
            settings=settings_dict
        )

        db.add(new_provider)
        db.commit()
        db.refresh(new_provider)
        return new_provider

gateway_registry = GatewayRegistryService()
