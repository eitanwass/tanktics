from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from tanktics.src.routers import tanks, room

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
)

app.include_router(
    room.router,
    prefix="/api/room",
)


@app.get("/health")
async def health():
    return "pong"


if __name__ == "__main__":
    pass
