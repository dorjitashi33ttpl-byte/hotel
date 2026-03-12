
class Country(Base):
    __tablename__ = "countries"
    id = Column(String, primary_key=True)
    iso_code = Column(String, unique=True, index=True)
    name = Column(String, nullable=False)
    currency = Column(String, default="BTN")
    timezone = Column(String, default="Asia/Thimphu")
    phone_format = Column(String)
    is_active = Column(Boolean, default=True)
    settings = Column(JSON) # Mapbox keys, support contacts, legal URLs

class Region(Base):
    __tablename__ = "regions"
    id = Column(String, primary_key=True)
    country_id = Column(String, ForeignKey("countries.id"))
    name = Column(String, nullable=False)
    iso_code = Column(String)

class TaxRule(Base):
    __tablename__ = "tax_rules"
    id = Column(String, primary_key=True)
    country_id = Column(String, ForeignKey("countries.id"))
    region_id = Column(String, ForeignKey("regions.id"), nullable=True)
    name = Column(String, nullable=False)
    percentage = Column(Float, nullable=False)
    effective_from = Column(Date, nullable=False)
    effective_to = Column(Date, nullable=True)
