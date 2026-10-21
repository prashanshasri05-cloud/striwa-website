"""
STRIWA backend - FastAPI + SQLite
Run:  uvicorn main:app --reload
Docs: http://127.0.0.1:8000/docs
"""
import os
import sqlite3
from contextlib import asynccontextmanager, contextmanager
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"
TOKEN_DAYS = 7
DB_FILE = os.getenv("DB_FILE", "striwa.db")
ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")]


# ---------- Database ----------
@contextmanager
def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    with get_db() as db:
        db.execute(
            """CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )"""
        )
        db.execute(
            """CREATE TABLE IF NOT EXISTS subscribers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL
            )"""
        )


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="STRIWA API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Request shapes ----------
class SignupIn(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    email: EmailStr
    password: str = Field(min_length=6, max_length=72)


class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class JoinIn(BaseModel):
    email: EmailStr


# ---------- Helpers ----------
def now():
    return datetime.now(timezone.utc).isoformat()


def make_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(days=TOKEN_DAYS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def user_json(row) -> dict:
    return {"id": row["id"], "name": row["name"], "email": row["email"]}


bearer = HTTPBearer(auto_error=False)


def current_user(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    if creds is None:
        raise HTTPException(status_code=401, detail="Please log in first")
    try:
        data = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Session expired. Please log in again")
    with get_db() as db:
        row = db.execute("SELECT * FROM users WHERE id = ?", (data["sub"],)).fetchone()
    if row is None:
        raise HTTPException(status_code=401, detail="User not found")
    return row


# ---------- Routes ----------
@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/signup", status_code=201)
def signup(body: SignupIn):
    email = body.email.lower()
    hashed = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    with get_db() as db:
        if db.execute("SELECT 1 FROM users WHERE email = ?", (email,)).fetchone():
            raise HTTPException(status_code=409, detail="This email is already registered")
        cur = db.execute(
            "INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
            (body.name.strip(), email, hashed, now()),
        )
        row = db.execute("SELECT * FROM users WHERE id = ?", (cur.lastrowid,)).fetchone()
    return {"token": make_token(row["id"]), "user": user_json(row)}


@app.post("/api/login")
def login(body: LoginIn):
    email = body.email.lower()
    with get_db() as db:
        row = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if row is None or not bcrypt.checkpw(body.password.encode(), row["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Wrong email or password")
    return {"token": make_token(row["id"]), "user": user_json(row)}


@app.get("/api/me")
def me(user=Depends(current_user)):
    return user_json(user)


@app.post("/api/join")
def join(body: JoinIn):
    """Saves an email from the 'learn more about STRIWA' box."""
    email = body.email.lower()
    with get_db() as db:
        db.execute(
            "INSERT OR IGNORE INTO subscribers (email, created_at) VALUES (?, ?)",
            (email, now()),
        )
    return {"message": "Thank you! We will contact you soon."}