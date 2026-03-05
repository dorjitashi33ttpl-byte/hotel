import httpx
from typing import List, Dict, Any
from app.core.config import settings

class GeoService:
    def __init__(self):
        self.base_url = "https://api.mapbox.com"
        self.access_token = settings.MAPBOX_ACCESS_TOKEN

    async def get_route(self, from_lat: float, from_lng: float, to_lat: float, to_lng: float) -> Dict[str, Any]:
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url}/directions/v5/mapbox/driving/{from_lng},{from_lat};{to_lng},{to_lat}"
            params = {
                "access_token": self.access_token,
                "geometries": "geojson",
                "overview": "full"
            }
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            route = data['routes'][0]
            return {
                "distance_km": route['distance'] / 1000.0,
                "duration_min": route['duration'] / 60.0,
                "geometry": route['geometry']
            }

    async def autocomplete(self, query: str, country: str = "BT") -> List[Dict[str, Any]]:
        async with httpx.AsyncClient() as client:
            url = f"{self.base_url}/geocoding/v5/mapbox.places/{query}.json"
            params = {
                "access_token": self.access_token,
                "country": country,
                "types": "address,place,locality"
            }
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()['features']

geo_service = GeoService()
