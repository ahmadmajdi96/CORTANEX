from registry import registry
from database import execute_sql 
from pydantic import BaseModel, EmailStr

class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr

@registry.register("create_client")
async def create_client(payload: dict):
    query = """
    INSERT INTO Clients (client_name)
    VALUES (:name)
    """
    result = await execute_sql(query, payload)
    id_result = await execute_sql("SELECT LAST_INSERT_ID() AS id", {})
    user_id = id_result[0]["id"]

    user_result = await execute_sql(
        "SELECT * FROM Clients WHERE id = :id",
        {"id": user_id}
    )
    return user_result[0]