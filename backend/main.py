from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import boto3
import uuid
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # フロントのURLを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# S3クライアント初期化（直接書き込み）
s3 = boto3.client(
    's3',
)

BUCKET_NAME = 'god-people'  # バケット名だけでOK、arn形式は不要

# Pydanticモデル
class FormData(BaseModel):
    houkokuSha: str
    client: str
    houkokuShomei: str
    category: str
    scenarioHonbun: str
    chuiTenHoketsu: str = ""
    sankouShiryo: str = ""

@app.post("/upload-form")
async def upload_form(data: FormData):
    try:
        object_key = f"forms/{uuid.uuid4()}.json"
        s3.put_object(
            Bucket=BUCKET_NAME,
            Key=object_key,
            Body=data.json().encode('utf-8'),
            ContentType='application/json'
        )
        return {"message": "属人データS3に保存成功しました", "s3_key": object_key}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AIエージェント対する処理
class QuestionRequest(BaseModel):
    question: str
    # staff: str

AI_AGENT_API_URL = ""

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        # 作成されたAIエージェントに質問を送信する
        payload = {
            "question": request.question,
            "format": "markdown"
        }
        response = requests.post(AI_AGENT_API_URL, json=payload)
        response.raise_for_status()
        answer = response.json().get("answer", "No answer found")
        return {
            "answer": answer
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 