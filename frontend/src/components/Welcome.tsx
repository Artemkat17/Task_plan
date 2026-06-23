import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import '../CSS/Welcome.css';

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2 className="welcome-title">Добро пожаловать в TaskManager!</h2>

        <p className="welcome-subtitle">
          Умный одностраничный планировщик, созданный для организации ваших ежедневных задач и долгосрочных целей.
        </p>

        <div className="welcome-features">
          <div className="feature-item">
            <CheckCircle2 className="feature-icon" size={20} />
            <span>Удобная система напоминаний, чтобы ничего не забыть.</span>
          </div>
          <div className="feature-item">
            <Calendar className="feature-icon" size={20} />
            <span>Распределение задач по дням недели и планирование далеко вперед.</span>
          </div>
        </div>

        <div className="welcome-cta">
          <p className="cta-text">
            Чтобы начать составлять свой идеальный день, необходимо авторизоваться в системе.
          </p>
          <Link to="/reg" className="welcome-btn">
            Присоединиться <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
