import pytest
from app.services.staff import staff_service
from unittest.mock import MagicMock
from datetime import datetime

@pytest.mark.asyncio
async def test_weekly_shift_generation_stub():
    db = MagicMock()
    hotel_id = "hotel-123"
    result = await staff_service.generate_weekly_shifts(db, hotel_id, datetime.now())
    assert result["status"] == "generated"
