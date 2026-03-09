from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.hotel import Hotel
from app.models.booking import Booking
from typing import List

class RecommendationService:
    @staticmethod
    async def get_personalized_recommendations(db: Session, user_id: int, lat: float = None, lng: float = None) -> List[Hotel]:
        # 1. Look for user's past booking patterns (e.g., preferred regions)
        past_bookings = db.query(Hotel.region_id).join(Booking).filter(Booking.user_id == user_id).all()
        preferred_regions = [r.region_id for r in past_bookings]

        query = db.query(Hotel).filter(Hotel.is_active == True)

        if lat and lng:
            # 2. Prioritize nearby hotels using PostGIS
            point = f"POINT({lng} {lat})"
            query = query.order_by(func.ST_Distance(Hotel.location, func.ST_GeomFromText(point, 4326)))

        # 3. Boost hotels in preferred regions
        if preferred_regions:
            query = query.order_by(Hotel.region_id.in_(preferred_regions).desc())

        # 4. Limit to top 5 recommendations
        return query.limit(5).all()

recommendation_service = RecommendationService()
