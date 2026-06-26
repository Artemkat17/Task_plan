from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine

app = FastAPI(title="TaskPlan API")

# Автоматически создаем таблицы в базе данных (в файле taskplan.db) на основе моделей
models.Base.metadata.create_all(bind=engine)

# Настройка CORS, чтобы React (порт 5173) мог отправлять запросы к FastAPI (порт 8000)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Бэкенд TaskPlan успешно подключен к SQLite базе данных!"}
