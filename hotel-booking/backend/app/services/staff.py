from sqlalchemy.orm import Session
from app.models.hotel import ShiftAssignment
from app.models.user import User
from datetime import datetime

class StaffService:
    @staticmethod
    def get_on_shift_staff(db: Session, hotel_id: str, checkin_time: datetime):
        """
        Finds staff members assigned to a shift during the check-in window.
        """
        staff = db.query(User).join(ShiftAssignment).filter(
            ShiftAssignment.hotel_id == hotel_id,
            ShiftAssignment.start_time <= checkin_time,
            ShiftAssignment.end_time >= checkin_time
        ).all()

        return [
            {
                "name": s.full_name,
                "role": "Concierge", # Mock role logic
                "contact": s.email
            } for s in staff
        ]

staff_service = StaffService()
