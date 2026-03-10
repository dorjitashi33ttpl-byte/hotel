import pytest
from app.services.commission import commission_service
from app.models.booking import Booking

@pytest.mark.asyncio
async def test_commission_calculation(db_session):
    booking = Booking(id=1, tenant_id=1, total_amount=1000.0)
    ledger = await commission_service.record_commission(db_session, booking)
    assert ledger.commission_amount == 20.0
    assert ledger.net_to_hotel == 980.0

@pytest.mark.asyncio
async def test_inventory_check(db_session):
    # Setup mock inventory and check
    pass
