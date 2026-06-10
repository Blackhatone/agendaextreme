"use client";

import React from 'react';
import { Users, CalendarDays, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>Hola, Admin 👋</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Aquí tienes el resumen de tu negocio de hoy.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary">
            <CalendarDays size={18} /> Ver Calendario
          </button>
          <button className="btn btn-primary">
            + Nuevo Turno
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-8)'
      }}>
        {/* Stat Cards */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-icon" style={{ background: 'var(--brand-primary-glow)', color: 'var(--brand-primary-light)' }}>
              <DollarSign size={24} />
            </div>
            <span className="stat-trend up"><TrendingUp size={14} /> +12%</span>
          </div>
          <div>
            <div className="stat-value">$145,200</div>
            <div className="stat-label">Ingresos del Día</div>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-icon" style={{ background: 'rgba(0, 206, 201, 0.15)', color: 'var(--brand-secondary)' }}>
              <CalendarDays size={24} />
            </div>
            <span className="stat-trend up"><TrendingUp size={14} /> +3</span>
          </div>
          <div>
            <div className="stat-value">24</div>
            <div className="stat-label">Citas Hoy</div>
          </div>
        </div>

        <div className="stat-card" style={{ borderColor: 'var(--warning)', boxShadow: '0 0 15px var(--warning-bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-icon" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <CreditCard size={24} />
            </div>
            <div className="badge badge-count">3</div>
          </div>
          <div>
            <div className="stat-value">3</div>
            <div className="stat-label" style={{ color: 'var(--warning)' }}>Comprobantes Pendientes</div>
          </div>
          <div style={{ marginTop: 'var(--space-2)' }}>
            <button className="btn btn-sm btn-ghost" style={{ width: '100%', border: '1px solid var(--warning-light)', color: 'var(--warning)' }}>
              Revisar ahora
            </button>
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="stat-icon" style={{ background: 'rgba(253, 121, 168, 0.15)', color: 'var(--brand-accent)' }}>
              <Users size={24} />
            </div>
            <span className="stat-trend">0%</span>
          </div>
          <div>
            <div className="stat-value">5</div>
            <div className="stat-label">Nuevos Clientes</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Próximas Citas */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Próximas Citas</h3>
            <button className="btn-ghost" style={{ fontSize: 'var(--text-sm)' }}>Ver todas</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ fontWeight: 500 }}>María Rodríguez</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>+54 9 11 1234-5678</div>
                  </td>
                  <td>Corte + Coloración</td>
                  <td style={{ fontWeight: 600 }}>11:30 AM</td>
                  <td><span className="badge badge-success">Confirmada</span></td>
                </tr>
                <tr>
                  <td>
                    <div style={{ fontWeight: 500 }}>Juan Pérez</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>+54 9 11 9876-5432</div>
                  </td>
                  <td>Masaje Descontracturante</td>
                  <td style={{ fontWeight: 600 }}>12:00 PM</td>
                  <td><span className="badge badge-warning">Validando Pago</span></td>
                </tr>
                <tr>
                  <td>
                    <div style={{ fontWeight: 500 }}>Sofía López</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>+54 9 11 5555-4444</div>
                  </td>
                  <td>Limpieza Facial</td>
                  <td style={{ fontWeight: 600 }}>14:15 PM</td>
                  <td><span className="badge badge-success">Confirmada</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen Caja */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Caja del Día</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Efectivo</span>
              <span style={{ fontWeight: 600 }}>$ 45,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Transferencias</span>
              <span style={{ fontWeight: 600 }}>$ 85,200</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>MercadoPago</span>
              <span style={{ fontWeight: 600 }}>$ 15,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-2)' }}>
              <span style={{ fontWeight: 600, fontSize: 'var(--text-lg)' }}>Total Bruto</span>
              <span style={{ fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--brand-primary-light)' }}>$ 145,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
