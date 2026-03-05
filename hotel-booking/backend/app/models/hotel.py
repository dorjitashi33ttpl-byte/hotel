from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float, JSON, Date
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from .base import Base

class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), index=True)
    name = Column(String, index=True)
    description = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    location = Column(Geometry(geometry_type='POINT', srid=4326))
    inventory_mode = Column(String, default="room_type")
    amenities = Column(JSON, default=[])
    media = Column(JSON, default=[])
    menu_pdf_url = Column(String, nullable=True)

    tenant = relationship("Tenant")
    room_types = relationship("RoomType", back_populates="hotel")
    rate_plans = relationship("RatePlan", back_populates="hotel")
    policies = relationship("Policy", back_populates="hotel")

class RoomType(Base):
    __tablename__ = "room_types"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    name = Column(String)
    base_price = Column(Float)
    capacity = Column(Integer)
    total_quantity = Column(Integer)

    hotel = relationship("Hotel", back_populates="room_types")
    rooms = relationship("Room", back_populates="room_type")

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    room_type_id = Column(Integer, ForeignKey("room_types.id"))
    room_number = Column(String)
    is_active = Column(Boolean, default=True)

    room_type = relationship("RoomType", back_populates="rooms")

class RatePlan(Base):
    __tablename__ = "rate_plans"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    name = Column(String)
    is_active = Column(Boolean, default=True)

    hotel = relationship("Hotel", back_populates="rate_plans")
    seasonal_rates = relationship("SeasonalRate", back_populates="rate_plan")

class SeasonalRate(Base):
    __tablename__ = "seasonal_rates"
    id = Column(Integer, primary_key=True, index=True)
    rate_plan_id = Column(Integer, ForeignKey("rate_plans.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    multiplier = Column(Float, default=1.0)
    fixed_price = Column(Float, nullable=True)

    rate_plan = relationship("RatePlan", back_populates="seasonal_rates")

class Policy(Base):
    __tablename__ = "policies"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    type = Column(String) # CANCELLATION, HOUSE_RULES, CHECK_IN_OUT
    content = Column(String)
    is_active = Column(Boolean, default=True)

    hotel = relationship("Hotel", back_populates="policies")
