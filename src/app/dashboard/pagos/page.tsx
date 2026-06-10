"use client";

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock, Eye, AlertCircle, CalendarDays, User, X, RefreshCw } from 'lucide-react';
import { getPendingBookings, updateBookingStatus } from '@/actions/bookings';
import './pagos.css';

// Type from the db response
type Booking = {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  vehiclePlate: string | null;
  vehicleModel: string | null;
  visitReason: string | null;
  serviceId: number;
  serviceName: string;
  servicePrice: number;
  expectedDeposit: number;
  date: string;
  time: string;
  paymentMethod: string;
  status: string;
  rejectReason: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function PagosDashboard() {
  const [payments, setPayments] = useState<Booking[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    const res = await getPendingBookings();
    if (res.success && res.data) {
      setPayments(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`;

  const handleApprove = async (id: string) => {
    await updateBookingStatus(id, 'APPROVED');
    setSelectedPayment(null);
    fetchBookings();
  };

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) {
      alert("Debes ingresar un motivo de rechazo");
      return;
    }
    await updateBookingStatus(id, 'REJECTED', rejectReason);
    setSelectedPayment(null);
    setRejectReason('');
    fetchBookings();
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pagos y Facturación</h1>
          <p className="page-subtitle">Gestiona los cobros y valida comprobantes de transferencias.</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-ghost" onClick={fetchBookings}>
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} /> Actualizar
          </button>
          <button className="btn btn-secondary">
            <FileText size={18} /> Exportar Reporte
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Main Content - Left Column */}
        <div className="main-column">
          <div className="card">
            <div className="card-header border-b">
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Clock size={20} className="text-warning" />
                Comprobantes Pendientes
                <span className="badge badge-warning">{payments.length}</span>
              </h2>
            </div>
            
            {isLoading ? (
              <div className="empty-state">
                <RefreshCw size={48} className="empty-state-icon animate-spin text-tertiary" />
                <h3 className="empty-state-title">Cargando...</h3>
              </div>
            ) : payments.length === 0 ? (
              <div className="empty-state">
                <CheckCircle size={48} className="empty-state-icon text-success" />
                <h3 className="empty-state-title">Todo al día</h3>
                <p>No hay comprobantes pendientes de validación en este momento.</p>
              </div>
            ) : (
              <div className="table-container no-border-radius-top">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID / Cliente</th>
                      <th>Servicio</th>
                      <th>Monto a Validar</th>
                      <th>Fecha de Reserva</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => (
                      <tr key={payment.id}>
                        <td>
                          <div className="font-medium">{payment.clientName}</div>
                          <div className="text-xs text-tertiary">{payment.id.split('-')[1] || payment.id}</div>
                        </td>
                        <td>
                          <div>{payment.serviceName}</div>
                          <div className="text-xs text-tertiary">{payment.date} - {payment.time}</div>
                        </td>
                        <td>
                          <div className="font-bold text-brand">{formatPrice(payment.expectedDeposit)}</div>
                          <div className="text-xs text-tertiary">Seña 30%</div>
                        </td>
                        <td>
                          <span className="badge badge-warning">{new Date(payment.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-secondary"
                            onClick={() => setSelectedPayment(payment)}
                          >
                            <Eye size={16} /> Revisar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="side-column">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon bg-success-light text-success">
                <CheckCircle size={24} />
              </div>
            </div>
            <div>
              <div className="stat-value text-success">$185.000</div>
              <div className="stat-label">Aprobados Hoy</div>
            </div>
          </div>
          
          <div className="card mt-5">
            <h3 className="font-semibold mb-3">Métodos de Pago Activos</h3>
            <div className="settings-list">
              <div className="settings-item">
                <div>
                  <div className="font-medium">Transferencia Bancaria</div>
                  <div className="text-xs text-tertiary">Requiere validación manual</div>
                </div>
                <div className="toggle active"></div>
              </div>
              <div className="settings-item">
                <div>
                  <div className="font-medium">MercadoPago</div>
                  <div className="text-xs text-tertiary">Acreditación automática</div>
                </div>
                <div className="toggle active"></div>
              </div>
              <div className="settings-item">
                <div>
                  <div className="font-medium">Efectivo (Local)</div>
                  <div className="text-xs text-tertiary">Pago presencial</div>
                </div>
                <div className="toggle active"></div>
              </div>
            </div>
            <button className="btn btn-ghost w-full mt-3 text-sm">Configurar Pasarelas</button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedPayment && (
        <div className="modal-backdrop">
          <div className="modal modal-lg animate-scale-in">
            <div className="modal-header">
              <h2 className="modal-title font-bold text-lg">Validar Comprobante: {selectedPayment.id.split('-')[1] || selectedPayment.id}</h2>
              <button className="btn-ghost btn-icon" onClick={() => { setSelectedPayment(null); setRejectReason(''); }}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body layout-split">
              {/* Left Side: Receipt Viewer (Now WhatsApp notice) */}
              <div className="receipt-viewer" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#25D366', color: 'white', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Comprobante en WhatsApp</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  El cliente ha sido redirigido a tu WhatsApp para enviar el comprobante.<br/><br/>
                  Por favor, revisa tu chat y tu cuenta bancaria para confirmar la recepción del dinero antes de aprobar el turno.
                </p>
              </div>
              
              {/* Right Side: Details & Actions */}
              <div className="receipt-details">
                <div className="info-block">
                  <h4 className="info-title"><User size={16} /> Datos del Cliente</h4>
                  <p className="font-medium">{selectedPayment.clientName}</p>
                  <p className="text-sm text-tertiary">{selectedPayment.clientPhone}</p>
                  <p className="text-sm text-tertiary">{selectedPayment.vehiclePlate} - {selectedPayment.vehicleModel}</p>
                </div>
                
                <div className="info-block mt-4">
                  <h4 className="info-title"><CalendarDays size={16} /> Detalles del Turno</h4>
                  <p className="font-medium">{selectedPayment.serviceName}</p>
                  <p className="text-sm">{selectedPayment.date} a las {selectedPayment.time}</p>
                  <p className="text-sm text-tertiary">Monto total del servicio: {formatPrice(selectedPayment.servicePrice)}</p>
                </div>

                <div className="highlight-block mt-4">
                  <span className="text-sm text-secondary uppercase font-semibold">Monto Esperado (Seña)</span>
                  <div className="text-3xl font-bold text-brand">{formatPrice(selectedPayment.expectedDeposit)}</div>
                </div>

                <div className="action-panel mt-6">
                  <div className="mb-4">
                    <label className="input-label text-danger">¿Rechazar? Motivo (Obligatorio)</label>
                    <textarea 
                      className="input" 
                      rows={2} 
                      placeholder="Ej: El monto es incorrecto o la imagen es ilegible..."
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className="btn btn-danger flex-1"
                      onClick={() => handleReject(selectedPayment.id)}
                    >
                      <XCircle size={18} /> Rechazar
                    </button>
                    <button 
                      className="btn btn-success flex-1"
                      onClick={() => handleApprove(selectedPayment.id)}
                    >
                      <CheckCircle size={18} /> Aprobar Turno
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
