from datetime import timedelta, datetime
from typing import Annotated, Dict, Optional

import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jwt import InvalidTokenError
from starlette import status
from tanktics.config import get_settings, Settings
from tanktics.dals import user_dal
from tanktics.models.user import User
from tanktics.utils.password_utils import check_password, hash_password

CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

INCORRECT_CREDENTIALS_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"WWW-Authenticate": "Bearer"},
)

INACTIVE_USER_EXCEPTION = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Inactive user"
)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: Dict, jwt_secret: str, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
        to_encode.update({"exp": expire})
    return jwt.encode(to_encode, jwt_secret, algorithm=ALGORITHM)


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    settings: Annotated[Settings, Depends(get_settings)]
):
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
        username_sub = payload.get("sub")
        if not username_sub:
            raise CREDENTIALS_EXCEPTION
    except InvalidTokenError:
        raise CREDENTIALS_EXCEPTION

    username = username_sub.split(":")[-1]

    user = user_dal.get_by_username(username)
    if user is None:
        raise CREDENTIALS_EXCEPTION
    if user.disabled:
        raise INACTIVE_USER_EXCEPTION
    return user


async def authenticate_user(username: str, password: str) -> Optional[User]:
    user = await user_dal.get_by_username(username)
    if not user:
        return None
    if not check_password(password, user.password):
        return None
    return user


@router.post("/token")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    settings: Annotated[Settings, Depends(get_settings)],
):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise INCORRECT_CREDENTIALS_EXCEPTION

    access_token_expire = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": f"username:{user.username}"},
        jwt_secret=settings.jwt_secret,
        expires_delta=access_token_expire
    )

    return {"access_token": access_token, "token_type": "bearer"}
