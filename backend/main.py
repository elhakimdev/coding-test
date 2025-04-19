import asyncio
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import os
import json
from dotenv import load_dotenv
import uvicorn
from google import genai

load_dotenv()

app = FastAPI()

# Load dummy data
with open("../dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

# Read the GEMINI_API_KEY from the environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@app.get("/api/data")
def get_data():
    return DUMMY_DATA

import asyncio

async def stream_chunks(text: str):
    # Just simulate streaming the response word-by-word
    for word in text.split():
        yield word + " "
        await asyncio.sleep(0.05)  # simulate delay

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    body = await request.json()
    user_prompt = body.get("prompt", "")

    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.0-flash-001",
        contents=user_prompt,
    )
    print(response.text)

    return StreamingResponse(stream_chunks(response.text), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
