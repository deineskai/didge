from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models, auth, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserSchema(BaseModel):
    username: str
    password: str

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(user_data: UserSchema = Body(...), db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user_data.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_pw = auth.get_password_hash(user_data.password)
    new_user = models.User(username=user_data.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@app.post("/login")
def login(user_data: UserSchema = Body(...), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == user_data.username).first()
    
    if not user or not auth.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = auth.create_access_token(data={"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/users/me")
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "message": "This data came securely from the database!"
    }


@app.post("/friends/request")
def send_friend_request(to_username: str = Body(...), current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    to_user = db.query(models.User).filter(models.User.username == to_username).first()
    if not to_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    existing_request = db.query(models.FriendRequest).filter(
        models.FriendRequest.from_user_id == current_user.id,
        models.FriendRequest.to_user_id == to_user.id
    ).first()
    
    if existing_request:
        raise HTTPException(status_code=400, detail="Friend request already sent")
    
    friend_request = models.FriendRequest(
        from_user_id=current_user.id,
        to_user_id=to_user.id,
        status="pending"
    )
    db.add(friend_request)
    db.commit()
    return {"message": "Friend request sent successfully"}


@app.post("/friends/request/respond")
def respond_to_friend_request(request_id: int = Body(...), accept: bool = Body(...), current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    friend_request = db.query(models.FriendRequest).filter(models.FriendRequest.id == request_id, models.FriendRequest.to_user_id == current_user.id).first()
    
    if not friend_request:
        raise HTTPException(status_code=404, detail="Friend request not found")
    
    if accept:
        friend_request.status = "accepted"
    else:
        db.delete(friend_request)
    db.commit()
    return {"message": f"Friend request {'accepted' if accept else 'rejected'} successfully"}

@app.post("/friends/request/revoke")
def revoke_friend_request(request_id: int = Body(..., embed=True), current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    friend_request = db.query(models.FriendRequest).filter(models.FriendRequest.id == request_id, models.FriendRequest.from_user_id == current_user.id).first()
    
    if not friend_request:
        raise HTTPException(status_code=404, detail="Friend request not found")
    
    db.delete(friend_request)
    db.commit()
    return {"message": "Friend request revoked successfully"}

@app.post("/friends/remove")
def remove_friend(friend_user_id: int = Body(..., embed=True), current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    friend_request = db.query(models.FriendRequest).filter(
        ((models.FriendRequest.from_user_id == current_user.id) & (models.FriendRequest.to_user_id == friend_user_id)) |
        ((models.FriendRequest.from_user_id == friend_user_id) & (models.FriendRequest.to_user_id == current_user.id))
    ).first()

    if not friend_request:
        raise HTTPException(status_code=404, detail="Friend request not found")

    db.delete(friend_request)
    db.commit()
    return {"message": "Friend removed successfully"}

@app.get("/friends/requests/incoming")
def get_friend_requests(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    requests = db.query(models.FriendRequest).filter(models.FriendRequest.to_user_id == current_user.id).filter(models.FriendRequest.status == "pending").all()
    result = []
    for r in requests:
        from_user = db.query(models.User).filter(models.User.id == r.from_user_id).first()
        result.append({"id": r.id, "from_user_id": r.from_user_id, "from_username": from_user.username if from_user else None, "status": r.status})
    return result


@app.get("/friends/requests/outgoing")
def get_outgoing_friend_requests(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    requests = db.query(models.FriendRequest).filter(models.FriendRequest.from_user_id == current_user.id).filter(models.FriendRequest.status == "pending").all()
    result = []
    for r in requests:
        to_user = db.query(models.User).filter(models.User.id == r.to_user_id).first()
        result.append({"id": r.id, "to_user_id": r.to_user_id, "to_username": to_user.username if to_user else None, "status": r.status})
    return result


@app.get("/friends")
def get_friends(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    accepted_requests = db.query(models.FriendRequest).filter(
        ((models.FriendRequest.from_user_id == current_user.id) | (models.FriendRequest.to_user_id == current_user.id)) &
        (models.FriendRequest.status == "accepted")
    ).all()
    
    friend_ids = set()
    for req in accepted_requests:
        if req.from_user_id != current_user.id:
            friend_ids.add(req.from_user_id)
        if req.to_user_id != current_user.id:
            friend_ids.add(req.to_user_id)
    
    friends = db.query(models.User).filter(models.User.id.in_(friend_ids)).all()
    return [{"id": f.id, "username": f.username} for f in friends]

