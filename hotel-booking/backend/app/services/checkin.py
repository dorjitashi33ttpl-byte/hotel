from app.models.booking import Booking
from sqlalchemy.orm import Session
from typing import Dict, Any

class CheckInService:
    @staticmethod
    async def submit_pre_arrival(db: Session, booking_id: int, form_data: Dict[str, Any]):
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        if not booking: return False

        # Store pre-arrival metadata
        booking.metadata_info = booking.metadata_info or {}
        booking.metadata_info.update({
            "pre_arrival_submitted": True,
            "document_id": form_data.get("document_id"),
            "expected_arrival": form_data.get("expected_arrival"),
            "dietary_notes": form_data.get("dietary_notes")
        )

        db.commit()
        return True

    @staticmethod
    async def verify_checkin_qr(db: Session, token: str) -> bool:
        # Simple verification logic
        # token format: KEY-{booking_id}-{user_id}
        parts = token.split("-")
        if len(parts) != 3: return False

        booking_id = int(parts[1])
        booking = db.query(Booking).filter(Booking.id == booking_id).first()
        if booking and booking.status == "confirmed":
            booking.status = "checked_in"
            db.commit()
            return True
        return False

checkin_service = CheckInService()
