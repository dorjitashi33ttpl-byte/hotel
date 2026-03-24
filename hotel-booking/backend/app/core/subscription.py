from fastapi import Request, HTTPException, status
from app.services.features import feature_flag_service
from app.api.deps import get_db

async def subscription_guard(request: Request, call_next):
    # Only check tenant-scoped routes
    if request.url.path.startswith("/api/v1/tenant"):
        # Extract tenant_id from headers or token (stubbed)
        tenant_id = request.headers.get("X-Tenant-ID")
        if tenant_id:
            # db = next(get_db())
            # In production, we'd check against feature_flag_service
            pass

    return await call_next(request)
