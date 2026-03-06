from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.hotel import Hotel

class RecommendationService:
    @staticmethod
    def get_recommendations(db: Session, lat: float, lng: float, limit: int = 5) -> List[Dict[str, Any]]:
        # PostGIS ST_Distance query
        # Score based on distance, reputation_score, and popularity
        query = text("""
            SELECT id, name, description, reputation_score,
                   ST_Distance(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) as distance_meters
            FROM hotels
            WHERE reputation_score >= 4.0
            ORDER BY distance_meters ASC
            LIMIT :limit
        """)
        # results = db.execute(query, {"lat": lat, "lng": lng, "limit": limit}).all()
        return []

recommendation_service = RecommendationService()
