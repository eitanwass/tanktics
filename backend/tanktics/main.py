from typing import Annotated

from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware
from tanktics.config import get_settings, Settings
from tanktics.routers import tanks, room, auth
from tanktics.routers.auth import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(
    tanks.router,
    prefix="/api/tanks",
    dependencies=[Depends(get_current_user)],
)

app.include_router(
    room.router,
    prefix="/api/room",
    dependencies=[Depends(get_current_user)],
)

app.include_router(
    auth.router,
    prefix="/api/auth",
)


@app.get("/health")
async def health():
    return "pong"


@app.get("/settings")
async def get_settings(settings: Annotated[Settings, Depends(get_settings)]):
    return settings


if __name__ == "__main__":
    pass
