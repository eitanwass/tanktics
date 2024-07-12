from typing import List

from fastapi import APIRouter
from tanktics.dals import rooms_dal
from tanktics.models.room import Room

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


@router.post(
    "/{room_id:str}/join",
    name="Join room",
)
async def join_room_by_id(room_id: str) -> None:
    await rooms_dal.add_user_to_room(room_id, None)
