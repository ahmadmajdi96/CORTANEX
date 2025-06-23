# autoloader.py
import os
import importlib.util

def load_all_handlers_from_folder(folder="commands"):
    for filename in os.listdir(folder):
        if filename.endswith(".py") and not filename.startswith("__"):
            module_name = f"{folder}.{filename[:-3]}"  # remove .py
            spec = importlib.util.find_spec(module_name)
            if spec:
                importlib.import_module(module_name)
                print(f"Loaded module: {module_name}")