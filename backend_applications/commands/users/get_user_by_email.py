from registry import registry

@registry.register("get_user_by_email")
async def get_user_by_email(payload: dict):
    query = "SELECT * FROM users WHERE email = :email"
    result = await execute_sql(query, payload)
    return result[0] if result else None