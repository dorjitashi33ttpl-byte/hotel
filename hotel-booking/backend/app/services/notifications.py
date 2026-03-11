from typing import List, Dict, Any, Optional
from app.worker.tasks import send_booking_confirmation_email

class NotificationService:
    @staticmethod
    async def send_event(event_type: str, context: Dict[str, Any], recipient: str):
        # Dispatches to the appropriate worker task based on event type
        if event_type == "BOOKING_CONFIRMED":
            send_booking_confirmation_email.delay(context["booking_id"])

        # Internal Staff Alert logic
        if "staff_alert" in context:
            print(f"Internal Alert: {context['staff_alert']} for property {context.get('hotel_id')}")

    @staticmethod
    async def notify_late_arrival(booking_id: int, arrival_time: str):
        # Trigger background task for late arrival notification
        print(f"Task queued: Late arrival for {booking_id} at {arrival_time}")

notification_service = NotificationService()

import hmac
import hashlib
import time
from app.core.config import settings

def generate_signed_menu_url(hotel_id: str, menu_path: str, expires_in: int = 3600):
    """
    Generates a secure, time-limited signed URL for a property menu PDF.
    """
    expires_at = int(time.time()) + expires_in
    base_url = f"{settings.API_V1_STR}/public/hotels/{hotel_id}/menu/download"
    message = f"{menu_path}:{expires_at}"

    signature = hmac.new(
        settings.SECRET_KEY.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    return f"{base_url}?path={menu_path}&expires={expires_at}&signature={signature}"

def verify_menu_signature(menu_path: str, expires: int, signature: str):
    """
    Verifies the signature of a menu URL.
    """
    if int(time.time()) > expires:
        return False

    message = f"{menu_path}:{expires}"
    expected_signature = hmac.new(
        settings.SECRET_KEY.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected_signature)
