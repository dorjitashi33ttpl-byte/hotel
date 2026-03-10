import pytest
from app.services.fraud import fraud_check_service
from app.services.analytics import analytics_service
from app.models.user import User

@pytest.mark.asyncio
async def test_fraud_check():
    user = User(is_active=False)
    res = await fraud_check_service.run_check(user, "127.0.0.1")
    assert res["is_blocked"] == True
    assert "Inactive user account" in res["reasons"]

@pytest.mark.asyncio
async def test_analytics_empty(db_session):
    res = await analytics_service.get_tenant_revenue_metrics(db_session, 1)
    assert res["gross_revenue"] == 0
    assert res["occupancy_rate"] == 0
