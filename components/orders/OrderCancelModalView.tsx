'use client';

import React from 'react';
import { AlertTriangleIcon } from '@/components/Icons';

interface OrderCancelModalViewProps {
  orderNumber: string;
  cancelReason: string;
  onCancelReasonChange: (val: string) => void;
  customReason: string;
  onCustomReasonChange: (val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function OrderCancelModalView({
  orderNumber,
  cancelReason,
  onCancelReasonChange,
  customReason,
  onCustomReasonChange,
  isSubmitting,
  onSubmit,
  onBack,
}: OrderCancelModalViewProps) {
  const reasons = [
    'Found alternative atelier piece',
    'Ordered incorrect sizing',
    'Changed shipping destination',
    'Purchased by mistake',
    'Other',
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-left">
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm flex items-start gap-3">
        <AlertTriangleIcon size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <p className="font-semibold">Self-Service Order Cancellation</p>
          <p className="mt-0.5">
            Cancelling order <strong>{orderNumber}</strong> will immediately restock reserved inventory and issue a 100% refund.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider text-neutral-600 font-semibold block">
          Please select a cancellation reason:
        </label>
        {reasons.map((r) => (
          <label key={r} className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer">
            <input
              type="radio"
              name="cancelReason"
              value={r}
              checked={cancelReason === r}
              onChange={(e) => onCancelReasonChange(e.target.value)}
              className="accent-neutral-900"
            />
            <span>{r}</span>
          </label>
        ))}

        {cancelReason === 'Other' && (
          <textarea
            required
            rows={2}
            value={customReason}
            onChange={(e) => onCustomReasonChange(e.target.value)}
            placeholder="Please specify reason..."
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-xs text-neutral-900 rounded-sm outline-none"
          />
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-sand-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation & Refund'}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-3 border border-sand-300 text-neutral-600 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
        >
          Back
        </button>
      </div>
    </form>
  );
}
