from typing import Optional, List

from tanktics.src.dals.base_dal import BaseDal
from tanktics.src.models.room import Room
from typing_extensions import Type


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

    async def get_room_by_id(self, room_id: str) -> Optional[Room]:
        room = await self.collection.find_one({"roomId": room_id})
        if room:
            return self.dal_model(**room)
        return None
