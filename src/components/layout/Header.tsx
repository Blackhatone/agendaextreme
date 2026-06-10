"use client";

import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import './layout.css';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn btn-ghost btn-icon" 
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar clientes, reservas, pagos..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="btn-ghost btn-icon notification-dot">
          <Bell size={20} />
        </button>
        <div className="header-profile">
          <div className="avatar">A</div>
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Sucursal Centro</span>
          </div>
        </div>
      </div>
    </header>
  );
}
