from tanktics.src.models.base_schema import BaseSchema

UserId = str


class User(BaseSchema):
    user_id: UserId
    username: str
    email: str
