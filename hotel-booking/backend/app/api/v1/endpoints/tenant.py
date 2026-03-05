from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.models.hotel import Hotel, RoomType, Room
from app.models.shift import ShiftTemplate, ShiftAssignment

router = APIRouter()

@router.post("/hotels")
def create_hotel(
    name: str,
    address: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_owner_admin"]))
):
    hotel = Hotel(name=name, address=address, tenant_id=current_user.tenant_id)
    db.add(hotel)
    db.commit()
    return hotel
