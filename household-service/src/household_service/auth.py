from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import jose.jwt as jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = "DEVELOPMENT_SECRET_KEY"
ALGORITHM = "HS256"

def get_current_user_id(token: str = Depends(oauth2_scheme)):
    try:
        # Token dekodieren und Signatur prüfen
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return int(user_id)
    except Exception:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

