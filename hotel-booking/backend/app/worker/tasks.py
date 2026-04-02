from app.worker.celery_app import celery_app
import httpx
import json
from app.services.notifications import notification_service
from app.services.websocket import manager
from app.models.hotel import Booking, Hotel
from app.utils.hmac_helper import hmac_helper
from sqlalchemy.orm import Session
from app.db.session import SessionLocal

@celery_app.task(bind=True, max_retries=5)
def dispatch_webhook(self, url: str, secret: str, payload: dict):
    """
    Dispatches a signed webhook to a partner endpoint.
    """
    body = json.dumps(payload, sort_keys=True)
    signature = hmac_helper.sign_payload(payload, secret)
    headers = {
        "Content-Type": "application/json",
        "X-Hotel-Signature": signature,
        "User-Agent": "HotelMasterpiece/1.0"
    }
    try:
        with httpx.Client() as client:
            response = client.post(url, content=body, headers=headers, timeout=10.0)
            response.raise_for_status()
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)

@celery_app.task
def notify_affected_bookings_on_shift_change(hotel_id: str, old_shift_id: str, new_shift_id: str):
    db = SessionLocal()
    try:
        hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
        bookings = db.query(Booking).filter(Booking.hotel_id == hotel_id, Booking.status == "CONFIRMED").all()
        for booking in bookings:
            # Async email
            celery_app.send_task("app.worker.tasks.send_async_email", args=["guest@example.com", booking.id, hotel_id, True])
            # WS Alert
            manager.send_json_to_user({"type": "SHIFT_UPDATE", "hotel": hotel.name}, booking.user_id)
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
