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
