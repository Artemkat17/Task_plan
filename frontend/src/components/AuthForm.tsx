import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import '../CSS/AuthForm.css';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Инициализируем функцию перехода

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    // В будущем здесь будет запрос к FastAPI с использованием username
    const payload = isLogin ? { username, password } : { username, password };
    console.log(isLogin ? 'Вход:' : 'Регистрация:', payload);
  };

  // Функция обработки клика по фону
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Проверяем, что кликнули именно по контейнеру auth-container, а не по внутренним элементам
    if ((e.target as HTMLElement).className === 'auth-container') {
      navigate('/'); // Перенаправляем пользователя на главную страницу
    }
  };

  return (
    // Добавляем обработчик onClick на внешний контейнер
    <div className="auth-container" onClick={handleOverlayClick}>
      <div className="auth-box">
        {/* Вкладки переключения */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>

        {/* Форма */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин</label>
            <input
              type="text" /* Исправлено: значение "Username" для атрибута type некорректно в HTML, используем "text" */
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Подтвердите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>
      </div>
    </div>
  );
}
