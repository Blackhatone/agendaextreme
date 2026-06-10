"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CalendarDays, 
  CreditCard, 
  Users, 
  UserCircle, 
  ShoppingCart, 
  Package, 
  MessageSquare, 
  BarChart3, 
  HeadphonesIcon, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import './layout.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
  { id: 'agendamiento', label: 'Agendamiento', icon: CalendarDays, href: '/dashboard/agendamiento' },
  { id: 'pagos', label: 'Pagos y Facturación', icon: CreditCard, href: '/dashboard/pagos' },
  { id: 'crm', label: 'Clientes (CRM)', icon: Users, href: '/dashboard/crm' },
  { id: 'personal', label: 'Personal y Equipo', icon: UserCircle, href: '/dashboard/personal' },
  { id: 'pos', label: 'Caja / POS', icon: ShoppingCart, href: '/dashboard/pos' },
  { id: 'inventario', label: 'Inventario', icon: Package, href: '/dashboard/inventario' },
  { id: 'comunicaciones', label: 'Comunicaciones', icon: MessageSquare, href: '/dashboard/comunicaciones' },
  { id: 'analitica', label: 'Analítica', icon: BarChart3, href: '/dashboard/analitica' },
  { id: 'soporte', label: 'Soporte', icon: HeadphonesIcon, href: '/dashboard/soporte' },
  { id: 'configuracion', label: 'Configuración', icon: Settings, href: '/dashboard/configuracion' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div 
        className={`sidebar-backdrop ${isMobileOpen ? 'active' : ''}`} 
        onClick={() => setIsMobileOpen(false)}
      />
      <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {isOpen ? 'AgendaPro' : 'AP'}
          </div>
          <button 
            className="sidebar-toggle btn-ghost btn-icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                title={!isOpen ? item.label : undefined}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="sidebar-item-icon" size={20} />
                <span className="sidebar-item-label">{item.label}</span>
                {item.id === 'pagos' && <span className="badge-count sidebar-badge">3</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
