from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import (
    public, admin, tenant, partner, checkin, walkin, calendar, chat, auth
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(public.router, prefix=f"{settings.API_V1_STR}/public", tags=["public"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(tenant.router, prefix=f"{settings.API_V1_STR}/tenant", tags=["tenant"])
app.include_router(partner.router, prefix=f"{settings.API_V1_STR}/partner", tags=["partner"])
app.include_router(checkin.router, prefix=f"{settings.API_V1_STR}/checkin", tags=["checkin"])
app.include_router(walkin.router, prefix=f"{settings.API_V1_STR}/walkin", tags=["walkin"])
app.include_router(calendar.router, prefix=f"{settings.API_V1_STR}/calendar", tags=["calendar"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Welcome to Hotel Booking SaaS API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
