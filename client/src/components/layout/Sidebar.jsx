import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        NOCTO<span className="dot">.</span>
      </div>

      <nav className="menu">
        <NavLink to="/" className={({ isActive }) => `menu__item ${isActive ? 'active' : ''}`}>
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/kp-generator" className={({ isActive }) => `menu__item ${isActive ? 'active' : ''}`}>
          <i className="fas fa-file-invoice"></i>
          <span>Генератор КП</span>
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <div className="user-mini">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <div className="name">{user?.name || 'User'}</div>
            <div className="role">{user?.role || 'manager'}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Выйти
        </button>
      </div>
    </aside>
  );
}