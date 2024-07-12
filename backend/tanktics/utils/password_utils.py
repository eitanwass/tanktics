import bcrypt


def hash_password(plain_password: str) -> str:
    return bcrypt.hashpw(plain_password, bcrypt.gensalt())


def check_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password, hashed_password)
