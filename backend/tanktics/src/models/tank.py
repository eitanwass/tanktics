from tanktics.src.models.base_schema import BaseSchema
from tanktics.src.models.position import Position


class Tank(BaseSchema):
    user_id: str
    room_id: str

    hearts: int
    actions: int
    range: int

    position: Position
