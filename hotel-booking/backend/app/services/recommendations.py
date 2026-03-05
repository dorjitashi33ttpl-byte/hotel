from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.hotel import Hotel

class RecommendationService:
    @staticmethod
    def get_recommendations(db: Session, lat: float, lng: float, limit: int = 5) -> List[Dict[str, Any]]:
        # Find popular hotels nearby using PostGIS distance
        # Order by rating and popularity
        return []

recommendation_service = RecommendationService()
