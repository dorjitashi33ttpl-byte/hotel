import pytest
from app.services.currency import currency_service
from app.services.tax import tax_service
from app.services.fraud import fraud_service
from unittest.mock import MagicMock, AsyncMock

@pytest.mark.asyncio
async def test_currency_conversion():
    # BTN to USD (approx 83.2)
    amount_usd = await currency_service.convert(832, "BTN", "USD")
    assert round(amount_usd, 1) == 10.0

@pytest.mark.asyncio
async def test_fraud_assessment():
    db = MagicMock()
    result = await fraud_service.assess_risk(db, "user-123", "1.1.1.1", 10000)
    assert result["decision"] == "REVIEW" # High value
    assert "High value booking" in result["reasons"][0]
