import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.geo import Country, Region

async def seed():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as db:
        # 1. Seed Bhutan
        bhutan = Country(name="Bhutan", iso_code="BT", currency="BTN", timezone="Asia/Thimphu")
        db.add(bhutan)
        await db.flush()

        # 2. Seed Dzongkhags (Regions)
        regions = ["Thimphu", "Paro", "Punakha", "Bumthang", "Wangdue Phodrang"]
        for r_name in regions:
            db.add(Region(name=r_name, country_id=bhutan.id))

        await db.commit()
    print("Bhutan seed complete.")

if __name__ == "__main__":
    asyncio.run(seed())
