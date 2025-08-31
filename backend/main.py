# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
from typing import Optional

import boto3
from fastapi import HTTPException
import json

app = FastAPI()

# フロントエンドからのリクエストを許可するためのCORS設定
origins = [
    "http://localhost:5173",  # Viteのデフォルトポート
]

AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET = os.getenv("S3_BUCKET")
S3_PREFIX = os.getenv("S3_PREFIX")
S3_CLIENT = boto3.client('s3')

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

class god_peopele_model(BaseModel):
    name: str
    client: str
    
    text: str
    created_at: Optional[datetime] = None 
    
@app.post("/api/send-data")
def receive_data(data: dict):
    if not S3_BUCKET:
        raise HTTPException(status_code=500, detail="S3_BUCKET is not configured")
    
    # created_at が未入力ならUTCの現在時刻にする
    created_dt = payload.created_at or datetime.now(timezone.utc)
    # タイムスタンプ(ファイル名用)は秒精度のUTC
    ts_for_key = created_dt.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")

    # 保存するJSON本体（ISO8601のUTCで保存）
    record = {
        "name": payload.name,
        "text": payload.text,
        "created_at": created_dt.astimezone(timezone.utc).isoformat(),
        "saved_at": datetime.now(timezone.utc).isoformat(),
    }

    key = f"{S3_PREFIX}{payload.name}_{ts_for_key}.json"

    try:
        s3.put_object(
            Bucket=S3_BUCKET,
            Key=key,
            Body=json.dumps(record, ensure_ascii=False).encode("utf-8"),
            ContentType="application/json; charset=utf-8",
        )
    except ClientError as e:
        # S3エラーをHTTP 502 で返す
        raise HTTPException(status_code=502, detail=f"Failed to upload to S3: {e}")

    return {
        "ok": True,
        # "bucket": S3_BUCKET,
        # "key": key,
        "record": record,
    }