import json
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

# lambda初期化
lambda_client = boto3.client(
    'lambda',

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

class QuestionRequest(BaseModel):
    question: str
    session_id: str | None = None

@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        payload = {"query": request.question}
        if request.session_id:
            payload["sessionId"] = request.session_id

        # Lambdaを呼び出す
        response = lambda_client.invoke(
            FunctionName="output_claude_rag_agent",  # Lambda名に置き換える
            InvocationType="RequestResponse",
            Payload=json.dumps(payload)
        )

        # Payloadを読み込む
        response_payload = response['Payload'].read().decode('utf-8')
        response_dict = json.loads(response_payload)

        # Lambdaが辞書で返している場合はそのままbodyを取得
        body = response_dict.get('body', {})  # すでに dict なら json.loads は不要
        if isinstance(body, str):
            # 万が一文字列だった場合だけ辞書化
            body = json.loads(body)

        # AI回答とsessionIdを取得
        ai_response = body.get("response", "")
        session_id = body.get("sessionId")

        return {"answer": ai_response, "sessionId": session_id}

    except Exception as e:
        print("Exception occurred:", e)
        raise HTTPException(status_code=500, detail=str(e))
