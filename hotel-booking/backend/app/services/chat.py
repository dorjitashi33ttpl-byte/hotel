from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.chat import ChatMessage

class ChatService:
    @staticmethod
    async def send_message(db: AsyncSession, sender_id: str, receiver_id: str, content: str, hotel_id: str):
        msg = ChatMessage(
            sender_id=sender_id,
            receiver_id=receiver_id,
            content=content,
            hotel_id=hotel_id
        )
        db.add(msg)
        await db.commit()
        return msg
