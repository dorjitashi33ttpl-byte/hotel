from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_user
from app.services.chat import chat_service
from app.models.user import User
from typing import List

router = APIRouter()

@router.post("/bookings/{booking_id}/messages")
async def send_message(
    booking_id: str,
    content: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Sends a message scoped to a booking.
    """
    return await chat_service.send_scoped_message(db, booking_id, current_user.id, content)

@router.get("/bookings/{booking_id}/messages")
async def get_chat_history(
    booking_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieves the message history for a booking.
    """
    return await chat_service.get_booking_chat(db, booking_id)
