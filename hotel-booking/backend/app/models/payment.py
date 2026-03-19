from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float, JSON, DateTime, func
from sqlalchemy.orm import relationship
from .base import Base

class Payment(Base):
    __tablename__ = "payments"
    id = Column(String, primary_key=True)
    booking_id = Column(String, ForeignKey("bookings.id"))
    provider = Column(String)
    provider_payment_id = Column(String, index=True)
    amount = Column(Float)
    status = Column(String)
    raw_response = Column(JSON)

    booking = relationship("Booking")

class PaymentStatus:
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    REFUNDED = "REFUNDED"

class CommissionLedger(Base):
    __tablename__ = "commission_ledger"
    id = Column(String, primary_key=True)
    tenant_id = Column(String, index=True)
    booking_id = Column(String, ForeignKey("bookings.id"))
    hotel_id = Column(String, ForeignKey("hotels.id"))
    gross_amount = Column(Float)
    commission_amount = Column(Float)
    net_amount = Column(Float)
    currency = Column(String(3), default="BTN")
    status = Column(String, default="PENDING_PAYOUT") # PENDING_PAYOUT, PAID
    payout_id = Column(String, ForeignKey("payouts.id"), nullable=True)

class Payout(Base):
    __tablename__ = "payouts"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    amount = Column(Float, nullable=False)
    currency = Column(String(3), default="BTN")
    status = Column(String, default="PENDING") # PENDING, PROCESSED, FAILED
    processed_at = Column(DateTime)
    reference_number = Column(String)
    created_at = Column(DateTime, default=func.now())

class PaymentProviderRegistry(Base):
    __tablename__ = "payment_provider_registry"
    id = Column(String, primary_key=True)
    country_id = Column(String, ForeignKey("countries.id"))
    provider_type = Column(String) # stripe, razorpay, paypal, local_bank
    is_active = Column(Boolean, default=True)
    credentials_encrypted = Column(String) # Encrypted JSON
    settings = Column(JSON) # currencies, min/max limits
