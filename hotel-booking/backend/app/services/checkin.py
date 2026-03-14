import hashlib
import time
from app.core.config import settings

class DigitalKeyService:
    @staticmethod
    def generate_key_token(booking_id: str, secret: str) -> str:
        """
        Generates a secure digital key token for the guest.
        """
        payload = f"{booking_id}:{secret}:{int(time.time())}"
        return hashlib.sha256(payload.encode()).hexdigest()

    async def get_digital_key_data(self, booking_id: str):
        # In production, verify booking status is 'CHECKED_IN'
        token = self.generate_key_token(booking_id, settings.SECRET_KEY)
        return {
            "qr_data": f"hotel-key://{booking_id}?token={token}",
            "expires_in": 3600
        }

digital_key_service = DigitalKeyService()

from app.models.hotel import PreArrivalForm, Booking
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

async def verify_pre_arrival_and_checkin(db: Session, booking_id: str):
    """
    Ensures pre-arrival form is completed before allowing digital check-in.
    """
    form = db.query(PreArrivalForm).filter(PreArrivalForm.booking_id == booking_id).first()
    if not form or not form.is_completed:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Please complete your pre-arrival form before checking in."
        )

    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    booking.status = "CHECKED_IN"
    db.commit()
    return {"status": "success", "message": "Checked in successfully"}
