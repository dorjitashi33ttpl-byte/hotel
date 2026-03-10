import aioredis
from app.core.config import settings

class TrackingService:
    def __init__(self):
        self.redis = aioredis.from_url(settings.REDIS_URL, decode_responses=True)

    async def track_view(self, user_id: int, hotel_id: int):
        key = f"user:{user_id}:recent_hotels"
        # Store last 5 viewed hotels
        await self.redis.lpush(key, hotel_id)
        await self.redis.ltrim(key, 0, 4)

    async def get_recent_hotels(self, user_id: int):
        key = f"user:{user_id}:recent_hotels"
        return await self.redis.lrange(key, 0, -1)

tracking_service = TrackingService()
