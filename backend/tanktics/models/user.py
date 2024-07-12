from tanktics.models.base_schema import BaseSchema

UserId = str


class User(BaseSchema):
    user_id: UserId
    username: str
    password: str
    email: str
    disabled: bool = False
