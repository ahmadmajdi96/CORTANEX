from registry import registry

@registry.register("create_user")
async def create_user(payload: dict):
    query = """
    INSERT INTO users (name, email)
    VALUES (:name, :email)
    RETURNING *
    """
    result = await execute_sql(query, payload)
    return result[0]