from registry import registry
from database import execute_sql 
from pydantic import BaseModel, EmailStr

class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr

@registry.register("create_user")
async def create_user(payload: dict):
    query = """
    INSERT INTO users (name, email)
    VALUES (:name, :email)
    """
    print("hello")
    result = await execute_sql(query, payload)
    # Since INSERT doesn't return rows, we use LAST_INSERT_ID()
    id_result = await execute_sql("SELECT LAST_INSERT_ID() AS id", {})
    user_id = id_result[0]["id"]

    user_result = await execute_sql(
        "SELECT * FROM users WHERE id = :id",
        {"id": user_id}
    )
    return user_result[0]