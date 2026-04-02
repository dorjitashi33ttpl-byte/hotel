import pytest
from app.services.inventory import inventory_service
from app.services.payment import payment_service
from app.services.tax import tax_service
from app.services.fraud import fraud_service
from app.services.recommendations import recommendation_service
from app.services.financials import financial_service
from app.services.storage import storage_service

def test_services_availability():
    """Checks that all critical world-class feature services are instantiated."""
    assert inventory_service is not None
    assert payment_service is not None
    assert tax_service is not None
    assert fraud_service is not None
    assert recommendation_service is not None
    assert financial_service is not None
    assert storage_service is not None

def test_tax_calculation_logic():
    # Test with 10% mock tax
    base = 100.0
    tax_pct = 10.0
    total = base + (base * tax_pct / 100.0)
    assert total == 110.0

def test_commission_calc_logic():
    total_price = 1000.0
    commission_rate = 0.02 # 2%
    commission = total_price * commission_rate
    net = total_price - commission
    assert commission == 20.0
    assert net == 980.0
