from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, JSON, Date, Table, DateTime, func
from sqlalchemy.orm import relationship
from .base import Base

class Tenant(Base):
    __tablename__ = "tenants"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    subscription_plan = Column(String, default="starter")
    created_at = Column(DateTime, default=func.now())

class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(String, primary_key=True)
    tenant_id = Column(String, ForeignKey("tenants.id"))
    name = Column(String, nullable=False)
    description = Column(String)
    country = Column(String, default="BT")
    city = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    amenities = Column(JSON)
    media = Column(JSON)
    policies = Column(JSON)

class RoomType(Base):
    __tablename__ = "room_types"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    name = Column(String, nullable=False)
    base_price = Column(Float, nullable=False)
    total_quantity = Column(Integer, nullable=False)
    inventory_mode = Column(String, default="MODE_A") # MODE_A: Quantity, MODE_B: Fixed

class Room(Base):
    __tablename__ = "rooms"
    id = Column(String, primary_key=True)
    room_type_id = Column(String, ForeignKey("room_types.id"))
    hotel_id = Column(String, ForeignKey("hotels.id"))
    room_number = Column(String, nullable=False)
    is_maintenance = Column(Boolean, default=False)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    room_type_id = Column(String, ForeignKey("room_types.id"))
    room_id = Column(String, ForeignKey("rooms.id"), nullable=True)
    user_id = Column(String)
    guest_name = Column(String)
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)
    total_price = Column(Float)
    status = Column(String, default="CONFIRMED") # CONFIRMED, CHECKED_IN, COMPLETED, CANCELLED

class SeasonalRate(Base):
    __tablename__ = "seasonal_rates"
    id = Column(String, primary_key=True)
    room_type_id = Column(String, ForeignKey("room_types.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    rate = Column(Float, nullable=False)

class RatePlan(Base):
    __tablename__ = "rate_plans"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    name = Column(String)
    discount_pct = Column(Float)

class RoomMaintenance(Base):
    __tablename__ = "room_maintenance"
    id = Column(String, primary_key=True)
    room_id = Column(String, ForeignKey("rooms.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    reason = Column(String)

class ShiftAssignment(Base):
    __tablename__ = "shift_assignments"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    user_id = Column(String, ForeignKey("users.id"))
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    handover_notes = Column(String)
    created_at = Column(DateTime, default=func.now())
