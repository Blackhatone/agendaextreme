"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './layout.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else if (window.innerWidth >= 1024 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="main-content">
        <Header onMenuClick={() => setIsMobileOpen(true)} />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
