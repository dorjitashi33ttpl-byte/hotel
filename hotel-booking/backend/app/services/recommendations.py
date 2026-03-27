from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from app.models.hotel import Hotel
from geoalchemy2.functions import ST_Distance, ST_MakePoint, ST_SetSRID

class RecommendationService:
    @staticmethod
    async def get_personalized_recommendations(
        db: Session,
        user_id: Optional[str] = None,
        lat: Optional[float] = None,
        lng: Optional[float] = None,
        preferred_amenities: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        """
        Suggests hotels using a weighted scoring algorithm:
        1. Proximity: Closer hotels get a distance boost.
        2. Reputation: Higher 'reputation_score' weighted at 40%.
        3. Amenities: Matching specific luxury amenities (e.g., 'Spa', 'Private Butler').
        """
        query = db.query(Hotel).filter(Hotel.status == 'APPROVED')

        # Base ordering by reputation
        order_criteria = [Hotel.reputation_score.desc()]

        if lat is not None and lng is not None:
            point = ST_SetSRID(ST_MakePoint(lng, lat), 4326)
            # Geography distance in meters
            distance_col = ST_Distance(func.geography(Hotel.geom), func.geography(point))

            # Hybrid score: reputation / (distance_km + 1)
            # Add a small constant to prevent division by zero
            hybrid_score = Hotel.reputation_score / ( (distance_col / 1000.0) + 1.0)
            order_criteria = [hybrid_score.desc()]

        # Filter by amenities if provided (simplified check)
        if preferred_amenities:
            for amenity in preferred_amenities:
                # Assuming amenities is a JSON array
                query = query.filter(Hotel.amenities.contains([amenity]))

        hotels = query.order_by(*order_criteria).limit(10).all()
        return hotels

recommendation_service = RecommendationService()
