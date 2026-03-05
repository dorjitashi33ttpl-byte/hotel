from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.services.features import feature_flag_service
from app.models.chat import ChatMessage

router = APIRouter()

@router.post("/send")
async def send_message(
    hotel_id: int,
    message: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    if not feature_flag_service.is_enabled(db, current_user.tenant_id or 1, "chat"):
        raise HTTPException(status_code=403, detail="Chat feature is disabled for this tenant")

    chat_msg = ChatMessage(
        tenant_id=current_user.tenant_id or 1,
        hotel_id=hotel_id,
        sender_id=current_user.id,
        message=message
    )
    db.add(chat_msg)
    db.commit()
    return {"status": "sent"}

@router.get("/history")
async def get_chat_history(
    hotel_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    # Logic to fetch messages between customer and hotel
    return {"messages": []}
