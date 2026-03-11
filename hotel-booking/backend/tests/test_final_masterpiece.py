import pytest
from app.services.cache import cache_response, redis_client
from app.core.exceptions import DoubleBookingException

@pytest.mark.asyncio
async def test_cache_logic_stub():
    # Verify redis client is accessible
    assert redis_client is not None

def test_exception_orchestration():
    exc = DoubleBookingException()
    assert exc.status_code == 409
    assert exc.detail["code"] == "DOUBLE_BOOKING"
