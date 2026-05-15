from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import requests

app = FastAPI()

# ===== API request =====
class ChatRequest(BaseModel):
    message: str


# ===== Ollama AI =====
def ask_ollama(msg: str):
    url = "http://localhost:11434/api/generate"

    payload = {
        "model": "llama3.2",
        "prompt": msg,
        "stream": False
    }

    res = requests.post(url, json=payload)
    return res.json()["response"]


# ===== chat API =====
@app.post("/chat")
def chat(req: ChatRequest):
    reply = ask_ollama(req.message)
    return {"reply": reply}


# ===== 靜態網頁 =====
app.mount("/", StaticFiles(directory="static", html=True), name="static")