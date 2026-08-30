'use client';

import React from 'react';
import { LockIcon, ShieldIcon } from '@/components/Icons';

interface CheckoutPaymentMethodSectionProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckoutPaymentMethodSection({ formData, onChange }: CheckoutPaymentMethodSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-900 border-b border-sand-200 pb-2">
        2. Payment Simulation (256-Bit Encrypted)
      </h3>

      <div className="bg-sand-50 border border-sand-200 p-4 rounded-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <LockIcon size={14} />
            Encrypted Sandbox Gateway
          </span>
          <span>Visa, Mastercard, Amex</span>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={onChange}
            className="w-full px-3.5 py-2.5 bg-white border border-sand-300 focus:border-neutral-900 text-sm font-mono text-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Expires (MM/YY)</label>
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-white border border-sand-300 focus:border-neutral-900 text-sm font-mono text-neutral-900 rounded-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Security CVC</label>
            <input
              type="password"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={onChange}
              maxLength={4}
              className="w-full px-3.5 py-2.5 bg-white border border-sand-300 focus:border-neutral-900 text-sm font-mono text-neutral-900 rounded-sm outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
