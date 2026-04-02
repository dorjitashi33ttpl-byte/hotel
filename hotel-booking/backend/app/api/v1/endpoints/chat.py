from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user_optional
from app.services.websocket import manager
from app.services.ai_concierge import ai_concierge
from app.models.chat import ChatMessage
import uuid
import json

router = APIRouter()

@router.websocket("/ws/{tenant_id}/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    tenant_id: str,
    user_id: str,
    db: Session = Depends(get_db)
):
    await manager.connect(websocket, tenant_id, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)

            # Persist guest message
            new_msg = ChatMessage(
                id=str(uuid.uuid4()),
                tenant_id=tenant_id,
                sender_id=user_id,
                content=message_data["content"],
                receiver_id=message_data.get("receiver_id")
            )
            db.add(new_msg)
            db.commit()

            # 1. Broadast to hotel staff
            await manager.broadcast_to_tenant(data, tenant_id)

            # 2. Check for AI Auto-response
            auto_reply = ai_concierge.get_auto_response(message_data["content"])
            if auto_reply:
                # Persist AI message
                ai_msg = ChatMessage(
                    id=str(uuid.uuid4()),
                    tenant_id=tenant_id,
                    sender_id="AI_CONCIERGE",
                    content=auto_reply,
                    receiver_id=user_id
                )
                db.add(ai_msg)
                db.commit()

                # Send back to user
                await manager.send_json_to_user({
                    "content": auto_reply,
                    "sender_id": "AI_CONCIERGE",
                    "timestamp": ai_msg.timestamp.isoformat()
                }, user_id)

    except WebSocketDisconnect:
        manager.disconnect(websocket, tenant_id, user_id)

@router.get("/history/{tenant_id}")
async def get_chat_history(
    tenant_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user_optional)
):
    if not current_user: raise HTTPException(status_code=401)
    messages = db.query(ChatMessage).filter(ChatMessage.tenant_id == tenant_id).filter(
        (ChatMessage.sender_id == str(current_user.id)) |
        (ChatMessage.receiver_id == str(current_user.id)) |
        (ChatMessage.receiver_id == None)
    ).order_by(ChatMessage.timestamp.asc()).limit(50).all()
    return messages
