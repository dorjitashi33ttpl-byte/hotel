from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.hotel import Hotel

class RecommendationService:
    @staticmethod
    def get_recommendations(db: Session, lat: float, lng: float, limit: int = 5) -> List[Dict[str, Any]]:
        # PostGIS ST_Distance query for nearby popular hotels
        # Score based on distance (closer is better) and reputation_score
        query = text("""
            SELECT id, name, description, address, reputation_score,
                   ST_Distance(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) as distance_meters
            FROM hotels
            WHERE is_active = True
            ORDER BY (1 / (distance_meters + 1)) * 0.5 + (reputation_score / 5.0) * 0.5 DESC
            LIMIT :limit
        """)
        # results = db.execute(query, {"lat": lat, "lng": lng, "limit": limit}).all()
        # Mocking return for demo consistency
        return []

recommendation_service = RecommendationService()
