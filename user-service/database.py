import sys

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

print(f"--- STARTUP DEBUG: ENV 'DATABASE_URL' is: {SQLALCHEMY_DATABASE_URL} ---", file=sys.stderr)

if not SQLALCHEMY_DATABASE_URL:
    print("--- CRITICAL: No DATABASE_URL found, using fallback! ---", file=sys.stderr)
    SQLALCHEMY_DATABASE_URL = "sqlite:///./users.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()