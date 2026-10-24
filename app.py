from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import database

database.init_db()

app = FastAPI(title="Titu Kumar Portfolio API")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@app.get("/")
def home():
    return {
        "status": "Online",
        "developer": "Titu Kumar",
        "role": "Python Backend Developer"
    }

@app.post("/api/contact")
def submit_contact(payload: ContactMessage):
    try:
        database.insert_contact(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message
        )
        return {
            "status": "success",
            "message": f"Thank you {payload.name}! Your message has been saved in the database."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))