from sqlalchemy.orm import Session
from app.models.shift import StaffShift, ShiftTemplate
from app.models.audit import AuditLog
from datetime import datetime

class StaffService:
    @staticmethod
    async def assign_shift(db: Session, staff_id: int, template_id: int, shift_date: datetime, admin_id: int):
        # 1. Create the shift assignment
        shift = StaffShift(
            staff_id=staff_id,
            template_id=template_id,
            start_time=shift_date,
            is_active=True
        )
        db.add(shift)

        # 2. Record audit log for compliance
        audit = AuditLog(
            user_id=admin_id,
            action="SHIFT_ASSIGNED",
            resource_type="STAFF_SHIFT",
            details=f"Assigned staff {staff_id} to template {template_id} for {shift_date}"
        )
        db.add(audit)

        db.commit()
        return shift

staff_service = StaffService()
