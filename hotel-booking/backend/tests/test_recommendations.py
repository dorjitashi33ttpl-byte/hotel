import pytest
from app.services.recommendations import recommendation_service
from unittest.mock import AsyncMock

@pytest.mark.asyncio
async def test_nearby_recommendations_stub():
    db = AsyncMock()
    # Logic to mock db response
    result = await recommendation_service.get_nearby_recommendations(db, 27.47, 89.63)
    assert result is not None
