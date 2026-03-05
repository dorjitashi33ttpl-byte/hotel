from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List, Dict
from app.api import deps
from app.services.features import feature_flag_service
from app.models.chat import ChatMessage

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_personal_message(self, message: str, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Logic to route message to receiver
    except WebSocketDisconnect:
        manager.disconnect(user_id)

@router.post("/send")
async def send_message(
    hotel_id: int,
    message: str,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    if not feature_flag_service.is_enabled(db, current_user.tenant_id or 1, "chat"):
        raise HTTPException(status_code=403, detail="Chat feature is disabled.")

    chat_msg = ChatMessage(
        tenant_id=current_user.tenant_id or 1, hotel_id=hotel_id,
        sender_id=current_user.id, message=message
    )
    db.add(chat_msg)
    db.commit()

    # Optionally trigger manager.send_personal_message if receiver is online
    return {"status": "sent"}

@router.get("/history")
async def get_chat_history(
    hotel_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user)
):
    return {"messages": []}
