from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.hotel import Hotel

class RecommendationService:
    @staticmethod
    def get_recommendations(
        db: Session,
        lat: float,
        lng: float,
        country_iso: str,
        city: Optional[str] = None,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        # Filter strictly by Country and City (x location in y country)
        # Order by spatial proximity
        query = text("""
            SELECT h.id, h.name, h.description, h.address, h.reputation_score,
                   ST_Distance(h.location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) as distance_meters
            FROM hotels h
            JOIN tenants t ON h.tenant_id = t.id
            JOIN countries c ON t.country_id = c.id
            WHERE c.iso_code = :country_iso
              AND (:city IS NULL OR h.city = :city)
              AND h.is_active = True
            ORDER BY distance_meters ASC
            LIMIT :limit
        """)
        # results = db.execute(query, {"lat": lat, "lng": lng, "country_iso": country_iso, "city": city, "limit": limit}).all()
        return []

recommendation_service = RecommendationService()
