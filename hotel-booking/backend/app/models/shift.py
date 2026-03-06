from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Time, JSON
from sqlalchemy.orm import relationship
from .base import Base

class ShiftTemplate(Base):
    __tablename__ = "shift_templates"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    name = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)

class ShiftAssignment(Base):
    __tablename__ = "shift_assignments"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    template_id = Column(Integer, ForeignKey("shift_templates.id"))
    date = Column(DateTime)

    user = relationship("User")
    template = relationship("ShiftTemplate")

class ShiftAuditLog(Base):
    __tablename__ = "shift_audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    assignment_id = Column(Integer, ForeignKey("shift_assignments.id"))
    action = Column(String) # CREATE, UPDATE, DELETE
    changed_by = Column(Integer, ForeignKey("users.id"))
    old_value = Column(JSON)
    new_value = Column(JSON)
    timestamp = Column(DateTime)
