from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.payment import PaymentProviderConfig

class PaymentConfigService:
    @staticmethod
    def get_provider_config(db: Session, country_id: int, provider_type: str) -> Optional[Dict[str, Any]]:
        # In a real app, this would decrypt credentials_encrypted
        config = db.query(PaymentProviderConfig).filter(
            PaymentProviderConfig.country_id == country_id,
            PaymentProviderConfig.provider_type == provider_type,
            PaymentProviderConfig.is_enabled == True
        ).first()

        if config:
            return config.config_data
        return None

payment_config_service = PaymentConfigService()
