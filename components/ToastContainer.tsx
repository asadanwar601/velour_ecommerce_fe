'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/store';
import { CheckIcon, CloseIcon } from './Icons';

export default function ToastContainer() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.image ? (
            <div className="toast-thumb">
              <Image
                src={toast.image}
                alt={toast.title}
                fill
                sizes="40px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <CheckIcon size={20} style={{ color: '#4ade80' }} />
          )}

          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            {toast.message && <div className="toast-desc">{toast.message}</div>}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss toast"
            style={{ opacity: 0.7, padding: '4px' }}
          >
            <CloseIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
