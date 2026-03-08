from sqlalchemy import Column, String, Date, ForeignKey, Boolean
from app.models.base import Base

class AvailabilityWatchlist(Base):
    __tablename__ = "availability_watchlists"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    hotel_id = Column(String, ForeignKey("hotels.id"))
    room_type_id = Column(String, ForeignKey("room_types.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)
    notified = Column(Boolean, default=False)
