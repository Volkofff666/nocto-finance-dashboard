import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
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
        
        <NavLink to="/transactions" className={({ isActive }) => `menu__item ${isActive ? 'active' : ''}`}>
          <i className="fas fa-exchange-alt"></i>
          <span>Транзакции</span>
        </NavLink>
        
        <NavLink to="/performance" className={({ isActive }) => `menu__item ${isActive ? 'active' : ''}`}>
          <i className="fas fa-users"></i>
          <span>Эффективность</span>
        </NavLink>
        
        <NavLink to="/kp-generator" className={({ isActive }) => `menu__item ${isActive ? 'active' : ''}`}>
          <i className="fas fa-file-invoice"></i>
          <span>Генератор КП</span>
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <div className="user-mini">
          <div className="avatar">A</div>
          <div className="user-info">
            <div className="name">Admin</div>
            <div className="role">Nocto Agency</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
