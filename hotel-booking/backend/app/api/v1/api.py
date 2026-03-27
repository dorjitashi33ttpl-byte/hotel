from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, hotels, bookings, admin, geo, payments, staff, partner, chat, tenant
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(hotels.router, prefix="/hotels", tags=["hotels"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(geo.router, prefix="/geo", tags=["geo"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(staff.router, prefix="/staff", tags=["staff"])
api_router.include_router(partner.router, prefix="/partner", tags=["partner"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(tenant.router, prefix="/tenant", tags=["tenant"])
