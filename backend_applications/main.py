# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from registry import registry
import autoloader

app = FastAPI()

# Auto-load all command handlers
autoloader.load_all_handlers_from_folder()

class CommandRequest(BaseModel):
    command: str
    payload: dict

@app.post("/command")
async def run_command(request: CommandRequest):
    result = await registry.handle(request.command, request.payload)
    return {"result": result}