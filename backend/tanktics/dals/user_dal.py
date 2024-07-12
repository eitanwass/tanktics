from typing import Type, Optional

from tanktics.dals.base_dal import BaseDal
from tanktics.models.user import User


class UserDal(BaseDal[User]):
    @property
    def collection_name(self) -> str:
        return "users"

    @property
    def dal_model(self) -> Type[User]:
        return User

    async def get_by_username(self, username: str) -> Optional[User]:
        user_dict = await self.collection.find_one({"username": username})
        if user_dict:
            return User(**user_dict)
