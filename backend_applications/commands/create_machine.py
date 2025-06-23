from registry import registry
from database import execute_sql 
from pydantic import BaseModel, EmailStr

class UserCreateSchema(BaseModel):
    name: str
    client_id: str

@registry.register("create_machine")
async def create_machine(payload: dict):
    query = """
    INSERT INTO Machines (client_id, name)
    VALUES (:client_id, :name)
    """
    result = await execute_sql(query, payload)
    id_result = await execute_sql("SELECT LAST_INSERT_ID() AS id", {})
    user_id = id_result[0]["id"]

    user_result = await execute_sql(
        "SELECT * FROM Clients WHERE id = :id",
        {"id": user_id}
    )
    return user_result[0]