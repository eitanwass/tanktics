from tanktics.src.dals.rooms_dal import RoomsDal
from tanktics.src.dals.tanks_dal import TanksDal

tanks_dal = TanksDal(host="mongodb", port=27017)
rooms_dal = RoomsDal(host="mongodb", port=27017)
