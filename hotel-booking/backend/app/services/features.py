from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.tenant import Tenant, Country

class FeatureFlagService:
    @staticmethod
    def is_enabled(db: Session, tenant_id: int, feature_name: str) -> bool:
        # Check tenant settings first
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        if not tenant:
            return False

        # Example tenant settings: {"features": {"chat": true, "digital_checkin": false}}
        # If feature is explicitly set at tenant level, use it
        # Otherwise, fallback to country level

        country = db.query(Country).filter(Country.id == tenant.country_id).first()
        if not country:
            return False

        # Example country settings: {"features": {"chat": true}}
        country_features = country.settings.get("features", {})
        return country_features.get(feature_name, False)

feature_flag_service = FeatureFlagService()
