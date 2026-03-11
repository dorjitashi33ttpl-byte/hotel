from functools import wraps
import json
import hashlib
from app.core.config import settings
import redis.asyncio as redis

redis_client = redis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)

def cache_response(ttl: int = 300):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Create a unique key based on function name and arguments
            key_data = f"{func.__name__}:{args}:{kwargs}"
            cache_key = f"search_cache:{hashlib.md5(key_data.encode()).hexdigest()}"

            # Check cache
            cached_val = await redis_client.get(cache_key)
            if cached_val:
                return json.loads(cached_val)

            # Execute function
            result = await func(*args, **kwargs)

            # Save to cache
            await redis_client.setex(cache_key, ttl, json.dumps(result))
            return result
        return wrapper
    return decorator

async def invalidate_tenant_cache(tenant_id: str):
    # Logic to invalidate all cache keys related to a specific tenant
    # (e.g., when they update their profile or room types)
    pattern = f"search_cache:*"
    keys = await redis_client.keys(pattern)
    if keys:
        await redis_client.delete(*keys)
