from abc import ABC, abstractmethod
from typing import List, Generic, TypeVar

from motor.motor_asyncio import AsyncIOMotorClient
from tanktics.models.base_schema import BaseSchema
from typing_extensions import Type


T = TypeVar("T", bound=BaseSchema)


class BaseDal(ABC, Generic[T]):
    @property
    def database_name(self) -> str:
        return "tanktics"

    @property
    @abstractmethod
    def collection_name(self) -> str:
        pass

    @property
    @abstractmethod
    def dal_model(self) -> Type[T]:
        return T

    def __init__(
        self,
        host: str,
        port: int = 27017,
    ) -> None:
        self.client = AsyncIOMotorClient(host, port)
        self.collection = self.client[self.database_name][self.collection_name]

    async def get_all(self) -> List[T]:
        return [
            self.dal_model(**doc)
            async for doc in self.collection.find({})
        ]
