"use client";

import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, Calendar, Settings, FileText, ChevronRight, MapPin, Star, History, CreditCard, Tag } from 'lucide-react';
import './crm.css';

// Mock CRM data tailored for an auto repair shop
const MOCK_CLIENTS = [
  {
    id: 'CLI-001',
    name: 'Carlos Gómez',
    phone: '+54 9 11 4455-6677',
    email: 'carlos.g@email.com',
    registeredDate: '10 Feb 2024',
    totalSpent: 125000,
    vehicles: [
      { id: 'V-01', plate: 'AB 123 CD', brand: 'Ford', model: 'Fiesta', year: 2019 }
    ],
    history: [
      { id: 'H-01', date: '14 Jun 2026', service: 'Alineación y Balanceo', amount: 25000, status: 'Pagado' },
      { id: 'H-02', date: '02 Mar 2026', service: 'Cambio de Aceite', amount: 45000, status: 'Pagado' },
      { id: 'H-03', date: '10 Nov 2025', service: 'Cambio de Batería', amount: 55000, status: 'Pagado' }
    ],
    notes: 'Cliente frecuente. Siempre solicita repuestos originales.'
  },
  {
    id: 'CLI-002',
    name: 'Mariana López',
    phone: '+54 9 11 5566-7788',
    email: 'mlopez90@email.com',
    registeredDate: '15 Abr 2025',
    totalSpent: 65000,
    vehicles: [
      { id: 'V-02', plate: 'AF 456 GH', brand: 'VW', model: 'Amarok', year: 2021 }
    ],
    history: [
      { id: 'H-04', date: '15 Jun 2026', service: 'Cambio de Pastillas de Freno', amount: 65000, status: 'Pendiente' }
    ],
    notes: 'Vehículo de flota de empresa.'
  },
  {
    id: 'CLI-003',
    name: 'Esteban Quito',
    phone: '+54 9 11 9988-7766',
    email: 'estebanquito@email.com',
    registeredDate: '22 May 2026',
    totalSpent: 15000,
    vehicles: [
      { id: 'V-03', plate: 'AE 789 JK', brand: 'Chevrolet', model: 'Cruze', year: 2020 }
    ],
    history: [
      { id: 'H-05', date: '16 Jun 2026', service: 'Revisión General / Escáner', amount: 15000, status: 'Pendiente' }
    ],
    notes: 'Primer ingreso por falla eléctrica intermitente.'
  }
];

export default function CRMDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof MOCK_CLIENTS[0] | null>(MOCK_CLIENTS[0]);

  const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`;

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.vehicles.some(v => v.plate.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="page-header">
        <div>
          <h1 className="page-title">Directorio de Clientes</h1>
          <p className="page-subtitle">Gestiona tu base de clientes, historiales de vehículos y facturación.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <UserPlus size={18} /> Nuevo Cliente
          </button>
        </div>
      </div>

      <div className="crm-layout">
        {/* Left Column: Client List */}
        <div className="crm-sidebar card">
          <div className="p-4 border-b">
            <div className="search-bar w-full">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o patente..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="client-list">
            {filteredClients.map(client => (
              <div 
                key={client.id} 
                className={`client-item ${selectedClient?.id === client.id ? 'active' : ''}`}
                onClick={() => setSelectedClient(client)}
              >
                <div className="client-avatar">
                  {client.name.charAt(0)}
                </div>
                <div className="client-info-list">
                  <h4 className="client-name">{client.name}</h4>
                  <p className="client-plate">
                    {client.vehicles[0]?.plate} • {client.vehicles[0]?.brand}
                  </p>
                </div>
                <ChevronRight size={16} className="text-tertiary ml-auto" />
              </div>
            ))}
            
            {filteredClients.length === 0 && (
              <div className="empty-state p-6">
                <p>No se encontraron clientes.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Client Details Profile */}
        <div className="crm-main card">
          {selectedClient ? (
            <div className="profile-container animate-fade-in">
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-avatar-large">
                  {selectedClient.name.charAt(0)}
                </div>
                <div className="profile-header-info">
                  <h2 className="profile-name-large">{selectedClient.name}</h2>
                  <div className="profile-tags">
                    <span className="badge badge-primary"><Star size={12} /> Cliente Frecuente</span>
                    <span className="badge badge-info">Ingresado {selectedClient.registeredDate}</span>
                  </div>
                </div>
                <div className="profile-header-actions">
                  <button className="btn btn-secondary btn-sm"><Settings size={16} /> Editar</button>
                  <button className="btn btn-primary btn-sm"><Calendar size={16} /> Agendar Cita</button>
                </div>
              </div>

              {/* Profile Content Grid */}
              <div className="profile-grid mt-6">
                
                {/* Contact & Info */}
                <div className="info-card">
                  <h3 className="section-title">Información de Contacto</h3>
                  <div className="data-row">
                    <Phone size={16} className="text-tertiary" />
                    <span>{selectedClient.phone}</span>
                  </div>
                  <div className="data-row">
                    <Mail size={16} className="text-tertiary" />
                    <span>{selectedClient.email}</span>
                  </div>
                  
                  <h3 className="section-title mt-6">Métricas de Consumo</h3>
                  <div className="data-row">
                    <CreditCard size={16} className="text-tertiary" />
                    <span>Total Facturado: <strong className="text-brand">{formatPrice(selectedClient.totalSpent)}</strong></span>
                  </div>
                  <div className="data-row">
                    <History size={16} className="text-tertiary" />
                    <span>Visitas Totales: <strong>{selectedClient.history.length}</strong></span>
                  </div>
                  
                  <div className="notes-box mt-6">
                    <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-secondary">
                      <FileText size={14} /> Notas Internas
                    </div>
                    <p className="text-sm">{selectedClient.notes}</p>
                  </div>
                </div>

                {/* Vehicles & History */}
                <div className="vehicles-history-column">
                  
                  <h3 className="section-title flex items-center justify-between">
                    Vehículos Registrados
                    <button className="btn-ghost btn-sm text-brand">+ Agregar</button>
                  </h3>
                  <div className="vehicles-list mb-6">
                    {selectedClient.vehicles.map(vehicle => (
                      <div key={vehicle.id} className="vehicle-card">
                        <div className="vehicle-icon">🚗</div>
                        <div className="vehicle-details">
                          <h4 className="vehicle-plate font-mono font-bold">{vehicle.plate}</h4>
                          <p className="vehicle-model text-sm text-secondary">
                            {vehicle.brand} {vehicle.model} ({vehicle.year})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="section-title">Historial de Visitas</h3>
                  <div className="history-timeline">
                    {selectedClient.history.map(record => (
                      <div key={record.id} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <span className="font-semibold">{record.service}</span>
                            <span className="text-sm font-bold">{formatPrice(record.amount)}</span>
                          </div>
                          <div className="timeline-meta mt-1 text-xs text-tertiary flex justify-between">
                            <span>{record.date}</span>
                            <span className={`badge ${record.status === 'Pagado' ? 'badge-success' : 'badge-warning'}`}>
                              {record.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state h-full flex items-center justify-center">
              <div>
                <Search size={48} className="empty-state-icon" />
                <h3 className="empty-state-title">Selecciona un cliente</h3>
                <p>Busca en el panel izquierdo para ver los detalles.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
