from tanktics.models.base_schema import BaseSchema
from tanktics.models.position import Position


class Tank(BaseSchema):
    user_id: str
    room_id: str

    hearts: int
    actions: int
    range: int

    position: Position
