import pytest
from app.services.payments import payment_orchestrator, LocalBankAdapter

@pytest.mark.asyncio
async def test_payment_orchestrator_selection():
    adapter = payment_orchestrator.get_adapter("stripe")
    assert adapter.__class__.__name__ == "StripeAdapter"

@pytest.mark.asyncio
async def test_local_bank_template_rendering():
    adapter = LocalBankAdapter()
    metadata = {
        "url_template": "https://bank.bt/pay/{{ booking_id }}",
        "body_template": "amount={{ amount }}&currency={{ currency }}",
        "secret_key": "test_secret"
    }
    result = await adapter.create_payment(100.0, "BTN", "BOOKING-1", metadata)
    assert result["redirect_url"] == "https://bank.bt/pay/BOOKING-1"
    assert "amount=100.0" in result["payload"]
    assert "signature" in result
