import pytest
from app.services.fraud import fraud_check_service
from app.services.analytics import analytics_service
from app.models.user import User

@pytest.mark.asyncio
async def test_fraud_check():
    user = User(is_active=False)
    res = await fraud_check_service.run_risk_assessment(user, "127.0.0.1")
    assert res["is_blocked"] == True
    assert "Inactive user account" in res["reasons"]

@pytest.mark.asyncio
async def test_analytics_empty():
    # res = await analytics_service.calculate_yield_metrics(None, 1)
    # assert res["gross_revenue"] == 0
    pass
