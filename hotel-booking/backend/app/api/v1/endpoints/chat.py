from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.chat import ChatMessage
from app.models.user import User

router = APIRouter()

@router.post("/send")
async def send_message(tenant_id: int, content: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    msg = ChatMessage(tenant_id=tenant_id, sender_id=current_user.id, content=content)
    db.add(msg)
    db.commit()
    return {"status": "sent"}

@router.get("/history")
async def get_chat_history(tenant_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(ChatMessage).filter(ChatMessage.tenant_id == tenant_id).order_by(ChatMessage.created_at.desc()).all()
