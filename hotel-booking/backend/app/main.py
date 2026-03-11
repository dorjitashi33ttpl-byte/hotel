from sqlalchemy import func
import time
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from prometheus_client import make_asgi_app
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.rate_limit import rate_limit_middleware
from app.api.v1.endpoints import (
    public, admin, tenant, partner, checkin, walkin, calendar, chat, auth, ws
)

setup_logging()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Global Performance Middleware
@app.middleware("http")
async def rate_limit_wrapper(request: Request, call_next):
    return await rate_limit_middleware(request, call_next)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred. Please contact support."},
    )

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(public.router, prefix=f"{settings.API_V1_STR}/public", tags=["public"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(tenant.router, prefix=f"{settings.API_V1_STR}/tenant", tags=["tenant"])
app.include_router(partner.router, prefix=f"{settings.API_V1_STR}/partner", tags=["partner"])
app.include_router(checkin.router, prefix=f"{settings.API_V1_STR}/checkin", tags=["checkin"])
app.include_router(walkin.router, prefix=f"{settings.API_V1_STR}/walkin", tags=["walkin"])
app.include_router(calendar.router, prefix=f"{settings.API_V1_STR}/calendar", tags=["calendar"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])
app.include_router(ws.router, prefix=f"{settings.API_V1_STR}/ws", tags=["ws"])

@app.get("/")
async def root():
    return {"message": "Welcome to Hotel Booking SaaS API"}

from app.core.database import engine
import redis.asyncio as redis

@app.get("/health")
async def health_check():
    health = {"status": "healthy", "checks": {}}

    # Check DB
    try:
        async with engine.connect() as conn:
            await conn.execute(func.now())
        health["checks"]["database"] = "up"
    except Exception:
        health["checks"]["database"] = "down"
        health["status"] = "unhealthy"

    # Check Redis
    try:
        r = redis.from_url(settings.REDIS_URL)
        await r.ping()
        health["checks"]["redis"] = "up"
    except Exception:
        health["checks"]["redis"] = "down"
        health["status"] = "unhealthy"

    return health

# Observability Stubs (Production Only)
if settings.SENTRY_DSN:
    # import sentry_sdk
    # sentry_sdk.init(dsn=settings.SENTRY_DSN, traces_sample_rate=1.0)
    pass

# OpenTelemetry Middleware Placeholder
# from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
# FastAPIInstrumentor.instrument_app(app)
