import time
from fastapi import Request, HTTPException, status
from app.core.config import settings
import redis.asyncio as redis

class RateLimiter:
    def __init__(self):
        self.redis = redis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)

    async def is_rate_limited(self, key: str, limit: int, window: int) -> bool:
        """
        Fixed window rate limiting using Redis.
        """
        current_time = int(time.time())
        window_start = current_time - (current_time % window)
        redis_key = f"rate_limit:{key}:{window_start}"

        count = await self.redis.incr(redis_key)
        if count == 1:
            await self.redis.expire(redis_key, window + 5)

        return count > limit

limiter = RateLimiter()

async def rate_limit_middleware(request: Request, call_next):
    # Only rate limit public and partner APIs
    if request.url.path.startswith(f"{settings.API_V1_STR}/public") or        request.url.path.startswith(f"{settings.API_V1_STR}/partner"):

        client_ip = request.client.host
        key = f"{request.url.path}:{client_ip}"

        # 100 requests per minute for public
        if await limiter.is_rate_limited(key, 100, 60):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please try again later."
            )

    return await call_next(request)
