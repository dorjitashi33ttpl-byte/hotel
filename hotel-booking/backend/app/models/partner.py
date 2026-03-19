from sqlalchemy import Column, String, Integer, ForeignKey, JSON, DateTime, Boolean
from sqlalchemy.orm import relationship
from .base import Base

class PartnerApp(Base):
    __tablename__ = "partner_apps"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    api_key = Column(String, unique=True, index=True)
    webhook_url = Column(String)
    webhook_secret = Column(String)
    is_active = Column(Boolean, default=True)

class WebhookLog(Base):
    __tablename__ = "webhook_logs"
    id = Column(Integer, primary_key=True, index=True)
    partner_id = Column(Integer, ForeignKey("partner_apps.id"))
    event_type = Column(String)
    payload = Column(JSON)
    status_code = Column(Integer)
    response_body = Column(String)
    delivered_at = Column(DateTime)

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
