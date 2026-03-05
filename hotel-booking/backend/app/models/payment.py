from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float, JSON, DateTime
from sqlalchemy.orm import relationship
from .base import Base

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"))
    provider = Column(String)
    provider_payment_id = Column(String, index=True)
    amount = Column(Float)
    status = Column(String)
    raw_response = Column(JSON)

    booking = relationship("Booking")

class PaymentProviderConfig(Base):
    __tablename__ = "payment_provider_configs"
    id = Column(Integer, primary_key=True, index=True)
    country_id = Column(Integer, ForeignKey("countries.id"))
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=True)
    provider_type = Column(String)
    credentials_encrypted = Column(String)
    is_enabled = Column(Boolean, default=True)
    config_data = Column(JSON)

class CommissionLedger(Base):
    __tablename__ = "commission_ledger"
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"))
    gross_amount = Column(Float)
    commission_amount = Column(Float)
    net_amount = Column(Float)
    currency = Column(String(3))
    status = Column(String, default="pending") # pending, paid
    payout_id = Column(Integer, ForeignKey("payouts.id"), nullable=True)

class Payout(Base):
    __tablename__ = "payouts"
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), index=True)
    amount = Column(Float)
    currency = Column(String(3))
    payout_date = Column(DateTime)
    status = Column(String) # processed, failed
    reference = Column(String)
