from datetime import date
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

async def partner_quota_middleware(request: Request, call_next):
    """
    Enforces daily API quotas for partner applications.
    """
    if request.url.path.startswith(f"{settings.API_V1_STR}/partner"):
        partner_id = request.headers.get("X-Partner-ID")
        if not partner_id:
            raise HTTPException(status_code=401, detail="Partner identification missing")

        # 1. Increment usage in Redis
        usage_key = f"partner_usage:{partner_id}:{date.today().isoformat()}"
        usage = await limiter.redis.incr(usage_key)

        # 2. Compare against quota (Mocked limit of 1000)
        if usage > 1000:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Daily API quota exceeded."
            )

    return await call_next(request)
