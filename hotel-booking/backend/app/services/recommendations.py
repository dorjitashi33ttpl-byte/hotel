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
        # STRICT FILTERING: Only hotels in the same country AND city (context-aware)
        # Order by proximity within that set
        query = text("""
            SELECT h.id, h.name, h.description, h.address, h.reputation_score, h.city,
                   ST_Distance(h.location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) as distance_meters
            FROM hotels h
            JOIN tenants t ON h.tenant_id = t.id
            JOIN countries c ON t.country_id = c.id
            WHERE c.iso_code = :country_iso
              AND h.city = :city
              AND h.is_active = True
            ORDER BY distance_meters ASC
            LIMIT :limit
        """)
        # results = db.execute(query, {"lat": lat, "lng": lng, "country_iso": country_iso, "city": city, "limit": limit}).all()

        # Mock data for demonstration of the filter
        return [
            {
                "id": 1,
                "name": f"Heritage Stay in {city}",
                "city": city,
                "country": country_iso,
                "reason": "Top rated in your area"
            }
        ]

recommendation_service = RecommendationService()
