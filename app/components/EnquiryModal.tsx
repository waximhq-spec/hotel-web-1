'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: string;
}

export default function EnquiryModal({ isOpen, onClose, initialRoom = 'Modernist Design Suite' }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState(initialRoom);
  const [guests, setGuests] = useState('2 Guests');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="enquiry-modal-overlay">
      <div className="enquiry-modal-container">
        <button className="enquiry-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {submitted ? (
          <div className="enquiry-success-state">
            <span className="section-label">THANK YOU</span>
            <h3 className="success-title">Your enquiry is received.</h3>
            <p className="success-desc">
              Our concierge will review your requested dates and coordinate your stay details at KAYA Hotel within 24 hours.
            </p>
            <button className="btn-luxury-primary" style={{ marginTop: '2rem' }} onClick={() => { setSubmitted(false); onClose(); }}>
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquiry-form">
            <div className="form-header">
              <span className="section-label">RESERVATIONS</span>
              <h3 className="form-title">Enquire About Your Stay</h3>
              <p className="form-subtitle">Please provide your details below and our reservations desk will contact you.</p>
            </div>

            <div className="form-group">
              <label htmlFor="modal-name">Full Name</label>
              <input 
                id="modal-name"
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alexander Mercer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-email">Email Address</label>
              <input 
                id="modal-email"
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="modal-room">Suite Category</label>
                <select 
                  id="modal-room"
                  value={room} 
                  onChange={(e) => setRoom(e.target.value)}
                >
                  <option value="Modernist Design Suite">Modernist Design Suite</option>
                  <option value="Signature Butler Suite">Signature Butler Suite</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="modal-guests">Number of Guests</label>
                <select 
                  id="modal-guests"
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5-8 Guests">5-8 Guests</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="modal-checkin">Arrival Date</label>
                <input 
                  id="modal-checkin"
                  type="date" 
                  required 
                  value={checkIn} 
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-checkout">Departure Date</label>
                <input 
                  id="modal-checkout"
                  type="date" 
                  required 
                  value={checkOut} 
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-notes">Special Requests / Notes</label>
              <textarea 
                id="modal-notes"
                rows={3} 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any dietary preferences, transfer requests, etc."
              />
            </div>

            <button type="submit" className="btn-luxury-primary" style={{ width: '100%', marginTop: '1.5rem', textAlign: 'center', justifyContent: 'center' }}>
              <span>Submit Stay Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
