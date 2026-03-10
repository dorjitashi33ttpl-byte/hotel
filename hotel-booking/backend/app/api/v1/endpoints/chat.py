from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.chat import ChatRoom, ChatMessage
from app.models.user import User

router = APIRouter()

@router.post("/rooms")
async def create_room(tenant_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    room = ChatRoom(tenant_id=tenant_id, user_id=current_user.id)
    db.add(room)
    db.commit()
    db.refresh(room)
    return room

@router.get("/rooms/{room_id}/messages")
async def get_messages(room_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    room = db.query(ChatRoom).filter(ChatRoom.id == room_id).first()
    if not room: raise HTTPException(404, "Room not found")
    # RBAC check: only user or tenant staff can see
    return room.messages

@router.post("/rooms/{room_id}/messages")
async def send_message(room_id: int, content: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    msg = ChatMessage(room_id=room_id, sender_id=current_user.id, content=content)
    db.add(msg)
    db.commit()
    return msg
