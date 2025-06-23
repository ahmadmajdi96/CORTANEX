from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

from registry import registry
from autoloader import load_all_handlers_from_folder

app = FastAPI()

load_all_handlers_from_folder()


class CommandRequest(BaseModel):
    command: str
    payload: dict


@app.post("/command")
async def run_command(request: CommandRequest):
    try:
        result = await registry.handle(request.command, request.payload)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)