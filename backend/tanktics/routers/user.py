from typing import List

from fastapi import APIRouter
from tanktics.dals import rooms_dal
from tanktics.models.user import User

router = APIRouter()
