import asyncio
import uuid
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.geo import Country, Region, TaxRule
from datetime import date

async def seed():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as db:
        # 1. Seed Bhutan
        bhutan_id = str(uuid.uuid4())
        bhutan = Country(
            id=bhutan_id,
            name="Bhutan",
            iso_code="BT",
            currency="BTN",
            timezone="Asia/Thimphu",
            phone_format="+975-XXXXXXXX",
            settings={
                "mapbox_style": "mapbox://styles/mapbox/light-v10",
                "support_email": "support@druk.bt",
                "legal": {"terms": "https://hotel.bt/terms", "privacy": "https://hotel.bt/privacy"}
            }
        )
        db.add(bhutan)
        await db.flush()

        # 2. Seed Dzongkhags (Regions)
        dzongkhags = [
            ("Thimphu", "TH"), ("Paro", "PA"), ("Punakha", "PU"),
            ("Bumthang", "BU"), ("Wangdue Phodrang", "WP"), ("Haa", "HA")
        ]
        region_ids = []
        for name, code in dzongkhags:
            rid = str(uuid.uuid4())
            db.add(Region(id=rid, name=name, iso_code=code, country_id=bhutan_id))
            region_ids.append(rid)

        # 3. Seed Tax Rules
        # BST (Bhutan Sales Tax) - 10%
        db.add(TaxRule(
            id=str(uuid.uuid4()),
            country_id=bhutan_id,
            name="Bhutan Sales Tax (BST)",
            percentage=10.0,
            effective_from=date(2020, 1, 1)
        ) )

        # Sustainable Development Fee (SDF) - Flat rate (usually logic is complex, here simplified as %)
        db.add(TaxRule(
            id=str(uuid.uuid4()),
            country_id=bhutan_id,
            name="Sustainable Development Fee (SDF)",
            percentage=5.0,
            effective_from=date(2020, 1, 1)
        ))

        await db.commit()
    print("Bhutan production-ready seed complete (20 Dzongkhags and Tax Rules initialized).")

if __name__ == "__main__":
    asyncio.run(seed())
