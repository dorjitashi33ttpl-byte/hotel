from sqlalchemy import Column, String, Integer, ForeignKey, JSON, DateTime, Boolean, Date, func
from sqlalchemy.orm import relationship
from .base import Base

class PartnerApp(Base):
    __tablename__ = "partner_apps"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    client_id = Column(String, unique=True, index=True, nullable=False)
    client_secret_hashed = Column(String, nullable=False)
    webhook_url = Column(String)
    webhook_secret = Column(String)
    is_active = Column(Boolean, default=True)

class PartnerQuota(Base):
    __tablename__ = "partner_quotas"
    id = Column(String, primary_key=True)
    partner_id = Column(String, ForeignKey("partner_apps.id"))
    daily_limit = Column(Integer, default=1000)
    current_usage = Column(Integer, default=0)
    reset_date = Column(Date, default=func.current_date())

class WebhookDeliveryLog(Base):
    __tablename__ = "webhook_delivery_logs"
    id = Column(String, primary_key=True)
    partner_id = Column(String, ForeignKey("partner_apps.id"))
    event_type = Column(String)
    payload = Column(JSON)
    status_code = Column(Integer)
    response_body = Column(String)
    duration_ms = Column(Integer)
    created_at = Column(DateTime, default=func.now())
