from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check_stub():
    # Since we don't have real DB/Redis in this sandbox context,
    # we expect it to return unhealthy but the endpoint should exist.
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()
