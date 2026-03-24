from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from app.core.config import settings
from app.services.staff import staff_service
from datetime import datetime

class EmailAdapter(ABC):
    @abstractmethod
    async def send_email(self, to_email: str, subject: str, template_name: str, context: Dict[str, Any]):
        pass

class SendGridAdapter(EmailAdapter):
    async def send_email(self, to_email: str, subject: str, template_name: str, context: Dict[str, Any]):
        return {"status": "sent", "provider": "sendgrid"}

class ConsoleAdapter(EmailAdapter):
    async def send_email(self, to_email: str, subject: str, template_name: str, context: Dict[str, Any]):
        print(f"--- EMAIL SENT TO {to_email} ---")
        print(f"Subject: {subject}")
        print(f"On-Shift Staff: {context.get('on_shift_staff')}")
        print(f"Menu Link: {context.get('menu_url')}")
        print("---------------------------------")
        return {"status": "sent", "provider": "console"}

class NotificationService:
    def __init__(self):
        self.email_adapter = SendGridAdapter() if hasattr(settings, 'SENDGRID_API_KEY') and settings.SENDGRID_API_KEY else ConsoleAdapter()

    async def send_booking_confirmation(self, db, email: str, booking: Any, hotel: Any):
        # 1. Get on-shift staff for check-in window
        staff = staff_service.get_on_shift_staff(db, hotel.id, booking.check_in)

        # 2. Generate signed menu URL
        # from app.services.notifications_utils import generate_signed_menu_url
        menu_url = f"https://api.hotel.bt/v1/public/hotels/{hotel.id}/menu/download?token=signed_stub"

        context = {
            "booking_id": booking.id,
            "hotel_name": hotel.name,
            "hotel_address": f"{hotel.city}, Bhutan",
            "shift_update": True if context.get('is_shift_change') else False,
            "on_shift_staff": staff,
            "menu_url": menu_url
        }

        await self.email_adapter.send_email(
            to_email=email,
            subject=f"Confirmation: Your Stay at {hotel.name}",
            template_name="booking_confirmation",
            context=context
        )

notification_service = NotificationService()

import hmac
import hashlib
import time

def generate_signed_menu_url(hotel_id: str, expires_in: int = 3600):
    """
    Generates a secure, time-limited URL for a hotel's menu PDF.
    """
    expires_at = int(time.time()) + expires_in
    message = f"{hotel_id}:{expires_at}"
    signature = hmac.new(
        settings.SECRET_KEY.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    return f"{settings.API_V1_STR}/public/hotels/{hotel_id}/menu/download?expires={expires_at}&signature={signature}"
