# registry.py
from typing import Dict, Callable, Any
from fastapi import HTTPException

class CommandRegistry:
    def __init__(self):
        self.handlers: Dict[str, Callable] = {}

    def register(self, name: str):
        def wrapper(func):
            self.handlers[name] = func
            return func
        return wrapper

    async def handle(self, command_name: str, payload: Dict[str, Any]):
        print(self.handlers)
        if command_name not in self.handlers:
            print(command_name)
            raise HTTPException(status_code=404, detail=f"Command '{command_name}' not found")
        return await self.handlers[command_name](payload)

registry = CommandRegistry()