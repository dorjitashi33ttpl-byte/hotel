from typing import Dict, Any, List
from app.core.config import settings
import httpx

class GeoService:
    @staticmethod
    async def get_route_and_distance(from_lat: float, from_lng: float, to_lat: float, to_lng: float) -> Dict[str, Any]:
        """
        Uses Mapbox Directions API to calculate distance, duration, and route polyline.
        """
        access_token = settings.MAPBOX_ACCESS_TOKEN
        if not access_token:
            # Fallback/Mock for local development
            return {
                "distance_km": 12.5,
                "duration_mins": 25,
                "polyline": "encoded_polyline_stub"
            }

        url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{from_lng},{from_lat};{to_lng},{to_lat}"
        params = {
            "access_token": access_token,
            "geometries": "polyline",
            "overview": "full"
        }

        async with httpx.AsyncClient() as client:
            resp = await client.get(url, params=params)
            data = resp.json()

            if resp.status_code == 200 and data.get("routes"):
                route = data["routes"][0]
                return {
                    "distance_km": round(route["distance"] / 1000, 2),
                    "duration_mins": round(route["duration"] / 60),
                    "polyline": route["geometry"]
                }

        return {"error": "Failed to fetch route"}

geo_service = GeoService()
