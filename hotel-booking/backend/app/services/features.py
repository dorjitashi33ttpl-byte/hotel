from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.hotel import Tenant

class FeatureFlagService:
    # Feature matrix based on subscription plan
    PLAN_FEATURES = {
        "starter": {
            "max_users": 3,
            "max_rooms": 10,
            "digital_checkin": False,
            "in_app_chat": False,
            "partner_api": False
        },
        "pro": {
            "max_users": 15,
            "max_rooms": 50,
            "digital_checkin": True,
            "in_app_chat": True,
            "partner_api": False
        },
        "enterprise": {
            "max_users": 999,
            "max_rooms": 999,
            "digital_checkin": True,
            "in_app_chat": True,
            "partner_api": True
        }
    }

    @staticmethod
    def is_enabled(db: Session, tenant_id: str, feature: str) -> bool:
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        if not tenant: return False

        plan = tenant.subscription_plan or "starter"
        features = FeatureFlagService.PLAN_FEATURES.get(plan, FeatureFlagService.PLAN_FEATURES["starter"])

        return features.get(feature, False)

    @staticmethod
    def get_tenant_limits(db: Session, tenant_id: str) -> Dict[str, Any]:
        tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
        plan = tenant.subscription_plan if tenant else "starter"
        return FeatureFlagService.PLAN_FEATURES.get(plan, FeatureFlagService.PLAN_FEATURES["starter"])

feature_flag_service = FeatureFlagService()
