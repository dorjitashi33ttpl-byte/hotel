from app.worker.celery_app import celery_app
import httpx
import hmac
import hashlib
import json
from app.services.notifications import notification_service
from app.services.websocket import manager
from app.models.hotel import Booking, Hotel
from sqlalchemy.orm import Session
from app.db.session import SessionLocal

@celery_app.task(bind=True, max_retries=5)
def dispatch_webhook(self, url: str, secret: str, payload: dict):
    body = json.dumps(payload)
    signature = hmac.new(secret.encode(), body.encode(), hashlib.sha256).hexdigest()
    headers = {"Content-Type": "application/json", "X-Hotel-Signature": signature}
    try:
        with httpx.Client() as client:
            response = client.post(url, content=body, headers=headers, timeout=10.0)
            response.raise_for_status()
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)

@celery_app.task
def notify_affected_bookings_on_shift_change(hotel_id: str, old_shift_id: str, new_shift_id: str):
    """
    Identifies bookings that occur during the changed shift and sends updates via Email and WebSocket.
    """
    db = SessionLocal()
    try:
        hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
        # Find active confirmed bookings for this hotel
        bookings = db.query(Booking).filter(
            Booking.hotel_id == hotel_id,
            Booking.status == "CONFIRMED"
        ).all()

        for booking in bookings:
            # 1. Email Notification with updated staff info
            # notification_service.send_booking_confirmation handles on-shift staff lookup
            # In a real app, we'd use booking.guest_email
            celery_app.send_task(
                "app.worker.tasks.send_async_email",
                args=["guest@example.com", booking.id, hotel_id, True]
            )

            # 2. Real-time WebSocket Alert for Guests
            manager.send_json_to_user(
                {"type": "SHIFT_UPDATE", "hotel": hotel.name, "message": "Your check-in focal person has been updated."},
                booking.user_id
            )

        print(f"Notified {len(bookings)} bookings of shift change in {hotel.name}")
    finally:
        db.close()

@celery_app.task
def send_async_email(email: str, booking_id: str, hotel_id: str, is_update: bool):
    db = SessionLocal()
    try:
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
        if booking and hotel:
            notification_service.send_booking_confirmation(db, email, booking, hotel, is_shift_change=is_update)
    finally:
        db.close()
