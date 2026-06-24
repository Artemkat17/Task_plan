import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import '../CSS/WeeklyPlanner.css';

// Интерфейс для задачи
interface Task {
  id: string;
  text: string;
}

// Интерфейс для дней недели
interface WeeklyTasks {
  [key: string]: Task[];
}

const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

export default function WeeklyPlanner() {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [inputTexts, setInputTexts] = useState<{ [key: string]: string }>({});

  // Начальное состояние задач (в будущем загрузится из FastAPI)
  const [tasks, setTasks] = useState<WeeklyTasks>({
    'Понедельник': [{ id: '1', text: 'Запустить проект на Vite' }],
    'Вторник': [{ id: '2', text: 'Связать фронтенд с FastAPI' }],
    'Среда': [],
    'Четверг': [],
    'Пятница': [],
    'Суббота': [],
    'Воскресенье': []
  });

  // Логика переключения недель
  const handlePrevWeek = () => setCurrentWeekOffset(prev => prev - 1);
  const handleNextWeek = () => setCurrentWeekOffset(prev => prev + 1);

  // Получение красивого текста текущей недели
  const getWeekLabel = () => {
    if (currentWeekOffset === 0) return 'Текущая неделя';
    if (currentWeekOffset === 1) return 'Следующая неделя';
    if (currentWeekOffset === -1) return 'Прошлая неделя';
    return `${currentWeekOffset > 0 ? '+' : ''}${currentWeekOffset} нед.`;
  };

  // Добавление задачи в конкретный день
  const handleAddTask = (day: string) => {
    const text = inputTexts[day]?.trim();
    if (!text) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: text
    };

    setTasks(prev => ({
      ...prev,
      [day]: [...prev[day], newTask]
    }));

    setInputTexts(prev => ({ ...prev, [day]: '' }));
  };

  // Удаление задачи
  const handleDeleteTask = (day: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [day]: prev[day].filter(task => task.id !== taskId)
    }));
  };

  // ---- HTML5 Drag and Drop Логика ----
  const handleDragStart = (e: React.DragEvent, taskId: string, sourceDay: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceDay }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Обязательно для разрешения drop
  };

  const handleDrop = (e: React.DragEvent, targetDay: string) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;

      const { taskId, sourceDay } = JSON.parse(dataStr);
      if (sourceDay === targetDay) return;

      // Находим перетаскиваемую задачу
      const taskToMove = tasks[sourceDay].find(t => t.id === taskId);
      if (!taskToMove) return;

      setTasks(prev => ({
        ...prev,
        [sourceDay]: prev[sourceDay].filter(t => t.id !== taskId),
        [targetDay]: [...prev[targetDay], taskToMove]
      }));
    } catch (error) {
      console.error('Ошибка Drag and Drop:', error);
    }
  };

  return (
    <div className="planner-container">
      {/* Шапка с выбором недели */}
      <div className="planner-header">
        <button className="week-nav-btn" onClick={handlePrevWeek}>
          <ChevronLeft size={20} />
        </button>
        <span className="week-title">{getWeekLabel()}</span>
        <button className="week-nav-btn" onClick={handleNextWeek}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Сетка дней недели */}
      <div className="planner-grid">
        {DAYS_OF_WEEK.map(day => (
          <div
            key={day}
            className="day-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, day)}
          >
            <h3 className="day-name">{day}</h3>

            {/* Форма добавления задачи */}
            <div className="task-input-box">
              <input
                type="text"
                placeholder="Новая задача..."
                value={inputTexts[day] || ''}
                onChange={(e) => setInputTexts(prev => ({ ...prev, [day]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask(day)}
              />
              <button onClick={() => handleAddTask(day)}>
                <Plus size={16} />
              </button>
            </div>

            {/* Список задач */}
            <div className="tasks-list">
              {tasks[day].map(task => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, day)}
                >
                  <span className="task-text">{task.text}</span>
                  <button
                    className="task-delete-btn"
                    onClick={() => handleDeleteTask(day, task.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
