from sqlalchemy import Column, Integer, String
from user_service.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


class FriendRequest(Base):
    __tablename__ = "friend_requests"

    id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer)
    to_user_id = Column(Integer)
    status = Column(String)  # pending, accepted, rejected
