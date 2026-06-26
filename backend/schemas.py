from pydantic import BaseModel
from typing import List, Optional

# =====================================================================
# СХЕМЫ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ (AUTH)
# =====================================================================

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    """Схема для регистрации: фронтенд присылает логин и сырой пароль"""
    password: str

class UserResponse(UserBase):
    """Схема ответа: возвращаем ID и логин (пароль возвращать нельзя!)"""
    id: str

    class Config:
        from_attributes = True


# =====================================================================
# СХЕМЫ ДЛЯ ЗАДАЧ (TASKS)
# =====================================================================

class TaskBase(BaseModel):
    text: str
    date: str  # Формат 'YYYY-MM-DD'

class TaskCreate(TaskBase):
    """Схема для создания: фронтенд присылает текст и дату"""
    pass

class TaskUpdate(BaseModel):
    """Схема для частичного изменения задачи (текст, статус или дата при переносе)"""
    text: Optional[str] = None
    date: Optional[str] = None
    completed: Optional[bool] = None

class TaskPositionUpdate(BaseModel):
    """Схема для изменения порядка: пара ID и его новая позиция"""
    id: str
    position: int

class ReorderTasksRequest(BaseModel):
    """Схема для массового обновления порядка задач после Drag-and-Drop"""
    tasks: List[TaskPositionUpdate]

class TaskResponse(TaskBase):
    """Схема ответа: возвращаем задачу со всеми системными полями базы данных"""
    id: str
    position: int
    completed: bool
    user_id: str

    class Config:
        from_attributes = True # Позволяет Pydantic читать данные напрямую из моделей SQLAlchemy
