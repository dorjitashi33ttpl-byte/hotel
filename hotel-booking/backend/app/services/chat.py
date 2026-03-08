from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.chat import ChatMessage

class ChatService:
    @staticmethod
    async def translate_message(text: str, target_lang: str) -> str:
        """
        Placeholder for AI translation service (e.g., AWS Translate, Google Translate).
        For now, returns the original text.
        """
        # Logic to call external AI API would go here
        return f"[Translated to {target_lang}]: {text}"

    @staticmethod
    async def send_message(db: AsyncSession, sender_id: str, receiver_id: str, content: str, hotel_id: str):
        # Auto-detect and translate if needed (placeholder logic)
        translated_content = await ChatService.translate_message(content, "en")

        msg = ChatMessage(
            sender_id=sender_id,
            receiver_id=receiver_id,
            content=content,
            hotel_id=hotel_id,
            metadata={"translation": translated_content}
        )
        db.add(msg)
        await db.commit()
        return msg
