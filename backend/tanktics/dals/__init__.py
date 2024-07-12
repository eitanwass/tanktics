from tanktics.dals.rooms_dal import RoomsDal
from tanktics.dals.tanks_dal import TanksDal
from tanktics.dals.user_dal import UserDal

tanks_dal = TanksDal(host="mongodb", port=27017)
rooms_dal = RoomsDal(host="mongodb", port=27017)
user_dal = UserDal(host="mongodb", port=27017)
