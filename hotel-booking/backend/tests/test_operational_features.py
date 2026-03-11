from datetime import date
import pytest
from app.services.refunds import refund_engine
from app.services.reputation import reputation_service
from unittest.mock import MagicMock

def test_refund_calculation_logic():
    booking = MagicMock()
    booking.total_price = 1000.0
    booking.check_in = date(2026, 6, 10)

    # > 7 days
    assert refund_engine.calculate_refund_amount(booking, date(2026, 6, 1)) == 1000.0
    # 2-7 days
    assert refund_engine.calculate_refund_amount(booking, date(2026, 6, 5)) == 500.0
    # < 2 days
    assert refund_engine.calculate_refund_amount(booking, date(2026, 6, 9)) == 0.0

@pytest.mark.asyncio
async def test_reputation_score_stub():
    db = MagicMock()
    db.query.return_value.filter.return_value.scalar.return_value = 4.5
    score = await reputation_service.get_hotel_score(db, "hotel-1")
    assert score == 4.5
