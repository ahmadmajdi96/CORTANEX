from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

DATABASE_URL = "mysql+asyncmy://root:rootpassword@localhost/CORTANEX_AI"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def execute_sql(query: str, params: dict = None):
    async with AsyncSessionLocal() as session:
        try:
            result = await session.execute(text(query), params or {})

            if not result.returns_rows:
                await session.commit()

            if result.returns_rows:
                return result.mappings().all()
            else:
                return None
        except Exception as e:
            await session.rollback()
            raise e