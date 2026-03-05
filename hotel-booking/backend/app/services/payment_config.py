import base64
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.payment import PaymentProviderConfig

class PaymentConfigService:
    def encrypt_credentials(self, raw_creds: str) -> str:
        # Mock encryption: base64 encoding with a dummy prefix
        # In production, use a library like cryptography.fernet
        return f"enc_{base64.b64encode(raw_creds.encode()).decode()}"

    def decrypt_credentials(self, encrypted_creds: str) -> str:
        # Mock decryption
        if not encrypted_creds.startswith("enc_"):
            return encrypted_creds
        return base64.b64decode(encrypted_creds[4:]).decode()

    def get_provider_config(self, db: Session, country_id: int, provider_type: str) -> Optional[Dict[str, Any]]:
        config = db.query(PaymentProviderConfig).filter(
            PaymentProviderConfig.country_id == country_id,
            PaymentProviderConfig.provider_type == provider_type,
            PaymentProviderConfig.is_enabled == True
        ).first()

        if config:
            # Logic to merge config_data with decrypted credentials would go here
            return config.config_data
        return None

payment_config_service = PaymentConfigService()
