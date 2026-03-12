import pytest
from app.services.fraud import fraud_service
from app.services.reputation import reputation_service
from unittest.mock import MagicMock

@pytest.mark.asyncio
async def test_fraud_check_logic():
    db = MagicMock()
    user = MagicMock()
    result = await fraud_service.assess_risk(db, user, "1.1.1.1")
    assert "score" in result
    assert "recommendation" in result

@pytest.mark.asyncio
async def test_reputation_score():
    db = MagicMock()
    db.query.return_value.filter.return_value.scalar.return_value = 4.8
    score = await reputation_service.get_hotel_score(db, "hotel-1")
    assert score == 4.8
