from typing import List

from fastapi import APIRouter
from tanktics.src.dals import rooms_dal
from tanktics.src.models.room import Room

router = APIRouter()


@router.get(
    "/all",
    response_model=List[Room],
    name="Get all rooms",
)
async def get_all_rooms() -> List[Room]:
    return await rooms_dal.get_all()


@router.get(
    "/{room_id:str}",
    response_model=Room,
    name="Get room by ID",
)
async def get_room_by_id(room_id: str) -> Room:
    return await rooms_dal.get_room_by_id(room_id)
