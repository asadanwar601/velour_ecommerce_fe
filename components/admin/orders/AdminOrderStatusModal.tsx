'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { CloseIcon, PackageIcon } from '@/components/Icons';

interface AdminOrderStatusModalProps {
  order: Order | null;
  newStatus: Order['status'];
  onStatusChange: (status: Order['status']) => void;
  trackingNumber: string;
  onTrackingNumberChange: (val: string) => void;
  isUpdating: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function AdminOrderStatusModal({
  order,
  newStatus,
  onStatusChange,
  trackingNumber,
  onTrackingNumberChange,
  isUpdating,
  onSubmit,
  onClose,
}: AdminOrderStatusModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 space-y-5 text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <PackageIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">Update Order State</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="bg-sand-50 p-3 rounded-sm border border-sand-200">
          <p className="font-semibold text-neutral-900">Order Reference: {order.orderNumber}</p>
          <p className="text-[11px] text-neutral-500">Client: {order.contactName} ({order.contactEmail})</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Target Status</label>
            <select
              value={newStatus}
              onChange={(e) => onStatusChange(e.target.value as any)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-medium"
            >
              {(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {newStatus === 'SHIPPED' && (
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Courier Tracking Code</label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => onTrackingNumberChange(e.target.value)}
                placeholder="FEDEX-94829104"
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-mono"
              />
            </div>
          )}

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isUpdating ? 'Updating...' : 'Commit Status Change'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
