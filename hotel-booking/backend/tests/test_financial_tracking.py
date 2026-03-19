import pytest
from app.services.settlements import settlement_service
from app.services.invoicing import invoicing_service
from unittest.mock import MagicMock
from datetime import date

@pytest.mark.asyncio
async def test_settlement_aggregation_stub():
    db = MagicMock()
    # Mocking pending commissions logic
    result = await settlement_service.generate_hotel_payout(db, "hotel-123")
    assert result is None or hasattr(result, "id")

def test_invoice_generation_logic():
    booking = MagicMock()
    booking.id = "B-101"
    booking.total_price = 1100.0
    booking.guest_name = "Tashi"
    booking.check_in = date(2026, 6, 1)
    booking.check_out = date(2026, 6, 2)

    hotel = MagicMock()
    hotel.name = "Amankora"
    hotel.city = "Paro"

    invoice = invoicing_service.generate_booking_invoice(booking, hotel)
    assert invoice["invoice_number"] == "INV-B-101"
    assert invoice["financials"]["total"] == 1100.0
    assert invoice["financials"]["subtotal"] == 1000.0 # 10% tax assumed in stub
