from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from ai_model import analyze_food
import shutil
import os

app = FastAPI()

# CORS setup so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze(
    image: UploadFile = File(...),
    age: int = Form(...),
    gender: str = Form(...)
):
    # Save temporary image
    temp_path = f"temp_{image.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Hardcoded food list for now
    food_list = ["Chapati", "Paneer curry"]

    # Run your AI analysis
    result = analyze_food(temp_path, "path", food_list, age, gender)

    # Delete temp image
    os.remove(temp_path)

    return result

@app.get("/test")
async def test():
    return {"message": "FastAPI backend is working!"}
