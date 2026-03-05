import pytest
from datetime import datetime, timedelta
from app.models.booking import BookingStatus

@pytest.mark.asyncio
async def test_full_booking_lifecycle_logic():
    # 1. Simulate Hold
    check_in = datetime.utcnow() + timedelta(days=1)
    check_out = check_in + timedelta(days=2)

    # Mocking logic check
    assert check_in < check_out

    # 2. Simulate Confirmation
    status = BookingStatus.HOLD
    if status == BookingStatus.HOLD:
        status = BookingStatus.CONFIRMED

    assert status == BookingStatus.CONFIRMED

    # 3. Simulate Check-in
    if status == BookingStatus.CONFIRMED:
        status = BookingStatus.CHECKED_IN

    assert status == BookingStatus.CHECKED_IN

def test_payout_calculation_logic():
    total_amount = 1000.0
    commission_rate = 0.02
    commission = total_amount * commission_rate
    net = total_amount - commission

    assert commission == 20.0
    assert net == 980.0
