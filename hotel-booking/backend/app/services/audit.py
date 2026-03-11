from typing import Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.base import AuditLog
import uuid

class AuditService:
    @staticmethod
    async def log(
        db: AsyncSession,
        action: str,
        tenant_id: Optional[str] = None,
        user_id: Optional[str] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        old_value: Any = None,
        new_value: Any = None,
        ip_address: Optional[str] = None
    ):
        log_entry = AuditLog(
            id=str(uuid.uuid4()),
            tenant_id=tenant_id,
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            old_value=old_value,
            new_value=new_value,
            ip_address=ip_address
        )
        db.add(log_entry)
        await db.commit()

audit_service = AuditService()
