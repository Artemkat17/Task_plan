import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import '../CSS/NavBar.css';

export default function NavBar() {

  return (
    <nav className="navbar">
      {/* Пустой блок для первой колонки сетки */}
      <div></div>

      <Link to="/" className="navbar-title">TaskManager</Link>

      <div className="navbar-login-container">
        <Link className="navbar-login-btn" to='reg'>
          Вход
        </Link>
      </div>
    </nav>
  );
}