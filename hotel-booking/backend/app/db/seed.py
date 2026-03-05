from sqlalchemy.orm import Session
from app.models.tenant import Country, Tenant
from app.models.payment import PaymentProviderConfig
from app.models.hotel import Hotel, RoomType, InventoryMode
from app.models.user import User

def seed_data(db: Session):
    # 1. Seed Country: Bhutan
    bhutan = db.query(Country).filter(Country.iso_code == "BT").first()
    if not bhutan:
        bhutan = Country(
            name="Bhutan", iso_code="BT", currency="BTN", timezone="Asia/Thimphu",
            phone_format="+975-XXXXXXX", is_active=True,
            settings={
                "dzongkhags": ["Thimphu", "Paro", "Punakha", "Bumthang", "Phuentsholing"],
                "features": {"chat": True, "digital_checkin": True}
            }
        )
        db.add(bhutan)
        db.commit()
        db.refresh(bhutan)

    # 2. Seed a Sample Tenant (Hotel Owner)
    owner = db.query(User).filter(User.email == "owner@heritage.bt").first()
    if not owner:
        tenant = Tenant(name="Heritage Bhutan Group", slug="heritage-bt", country_id=bhutan.id, is_active=True)
        db.add(tenant)
        db.commit()
        db.refresh(tenant)

        owner = User(
            email="owner@heritage.bt", hashed_password="hashed_password",
            full_name="Jigme Dorji", role="hotel_owner_admin", tenant_id=tenant.id
        )
        db.add(owner)
        db.commit()

    # 3. Seed a Sample Hotel
    hotel = db.query(Hotel).filter(Hotel.name == "Thimphu Heritage Lodge").first()
    if not hotel:
        hotel = Hotel(
            tenant_id=owner.tenant_id, name="Thimphu Heritage Lodge",
            description="Authentic Bhutanese hospitality in the heart of the capital.",
            address="Norzin Lam, Thimphu", city="Thimphu", state="Thimphu",
            inventory_mode=InventoryMode.ROOM_TYPE,
            amenities=["Wifi", "Spa", "Restaurant", "Traditional Bath"]
        )
        db.add(hotel)
        db.commit()
        db.refresh(hotel)

    # 4. Seed Room Types
    rt = db.query(RoomType).filter(RoomType.hotel_id == hotel.id).first()
    if not rt:
        db.add(RoomType(hotel_id=hotel.id, name="Deluxe Heritage Room", base_price=5500.0, capacity=2, total_quantity=10))
        db.add(RoomType(hotel_id=hotel.id, name="Royal Suite", base_price=12000.0, capacity=3, total_quantity=2))
        db.commit()

    print("Deep seed data for Bhutan completed.")

if __name__ == "__main__":
    from app.db.session import SessionLocal
    db = SessionLocal()
    seed_data(db)
    db.close()
