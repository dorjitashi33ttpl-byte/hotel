from app.services.recommendations import recommendation_service

def test_recommendations_empty():
    # Placeholder for logic test
    assert recommendation_service.get_recommendations(None, 0.0, 0.0) == []
