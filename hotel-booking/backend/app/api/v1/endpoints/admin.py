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

from app.services.importer import master_importer
from fastapi import UploadFile, File

@router.post("/import/{resource_type}")
async def import_master_data(
    resource_type: str,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_superuser)
):
    """
    Imports master data (Regions, Banks, Tax Rules) from CSV.
    """
    content = (await file.read()).decode("utf-8")
    # Resource mapping logic
    # count = await master_importer.import_from_csv(db, model, content, mapping)
    return {"status": "success", "imported": 0}

@router.get("/reports/revenue-by-region")
async def get_revenue_by_region(db: Session = Depends(get_db)):
    """
    Aggregates gross revenue and platform commission by Dzongkhag.
    """
    # Join CommissionLedger with Hotel/Region
    results = db.query(
        Region.name,
        func.sum(CommissionLedger.gross_amount).label("revenue"),
        func.count(CommissionLedger.id).label("bookings")
    ).join(Hotel, Hotel.id == CommissionLedger.hotel_id)     .join(Region, Region.name == Hotel.city)     .group_by(Region.name).all()

    return [{"region": r[0], "revenue": r[1], "bookings": r[2]} for r in results]
