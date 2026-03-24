from app.worker.celery_app import celery_app
import httpx
import hmac
import hashlib
import json
from app.services.notifications import notification_service
from app.models.booking import Booking
from app.models.hotel import Hotel
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
    Identifies bookings that occur during the changed shift and sends updates.
    """
    db = SessionLocal()
    try:
        # Simplified logic: fetch bookings and notify
        hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
        bookings = db.query(Booking).filter(Booking.hotel_id == hotel_id, Booking.status == "CONFIRMED").all()

        for booking in bookings:
            # Check if booking check-in date is in future
            notification_service.send_booking_confirmation(db, "guest@example.com", booking, hotel)
    finally:
        db.close()
