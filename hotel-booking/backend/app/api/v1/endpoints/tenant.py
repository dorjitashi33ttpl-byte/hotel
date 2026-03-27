from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.api.deps import get_db, get_current_tenant_user
from app.models.hotel import Hotel, RoomType, ChannelAllocation
from app.services.financials import financial_service
from app.services.features import feature_flag_service

router = APIRouter()

@router.get("/hotels/{hotel_id}/metrics")
async def get_hotel_metrics(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    """
    Returns business intelligence metrics for the hotel.
    """
    if str(current_user.tenant_id) != hotel_id and current_user.role != "platform_admin":
        raise HTTPException(status_code=403, detail="Not authorized for this hotel")

    return financial_service.get_tenant_analytics(db, hotel_id)

@router.get("/hotels/{hotel_id}/channel-allocation")
async def get_channel_allocation(
    hotel_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    return db.query(ChannelAllocation).join(RoomType).filter(RoomType.hotel_id == hotel_id).all()

@router.post("/hotels/{hotel_id}/channel-allocation")
async def update_channel_allocation(
    hotel_id: str,
    data: List[Dict[str, Any]],
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    # Logic to update or create channel allocations
    return {"status": "updated"}

@router.patch("/hotels/{hotel_id}/policies")
async def update_hotel_policies(
    hotel_id: str,
    policies: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_tenant_user)
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel: raise HTTPException(404)
    hotel.policies = policies
    db.commit()
    return hotel
