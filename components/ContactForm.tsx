'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ color: 'var(--text-primary)', fontWeight: 500, padding: '1rem 0' }}>
        ✓ Thank you for your inquiry. A Baveha client advisor will respond within 24 business hours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row-2">
        <div className="form-group">
          <label htmlFor="c-name" className="form-label">
            Your Name
          </label>
          <input type="text" id="c-name" required className="form-input" placeholder="Claire DeWitt" />
        </div>
        <div className="form-group">
          <label htmlFor="c-email" className="form-label">
            Email Address
          </label>
          <input type="email" id="c-email" required className="form-input" placeholder="claire@example.com" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="c-msg" className="form-label">
          Message
        </label>
        <textarea
          id="c-msg"
          rows={4}
          required
          className="form-input"
          placeholder="Inquire regarding sizing, garment care, or orders..."
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
        Send Inquiry
      </button>
    </form>
  );
}
