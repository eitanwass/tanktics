from typing import Optional, Dict, Any, List

from tanktics.dals.base_dal import BaseDal
from tanktics.models.tank import Tank
from typing_extensions import Type


class TanksDal(BaseDal[Tank]):
    @property
    def collection_name(self) -> str:
        return "tanks"

    @property
    def dal_model(self) -> Type[Tank]:
        return Tank

    async def update_by_user_id(self, user_id: str, updated_data: Dict[str, Any]) -> None:
        await self.collection.update_one({"userId": user_id}, {"$set": updated_data})

    async def get_by_room_id(self, room_id: str) -> Optional[List[Tank]]:
        return await self.collection.find({"roomId": room_id}).to_list(length=None)

    async def get_by_user_id(self, user_id: str) -> Optional[Tank]:
        return await self.collection.find_one({"userId": user_id})
