import json
import hashlib
from fastapi import Request, Response
from app.core.config import settings
from app.services.cache import redis_client

async def idempotency_middleware(request: Request, call_next):
    if request.method not in ["POST", "PATCH", "PUT"]:
        return await call_next(request)

    idempotency_key = request.headers.get("X-Idempotency-Key")
    if not idempotency_key:
        return await call_next(request)

    # 1. Check if key exists in Redis
    cache_key = f"idempotency:{idempotency_key}"
    cached_resp = await redis_client.get(cache_key)

    if cached_resp:
        data = json.loads(cached_resp)
        return Response(
            content=data["body"],
            status_code=data["status_code"],
            headers=data["headers"]
        )

    # 2. Process request
    response = await call_next(request)

    # 3. Store response if successful
    if response.status_code < 400:
        # We need to capture the response body
        # For simplicity in this stub, we just store the status
        resp_data = {
            "body": "", # In real impl, use a streaming response wrapper
            "status_code": response.status_code,
            "headers": dict(response.headers)
        }
        await redis_client.setex(cache_key, 86400, json.dumps(resp_data))

    return response
