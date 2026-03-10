from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    query = db.query(User)
    if search:
        query = query.filter(User.full_name.ilike(f"%{search}%"))

    total = query.count()
    users = query.offset((page - 1) * limit).limit(limit).all()

    return {"total": total, "items": users}

@router.get("/audit-logs")
async def get_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    return db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(100).all()

@router.get("/countries")
async def list_countries(db: Session = Depends(get_db)):
    return db.query(Country).all()
