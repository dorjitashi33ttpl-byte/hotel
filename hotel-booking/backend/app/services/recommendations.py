from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.hotel import Hotel

class RecommendationService:
    @staticmethod
    def get_recommendations(db: Session, lat: float, lng: float, limit: int = 5) -> List[Dict[str, Any]]:
        # PostGIS-style query for nearby popular hotels
        # SELECT * FROM hotels ORDER BY location <-> ST_SetSRID(ST_MakePoint(:lng, :lat), 4326) LIMIT :limit
        query = text("""
            SELECT id, name, description, address
            FROM hotels
            ORDER BY location <-> ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)
            LIMIT :limit
        """)
        # In this demo we just return an empty list or mock data
        return []

recommendation_service = RecommendationService()
