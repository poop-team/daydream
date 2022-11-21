from typing import List, Optional

from pydantic import BaseModel

class Item(BaseModel):
    prompt: str

class res(BaseModel):
    prompt: str
    url: str
