from app.services.payment import payment_service
from app.services.inventory import inventory_service

def test_payment_service_get_adapter():
    # Test if adapter factory works
    config = {"api_key": "test_key"}
    adapter = payment_service.get_adapter("stripe", config)
    assert adapter is not None

def test_inventory_logic_simple():
    # Placeholder for logic test
    assert True
