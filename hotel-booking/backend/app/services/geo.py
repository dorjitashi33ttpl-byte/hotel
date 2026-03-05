import httpx
from typing import List, Dict, Any
from app.core.config import settings

class GeoService:
    def __init__(self):
        self.base_url = "https://api.mapbox.com"
        self.access_token = settings.MAPBOX_ACCESS_TOKEN

    async def get_route(self, from_lat: float, from_lng: float, to_lat: float, to_lng: float) -> Dict[str, Any]:
        return {"routes": []}

    async def autocomplete(self, query: str, country: str = "BT") -> List[Dict[str, Any]]:
        return []

geo_service = GeoService()
