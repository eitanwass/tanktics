from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from tanktics.dals import tanks_dal
from tanktics.models.base_schema import BaseSchema
from tanktics.models.position import Position
from tanktics.models.tank import Tank

router = APIRouter()


class SetTankPositionParams(BaseSchema):
    user_id: str
    position: Position


@router.get(
    "/{room_id:str}/all",
    response_model=List[Tank],
    name="Get all tanks",
)
async def get_all_tanks(room_id: str) -> List[Tank]:
    return await tanks_dal.get_by_room_id(room_id)


@router.post(
    "/position",
    name="Set tank position"
)
async def set_tank_position(params: SetTankPositionParams) -> None:
    user_tank = await tanks_dal.get_by_user_id(params.user_id)
    if user_tank is None:
        raise HTTPException(status_code=400, detail=f"Tank with user ID {params.user_id} does not exist")
    await tanks_dal.update_by_user_id(params.user_id, {"position": params.position.model_dump()})
