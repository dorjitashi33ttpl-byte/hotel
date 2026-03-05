from app.services.commission import commission_service

def test_calculate_commission():
    assert commission_service.calculate_commission(100.0, 0.02) == 2.0
    assert commission_service.calculate_commission(500.0, 0.05) == 25.0

def test_calculate_commission_default():
    assert commission_service.calculate_commission(200.0) == 4.0
