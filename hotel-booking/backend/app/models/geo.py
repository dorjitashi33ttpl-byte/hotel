from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, JSON, Date, DateTime, func
from .base import Base

class Country(Base):
    __tablename__ = "countries"
    id = Column(String, primary_key=True)
    iso_code = Column(String(2), unique=True, index=True) # e.g. BT, IN, TH
    name = Column(String, nullable=False)
    currency_code = Column(String(3), default="BTN")
    currency_symbol = Column(String(5), default="Nu.")
    phone_prefix = Column(String(5), default="+975")
    phone_format = Column(String) # e.g. "XX-XXXXXX"
    address_format = Column(JSON) # Field labels/ordering
    is_active = Column(Boolean, default=True)
    settings = Column(JSON) # Mapbox styles, support contact, etc.

class Region(Base):
    __tablename__ = "regions"
    id = Column(String, primary_key=True)
    country_id = Column(String, ForeignKey("countries.id"))
    name = Column(String, nullable=False)
    iso_code = Column(String(10)) # e.g. TH (Thimphu)

class TaxRule(Base):
    __tablename__ = "tax_rules"
    id = Column(String, primary_key=True)
    country_id = Column(String, ForeignKey("countries.id"))
    region_id = Column(String, ForeignKey("regions.id"), nullable=True)
    name = Column(String, nullable=False)
    percentage = Column(Float, nullable=False)
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date, nullable=True)
