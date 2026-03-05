from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.api import deps
from app.models.hotel import RoomType

router = APIRouter()

@router.get("/availability")
async def get_availability_calendar(
    hotel_id: int,
    start_date: datetime,
    end_date: datetime,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.RoleChecker(["hotel_staff", "hotel_manager", "hotel_owner_admin"]))
):
    # Logic to return availability matrix (Mode A + Mode B)
    return {"availability": []}
