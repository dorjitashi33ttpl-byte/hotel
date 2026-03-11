from datetime import datetime
from typing import Any
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy import Column, DateTime, String, Integer, ForeignKey

@as_declarative()
class Base:
    id: Any
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MediaAttachment(Base):
    __tablename__ = "media_attachments"
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), index=True)
    filename = Column(String)
    file_url = Column(String)
    mime_type = Column(String)
    file_size = Column(Integer)
    entity_type = Column(String) # hotel_image, menu_pdf, guest_id
    entity_id = Column(Integer)

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String, primary_key=True)
    tenant_id = Column(String, index=True)
    user_id = Column(String, index=True)
    action = Column(String, nullable=False)
    resource_type = Column(String)
    resource_id = Column(String)
    old_value = Column(JSON)
    new_value = Column(JSON)
    ip_address = Column(String)
    timestamp = Column(DateTime, default=func.now())
