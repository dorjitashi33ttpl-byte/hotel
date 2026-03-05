from fastapi import APIRouter, Depends, HTTPException, Security, status
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.api import deps

router = APIRouter()

API_KEY_NAME = "X-API-KEY"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

@router.get("/search")
async def partner_search_availability(
    hotel_id: int,
    check_in: datetime,
    check_out: datetime,
    db: Session = Depends(deps.get_db)
):
    return {"available": True, "price": 150.0}
