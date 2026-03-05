from sqlalchemy import Column, String, Integer, ForeignKey, Float, DateTime, Boolean
from sqlalchemy.orm import relationship
from .base import Base

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    booking_id = Column(Integer, ForeignKey("bookings.id"), unique=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Float)
    comment = Column(String)
    is_verified = Column(Boolean, default=True) # Booking confirmed
    is_active = Column(Boolean, default=True)

    hotel = relationship("Hotel")
    booking = relationship("Booking")
    user = relationship("User")
