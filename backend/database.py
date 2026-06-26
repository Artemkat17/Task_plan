from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Имя файла, в котором хранятся все таблицы и задачи
SQLALCHEMY_DATABASE_URL = "sqlite:///./taskmanager.db"

# Для SQLite важно добавить аргумент check_same_thread=False,
# так как FastAPI работает в несколько потоков, а SQLite по умолчанию этого не любит
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Фабрика сессий для запросов
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

# Функция-помощник для FastAPI (открывает и закрывает соединение)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
