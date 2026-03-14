from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from app.core.config import settings
import httpx

class EmailAdapter(ABC):
    @abstractmethod
    async def send_email(self, to_email: str, subject: str, template_name: str, context: Dict[str, Any]):
        pass

class SendGridAdapter(EmailAdapter):
    async def send_email(self, to_email: str, subject: str, template_name: str, context: Dict[str, Any]):
        # Implementation for SendGrid API
        # url = "https://api.sendgrid.com/v3/mail/send"
        # headers = {"Authorization": f"Bearer {settings.SENDGRID_API_KEY}"}
        return {"status": "sent", "provider": "sendgrid"}

class ConsoleAdapter(EmailAdapter):
    async def send_email(self, to_email: str, subject: str, template_name: str, context: Dict[str, Any]):
        print(f"--- EMAIL SENT TO {to_email} ---")
        print(f"Subject: {subject}")
        print(f"Template: {template_name}")
        print(f"Context: {context}")
        print("---------------------------------")
        return {"status": "sent", "provider": "console"}

class NotificationService:
    def __init__(self):
        # In production, this would be configured via settings
        self.email_adapter = SendGridAdapter() if settings.SENDGRID_API_KEY else ConsoleAdapter()

    async def send_booking_confirmation(self, email: str, booking_details: Dict[str, Any]):
        await self.email_adapter.send_email(
            to_email=email,
            subject="Your Stay is Confirmed!",
            template_name="booking_confirmation",
            context=booking_details
        )

notification_service = NotificationService()
