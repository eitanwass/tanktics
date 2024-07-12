from enum import Enum
from typing import List

from pydantic import Field, field_serializer
from tanktics.models.base_schema import BaseSchema
from tanktics.models.user import User, UserId


RoomId = str


class RoomGameMode(str, Enum):
    REGULAR = "regular"


class RoomGameSettings(BaseSchema):
    game_mode: RoomGameMode
    max_players: int
    is_public: bool
    allowed_players: List[str] = Field(default_factory=list)


class Room(BaseSchema):
    room_id: RoomId
    name: str
    game_settings: RoomGameSettings
    players: List[User] = Field(default_factory=list)

    @field_serializer("players")
    def serialize_players(self, players: List[User], _info):
        return [player.dict(exclude={"email"}) for player in players]
