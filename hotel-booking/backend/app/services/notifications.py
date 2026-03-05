from typing import List, Dict, Any
from app.worker.tasks import send_booking_confirmation_email

class NotificationService:
    @staticmethod
    async def send_booking_confirmed(booking_id: int, recipient_email: str):
        # Trigger Celery Task
        send_booking_confirmation_email.delay(booking_id)

    @staticmethod
    async def notify_staff_shift_change(staff_id: int, message: str):
        # Logic for push notifications or internal dashboard alerts
        pass

notification_service = NotificationService()
