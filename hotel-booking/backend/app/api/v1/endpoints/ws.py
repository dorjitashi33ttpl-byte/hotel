from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from app.services.websocket import manager

router = APIRouter()

@router.websocket("/{tenant_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    tenant_id: str,
    token: str = Query(...)
):
    # In production, verify JWT token and ensure user belongs to tenant_id
    await manager.connect(websocket, tenant_id)
    try:
        while True:
            # Wait for any messages from client (optional)
            data = await websocket.receive_text()
            # Echo back or process
    except WebSocketDisconnect:
        manager.disconnect(websocket, tenant_id)
