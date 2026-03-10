from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.services.fraud import fraud_check_service

router = APIRouter()

@router.post("/holds")
async def create_hold(request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Run Fraud Check
    fraud = await fraud_check_service.run_check(current_user, request.client.host)
    if fraud["is_blocked"]:
        raise HTTPException(403, detail=f"Booking hold rejected: {', '.join(fraud['reasons'])}")

    # Rest of hold logic...
    return {"status": "hold_created", "expiry_minutes": 15}
