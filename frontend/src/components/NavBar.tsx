import React from 'react';
import '../CSS/NavBar.css';

export default function NavBar() {
  const handleLoginClick = () => {
    console.log('Кнопка "Вход" нажата');
  };

  return (
    <nav className="navbar">
      {/* Пустой блок для первой колонки сетки */}
      <div></div>

      <h1 className="navbar-title">TaskPlan</h1>

      <div className="navbar-login-container">
        <button className="navbar-login-btn" onClick={handleLoginClick}>
          Вход
        </button>
      </div>
    </nav>
  );
}