from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class UserModel(Base):
    """Таблица пользователей"""
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # Здесь будут храниться хэши паролей

    # Связь с задачами: при удалении пользователя удалятся и его задачи (cascade)
    tasks = relationship("TaskModel", back_populates="owner", cascade="all, delete-orphan")


class TaskModel(Base):
    """Таблица задач (напоминаний)"""
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    text = Column(String, nullable=False)

    # Дата в формате строки 'YYYY-MM-DD' (удобно для фильтрации и фронтенда)
    date = Column(String, index=True, nullable=False)

    # Порядковый номер задачи на конкретный день для конкретного пользователя
    position = Column(Integer, default=0, nullable=False)

    # Привязка к пользователю
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    # Обратная связь с моделью пользователя
    owner = relationship("UserModel", back_populates="tasks")
