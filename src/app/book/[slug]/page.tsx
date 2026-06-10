"use client";

import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, Star, ChevronRight, UploadCloud, CheckCircle2, Building, CreditCard, Banknote } from 'lucide-react';
import { createBooking } from '@/actions/bookings';
import '@/app/globals.css';
import './booking.css';

const MOCK_SERVICES = [
  { id: 1, name: 'Alineación y Balanceo', duration: '60 min', price: 25000, category: 'Mantenimiento' },
  { id: 2, name: 'Cambio de Aceite y Filtros', duration: '45 min', price: 45000, category: 'Mantenimiento' },
  { id: 3, name: 'Revisión General / Escáner', duration: '30 min', price: 15000, category: 'Diagnóstico' },
  { id: 4, name: 'Cambio de Pastillas de Freno', duration: '90 min', price: 65000, category: 'Frenos' },
];

type BookingStep = 'SERVICE' | 'DATETIME' | 'FORM' | 'PAYMENT' | 'UPLOAD' | 'SUCCESS';

export default function BookingPortal({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const [step, setStep] = useState<BookingStep>('SERVICE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Selections & Form State
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'TRANSFER' | 'MP' | 'CASH' | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plate: '',
    model: '',
    reason: ''
  });

  const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`;

  const selectedService = MOCK_SERVICES.find(s => s.id === selectedServiceId);

  const handleNext = (nextStep: BookingStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(nextStep);
  };

  const handleSubmitBooking = async () => {
    if (!selectedService || !selectedTime || !selectedPayment) return false;
    
    setIsSubmitting(true);
    const expectedDeposit = selectedService.price * 0.3;

    const res = await createBooking({
      clientName: formData.name,
      clientPhone: formData.phone,
      clientEmail: formData.email,
      vehiclePlate: formData.plate,
      vehicleModel: formData.model,
      visitReason: formData.reason,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      expectedDeposit,
      date: 'Lunes 12', // Mock date
      time: selectedTime,
      paymentMethod: selectedPayment,
    });

    setIsSubmitting(false);
    if (res.success) {
      handleNext('SUCCESS');
      return true;
    } else {
      alert("Hubo un error al crear la reserva. Por favor intenta nuevamente.");
      return false;
    }
  };

  return (
    <div className="booking-layout">
      {step !== 'SUCCESS' && (
        <header className="business-header">
          <div className="business-cover"></div>
          <div className="business-info-container">
            <div className="business-avatar">
              <span>T</span>
            </div>
            <div className="business-details">
              <h1 className="business-name">Taller Streme</h1>
              <p className="business-description">Mecánica ligera en general.</p>
              <div className="business-meta">
                <span className="meta-item"><MapPin size={16} /> Av. Warnes 1234, CABA</span>
                <span className="meta-item"><Star size={16} className="star-icon" /> 4.9 (128 reseñas)</span>
              </div>
            </div>
          </div>
          <div className="business-map-container">
            <iframe 
              width="100%" 
              height="200" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-58.4550,-34.6020,-58.4420,-34.5930&layer=mapnik&marker=-34.5975,-58.4485" 
              style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}
              title="Ubicación del taller"
            ></iframe>
            <div style={{ textAlign: 'right', marginTop: '4px' }}>
              <a href="https://www.openstreetmap.org/?mlat=-34.5975&mlon=-58.4485#map=16/-34.5975/-58.4485" target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline">Ver mapa más grande</a>
            </div>
          </div>
        </header>
      )}

      <main className="booking-main">
        {step === 'SERVICE' && (
          <div className="booking-step animate-fade-in">
            <div className="step-header">
              <div className="step-number">1</div>
              <h2 className="step-title">Selecciona un servicio</h2>
            </div>
            
            <div className="services-list">
              {MOCK_SERVICES.map((service) => (
                <div 
                  key={service.id} 
                  className={`service-card ${selectedServiceId === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedServiceId(service.id)}
                >
                  <div className="service-info">
                    <h3 className="service-name">{service.name}</h3>
                    <div className="service-meta">
                      <span className="meta-icon"><Clock size={14} /> {service.duration}</span>
                      <span className="service-price">{formatPrice(service.price)}</span>
                    </div>
                  </div>
                  <div className="service-action">
                    <div className={`radio-btn ${selectedServiceId === service.id ? 'checked' : ''}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {selectedServiceId && (
              <div className="action-footer animate-slide-up">
                <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => handleNext('DATETIME')}>
                  Siguiente paso <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'DATETIME' && (
          <div className="booking-step animate-fade-in">
            <div className="step-header">
              <div className="step-number">2</div>
              <h2 className="step-title">Elige profesional y horario</h2>
            </div>
            
            <div className="professionals-list">
              <div className="professional-card selected">
                <div className="prof-avatar">A</div>
                <div className="prof-name">Cualquier mecánico</div>
              </div>
              <div className="professional-card">
                <div className="prof-avatar">M</div>
                <div className="prof-name">Carlos (Inyección)</div>
              </div>
              <div className="professional-card">
                <div className="prof-avatar">J</div>
                <div className="prof-name">Roberto (Tren del.)</div>
              </div>
            </div>

            <div className="calendar-container">
              <div className="calendar-header">
                <h4 style={{ fontWeight: 600 }}>Fechas disponibles</h4>
              </div>
              <div className="calendar-days">
                <div className="cal-day selected">
                  <span className="day-name">Lun</span>
                  <span className="day-num">12</span>
                </div>
                <div className="cal-day">
                  <span className="day-name">Mar</span>
                  <span className="day-num">13</span>
                </div>
                <div className="cal-day">
                  <span className="day-name">Mié</span>
                  <span className="day-num">14</span>
                </div>
                <div className="cal-day">
                  <span className="day-name">Jue</span>
                  <span className="day-num">15</span>
                </div>
              </div>

              <div className="time-slots">
                <button className={`slot-btn ${selectedTime === '09:00' ? 'selected' : ''}`} onClick={() => setSelectedTime('09:00')}>09:00</button>
                <button className={`slot-btn ${selectedTime === '10:30' ? 'selected' : ''}`} onClick={() => setSelectedTime('10:30')}>10:30</button>
                <button className={`slot-btn ${selectedTime === '11:00' ? 'selected' : ''}`} onClick={() => setSelectedTime('11:00')}>11:00</button>
                <button className="slot-btn" disabled>12:00</button>
                <button className={`slot-btn ${selectedTime === '14:30' ? 'selected' : ''}`} onClick={() => setSelectedTime('14:30')}>14:30</button>
                <button className={`slot-btn ${selectedTime === '16:00' ? 'selected' : ''}`} onClick={() => setSelectedTime('16:00')}>16:00</button>
              </div>
            </div>

            <div className="action-footer" style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-ghost" onClick={() => setStep('SERVICE')}>Volver</button>
              <button className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={!selectedTime} onClick={() => handleNext('FORM')}>
                Continuar <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 'FORM' && (
          <div className="booking-step animate-fade-in">
            <div className="step-header">
              <div className="step-number">3</div>
              <h2 className="step-title">Tus datos</h2>
            </div>
            
            <div className="card">
              <form className="booking-form" onSubmit={(e) => { e.preventDefault(); handleNext('PAYMENT'); }}>
                <div className="form-group">
                  <label className="input-label">Nombre completo</label>
                  <input type="text" className="input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label className="input-label">Teléfono (WhatsApp)</label>
                  <input type="tel" className="input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label className="input-label">Email</label>
                  <input type="email" className="input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="form-divider"></div>
                <h4 style={{ marginBottom: 'var(--space-3)', fontWeight: 600 }}>Datos del Vehículo</h4>
                
                <div className="form-group">
                  <label className="input-label">Dominio / Patente (Opcional)</label>
                  <input type="text" className="input" value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label className="input-label">Marca y Modelo (Opcional)</label>
                  <input type="text" className="input" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                </div>

                <div className="form-group">
                  <label className="input-label">Motivo de la visita / Fallas (Opcional)</label>
                  <textarea className="input" rows={3} value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}></textarea>
                </div>

                <div className="action-footer" style={{ display: 'flex', gap: '1rem', marginTop: 'var(--space-6)' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setStep('DATETIME')}>Volver</button>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                    Ir a pagar <ChevronRight size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === 'PAYMENT' && (
          <div className="booking-step animate-fade-in">
            <div className="step-header">
              <div className="step-number">4</div>
              <h2 className="step-title">Método de pago</h2>
            </div>

            <div className="payment-summary card mb-6">
              <h4 className="summary-title">Resumen de la reserva</h4>
              <div className="summary-row">
                <span className="summary-label">Servicio:</span>
                <span className="summary-value">{selectedService?.name}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Fecha y Hora:</span>
                <span className="summary-value">Lun 12, {selectedTime} hs</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span className="summary-label">A Pagar Hoy (Seña 30%):</span>
                <span className="summary-value highlight">{formatPrice((selectedService?.price || 0) * 0.3)}</span>
              </div>
              <p className="summary-note">El saldo restante se abona en el taller.</p>
            </div>
            
            <div className="payment-methods-list">
              <div className={`payment-card ${selectedPayment === 'TRANSFER' ? 'selected' : ''}`} onClick={() => setSelectedPayment('TRANSFER')}>
                <div className="payment-icon"><Building size={24} /></div>
                <div className="payment-info">
                  <h4 className="payment-name">Transferencia Bancaria</h4>
                  <p className="payment-desc">Enviá el comprobante para validar tu turno.</p>
                </div>
                <div className={`radio-btn ${selectedPayment === 'TRANSFER' ? 'checked' : ''}`}></div>
              </div>

              <div className={`payment-card ${selectedPayment === 'MP' ? 'selected' : ''}`} onClick={() => setSelectedPayment('MP')}>
                <div className="payment-icon" style={{ color: '#009EE3' }}><CreditCard size={24} /></div>
                <div className="payment-info">
                  <h4 className="payment-name">MercadoPago</h4>
                  <p className="payment-desc">Acreditación instantánea. Tarjetas o dinero en cuenta.</p>
                </div>
                <div className={`radio-btn ${selectedPayment === 'MP' ? 'checked' : ''}`}></div>
              </div>

              <div className={`payment-card ${selectedPayment === 'CASH' ? 'selected' : ''}`} onClick={() => setSelectedPayment('CASH')}>
                <div className="payment-icon" style={{ color: 'var(--success)' }}><Banknote size={24} /></div>
                <div className="payment-info">
                  <h4 className="payment-name">Efectivo en el Taller</h4>
                  <p className="payment-desc">Pagás el total presencialmente.</p>
                </div>
                <div className={`radio-btn ${selectedPayment === 'CASH' ? 'checked' : ''}`}></div>
              </div>
            </div>

            <div className="action-footer" style={{ display: 'flex', gap: '1rem', marginTop: 'var(--space-6)' }}>
              <button className="btn btn-ghost" onClick={() => setStep('FORM')}>Volver</button>
              <button 
                className="btn btn-primary btn-lg" 
                style={{ flex: 1 }} 
                disabled={!selectedPayment || isSubmitting} 
                onClick={() => {
                  if (selectedPayment === 'TRANSFER') handleNext('UPLOAD');
                  else handleSubmitBooking(); // MP and Cash don't need upload for this MVP
                }}
              >
                {isSubmitting ? 'Procesando...' : <>Confirmar Método <ChevronRight size={20} /></>}
              </button>
            </div>
          </div>
        )}

        {step === 'UPLOAD' && (
          <div className="booking-step animate-fade-in">
            <div className="step-header">
              <div className="step-number">5</div>
              <h2 className="step-title">Transferencia y Comprobante</h2>
            </div>
            
            <div className="bank-details card mb-6">
              <p className="bank-instruction">1. Transfiere el monto exacto a esta cuenta:</p>
              
              <div className="bank-data-grid">
                <div className="bank-data-item">
                  <span className="data-label">Monto a transferir:</span>
                  <span className="data-value highlight">{formatPrice((selectedService?.price || 0) * 0.3)}</span>
                </div>
                <div className="bank-data-item">
                  <span className="data-label">CBU / CVU:</span>
                  <div className="data-copy">
                    <span className="data-value">0000003100012345678901</span>
                  </div>
                </div>
                <div className="bank-data-item">
                  <span className="data-label">Alias:</span>
                  <div className="data-copy">
                    <span className="data-value">taller.warnes.mp</span>
                  </div>
                </div>
                <div className="bank-data-item">
                  <span className="data-label">Titular:</span>
                  <span className="data-value">Servicios Mecánicos S.A.</span>
                </div>
              </div>
            </div>

            <div className="upload-container card text-center">
              <p className="bank-instruction">2. Envíanos tu comprobante:</p>
              <p className="text-sm text-secondary mb-4">
                Para validar tu turno rápidamente, envíanos la foto o PDF del comprobante de transferencia por WhatsApp.
              </p>
              
              <button 
                className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
                style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: 'white' }}
                onClick={() => {
                  handleSubmitBooking().then((res) => {
                    if (res) {
                      const msg = encodeURIComponent(`Hola, acabo de realizar la seña para la reserva a nombre de ${formData.name} (Servicio: ${selectedService?.name}, Vehículo: ${formData.plate}). Adjunto el comprobante de pago por ${formatPrice((selectedService?.price || 0) * 0.3)}.`);
                      window.open(`https://wa.me/595975634334?text=${msg}`, '_blank');
                    }
                  });
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : <>Enviar Comprobante por WhatsApp</>}
              </button>
            </div>

            <div className="action-footer" style={{ display: 'flex', gap: '1rem', marginTop: 'var(--space-6)' }}>
              <button className="btn btn-ghost" onClick={() => setStep('PAYMENT')}>Atrás</button>
            </div>
          </div>
        )}

        {step === 'SUCCESS' && (
          <div className="success-step animate-fade-in text-center">
            <div className="success-icon-container">
              <CheckCircle2 size={64} className="success-icon-large" />
            </div>
            
            {selectedPayment === 'TRANSFER' ? (
              <>
                <h1 className="success-title">¡Comprobante enviado!</h1>
                <p className="success-desc">Hemos recibido tu reserva y el comprobante de pago. Lo revisaremos en breve.</p>
                <div className="status-badge status-pending">Estado: Pendiente de validación</div>
              </>
            ) : selectedPayment === 'MP' ? (
              <>
                <h1 className="success-title">¡Reserva confirmada!</h1>
                <p className="success-desc">Tu pago por MercadoPago se acreditó correctamente.</p>
                <div className="status-badge status-success">Estado: Confirmada</div>
              </>
            ) : (
              <>
                <h1 className="success-title">¡Reserva agendada!</h1>
                <p className="success-desc">Te esperamos en el taller para realizar tu servicio.</p>
                <div className="status-badge status-success">Estado: Confirmada (Pago en local)</div>
              </>
            )}

            <div className="success-summary card mt-6 text-left">
              <h4 className="summary-title" style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>Detalles de tu cita</h4>
              <p><strong>Cliente:</strong> {formData.name}</p>
              <p><strong>Vehículo:</strong> {formData.plate} - {formData.model}</p>
              <p><strong>Servicio:</strong> {selectedService?.name}</p>
              <p><strong>Fecha y Hora:</strong> Lunes 12, {selectedTime} hs</p>
            </div>

            <p className="success-note mt-6 text-tertiary">
              Te hemos enviado un mensaje de confirmación por WhatsApp y Email con estos detalles.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
