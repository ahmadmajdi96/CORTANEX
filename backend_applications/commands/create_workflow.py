from registry import registry
from database import execute_sql 
from pydantic import BaseModel, EmailStr
import json

from typing import List

class WorkflowCreateSchema(BaseModel):
    name: str
    client_id: int
    production_line_id: int
    steps: List[str]

@registry.register("create_workflow")
async def create_workflow(payload: dict):
    try:
        validated = WorkflowCreateSchema(**payload)
    except Exception as e:
        raise ValueError(f"Invalid workflow data: {e}")

    payload_with_json = validated.dict()
    payload_with_json["steps"] = json.dumps(payload_with_json["steps"])

    query = """
    INSERT INTO Workflows (client_id, production_line_id, name, steps)
    VALUES (:client_id, :production_line_id, :name, :steps)
    """

    await execute_sql(query, payload_with_json)

    id_result = await execute_sql("SELECT LAST_INSERT_ID() AS id", {})
    workflow_id = id_result[0]["id"]

    result = await execute_sql("SELECT * FROM Workflows WHERE id = :id", {"id": workflow_id})

    row = result[0]
    if isinstance(row["steps"], str):
        row = dict(row)
        row["steps"] = json.loads(row["steps"])

    return row