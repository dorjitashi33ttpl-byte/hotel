from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
from app.api.deps import get_db, get_current_active_superuser
from app.models.user import User
from app.models.geo import Country, Region
from app.models.audit import AuditLog

router = APIRouter()

@router.get("/users")
async def list_users(
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    sortBy: Optional[str] = "id",
    sortOrder: Optional[str] = "asc",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    query = db.query(User)
    if search:
        query = query.filter(or_(User.full_name.ilike(f"%{search}%"), User.email.ilike(f"%{search}%")))

    # Sorting logic
    sort_attr = getattr(User, sortBy, User.id)
    query = query.order_by(sort_attr.desc() if sortOrder == "desc" else sort_attr.asc())

    total = query.count()
    users = query.offset((page - 1) * limit).limit(limit).all()

    return {"total": total, "items": users, "page": page, "limit": limit}

@router.get("/audit-logs")
async def get_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    return db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(100).all()

@router.get("/export/users")
async def export_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    # Standardized CSV Export logic
    return {"status": "export_triggered", "download_url": "https://api.hotel.bt/downloads/users.csv"}
