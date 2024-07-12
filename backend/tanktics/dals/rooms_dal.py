from typing import Optional, List

from tanktics.dals.base_dal import BaseDal
from tanktics.models.room import Room, RoomId
from tanktics.models.user import User
from typing_extensions import Type


class RoomNotFoundException(BaseException):
    pass

class UserAlreadyInRoom(BaseException):
    pass


class RoomsDal(BaseDal[Room]):
    @property
    def collection_name(self) -> str:
        return "rooms"

    @property
    def dal_model(self) -> Type[Room]:
        return Room

    async def get_all(self) -> List[Room]:
        return [
            self.dal_model(**doc)
            async for doc in self.collection.find({
                "$or": [
                    {"gameSettings.isPublic": True},
                    {"gameSettings.allowedPlayers": {"$in": ["admin"]}}
                ]
            })
        ]

    async def get_room_by_id(self, room_id: RoomId) -> Optional[Room]:
        room = await self.collection.find_one({"roomId": room_id})
        if room:
            return self.dal_model(**room)
        return None

    async def add_user_to_room(self, room_id: RoomId, user: User):
        res = await self.collection.update_one(
            {"room_id": room_id},
            {"$addToSet": {"players": user.user_id}}
        )
        if res.matched_count == 0:
            raise RoomNotFoundException(f"Room {room_id} not found")
        if res.modified_count == 0:
            raise UserAlreadyInRoom(f"User {user.username} already in room {room_id}")
