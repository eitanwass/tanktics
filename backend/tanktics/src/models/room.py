from enum import Enum
from typing import List

from pydantic import Field
from tanktics.src.models.base_schema import BaseSchema


class RoomGameMode(str, Enum):
    REGULAR = "regular"


class RoomGameSettings(BaseSchema):
    game_mode: RoomGameMode
    max_players: int
    is_public: bool
    allowed_players: List[str] = Field(default_factory=list)


class Room(BaseSchema):
    room_id: str
    name: str
    game_settings: RoomGameSettings
