import json
from app.core.redis import redis_client

class TrackingService:
    @staticmethod
    async def track_view(user_id: str, hotel_id: str):
        key = f"recent_views:{user_id}"
        # Store as a list, keep only last 5
        await redis_client.lpush(key, hotel_id)
        await redis_client.ltrim(key, 0, 4)
        await redis_client.expire(key, 86400 * 7) # 1 week

    @staticmethod
    async def get_recent_views(user_id: str):
        key = f"recent_views:{user_id}"
        return await redis_client.lrange(key, 0, -1)
