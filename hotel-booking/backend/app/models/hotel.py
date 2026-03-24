from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, JSON, Date, DateTime, func
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
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
    geom = Column(Geometry(geometry_type='POINT', srid=4326))
    amenities = Column(JSON)
    media = Column(JSON)
    policies = Column(JSON)
    status = Column(String, default='PENDING_APPROVAL')
    reputation_score = Column(Float, default=0.0)

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
    housekeeping_status = Column(String, default="READY") # READY, DIRTY, IN_PROGRESS

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
    status = Column(String, default="CONFIRMED")
    channel = Column(String, default="DIRECT")

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

class ChannelAllocation(Base):
    __tablename__ = "channel_allocations"
    id = Column(String, primary_key=True)
    room_type_id = Column(String, ForeignKey("room_types.id"))
    channel = Column(String)
    allocated_quantity = Column(Integer, default=0)

class ShiftTemplate(Base):
    __tablename__ = "shift_templates"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    name = Column(String)
    start_time_base = Column(String)
    end_time_base = Column(String)

class ShiftAssignment(Base):
    __tablename__ = "shift_assignments"
    id = Column(String, primary_key=True)
    hotel_id = Column(String, ForeignKey("hotels.id"))
    user_id = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
