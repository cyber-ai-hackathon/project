# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# フロントエンドからのリクエストを許可するためのCORS設定
origins = [
    "http://localhost:5173",  # Viteのデフォルトポート
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/message")
def get_message():
    return {"message": "Hello from FastAPI!"}