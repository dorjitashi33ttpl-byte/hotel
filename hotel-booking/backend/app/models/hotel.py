from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Float, JSON
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
    channel_configs = relationship("ChannelConfig", back_populates="hotel")

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

class ChannelConfig(Base):
    __tablename__ = "channel_configs"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    channel_name = Column(String) # direct, partner_ota
    allocation_percentage = Column(Float, default=100.0)
    is_active = Column(Boolean, default=True)

    hotel = relationship("Hotel", back_populates="channel_configs")
