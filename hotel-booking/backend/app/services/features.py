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

from app.models.hotel import Tenant
from fastapi import HTTPException, status

async def check_tenant_limit(db: Session, tenant_id: str, feature: str):
    """
    Checks if a tenant has exceeded their plan limits.
    """
    tenant = await db.get(Tenant, tenant_id)
    plan = tenant.subscription_plan # silver, gold, platinum

    limits = {
        "silver": {"max_users": 5, "api_access": False},
        "gold": {"max_users": 20, "api_access": True},
        "platinum": {"max_users": 100, "api_access": True}
    }

    plan_limits = limits.get(plan, limits["silver"])

    if feature == "user_count":
        # logic to count current users
        pass
    elif feature == "api":
        if not plan_limits["api_access"]:
            raise HTTPException(status_code=403, detail="API access requires Gold plan or higher")
