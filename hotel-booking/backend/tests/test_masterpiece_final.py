import pytest
from app.services.ai_concierge import ai_concierge

def test_ai_concierge_responses():
    """Verifies the rule-based AI concierge triggers correctly."""
    assert "12:00 PM" in ai_concierge.get_auto_response("When is checkout?")
    assert "Lotus Pavilion" in ai_concierge.get_auto_response("What time is breakfast?")
    assert "password" in ai_concierge.get_auto_response("Is there wifi?")
    assert ai_concierge.get_auto_response("Random text") is None

def test_bhutan_phone_formatting():
    from app.utils.bhutan_helpers import format_bhutan_phone
    assert format_bhutan_phone("17123456") == "+975-17123456"
    assert format_bhutan_phone("+97517123456") == "+975-17123456"
