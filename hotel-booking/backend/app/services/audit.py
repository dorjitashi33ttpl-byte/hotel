from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.audit import AuditLog

class AuditService:
    @staticmethod
    def log_action(
        db: Session,
        tenant_id: Optional[int],
        user_id: int,
        action: str,
        entity_type: str,
        entity_id: int,
        changes: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None
    ):
        log = AuditLog(
            tenant_id=tenant_id,
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            changes=changes,
            ip_address=ip_address
        )
        db.add(log)
        db.commit()
        return True

audit_service = AuditService()
