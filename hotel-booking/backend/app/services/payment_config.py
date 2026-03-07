from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.payment import PaymentProviderConfig
from app.core.security import encrypt_data, decrypt_data

class PaymentConfigService:
    def get_provider_config(self, db: Session, country_id: int, provider_type: str) -> Optional[Dict[str, Any]]:
        config = db.query(PaymentProviderConfig).filter(
            PaymentProviderConfig.country_id == country_id,
            PaymentProviderConfig.provider_type == provider_type,
            PaymentProviderConfig.is_enabled == True
        ).first()

        if config:
            # Logic to merge config_data with decrypted credentials
            raw_creds = decrypt_data(config.credentials_encrypted)
            return {**config.config_data, "credentials": raw_creds}
        return None

    def update_provider_credentials(self, db: Session, country_id: int, provider_type: str, raw_creds: str):
        config = db.query(PaymentProviderConfig).filter(
            PaymentProviderConfig.country_id == country_id,
            PaymentProviderConfig.provider_type == provider_type
        ).first()
        if config:
            config.credentials_encrypted = encrypt_data(raw_creds)
            db.commit()
            return True
        return False

payment_config_service = PaymentConfigService()
