from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.chat import ChatMessage
from typing import List

class ChatService:
    @staticmethod
    async def send_scoped_message(
        db: AsyncSession,
        booking_id: str,
        sender_id: str,
        content: str
    ):
        """
        Sends a message scoped to a specific booking.
        """
        msg = ChatMessage(
            booking_id=booking_id,
            sender_id=sender_id,
            content=content
        )
        db.add(msg)
        await db.commit()
        return msg

    @staticmethod
    async def get_booking_chat(db: AsyncSession, booking_id: str) -> List[ChatMessage]:
        stmt = select(ChatMessage).where(ChatMessage.booking_id == booking_id).order_by(ChatMessage.timestamp.asc())
        result = await db.execute(stmt)
        return result.scalars().all()

chat_service = ChatService()
