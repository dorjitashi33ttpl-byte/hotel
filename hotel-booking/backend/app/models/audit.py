from sqlalchemy import Column, String, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from .base import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String) # CREATE_BOOKING, UPDATE_SHIFT, CANCEL_BOOKING
    entity_type = Column(String) # booking, shift, tenant
    entity_id = Column(Integer)
    changes = Column(JSON)
    ip_address = Column(String)

    user = relationship("User")
