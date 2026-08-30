'use client';

import React from 'react';
import { ReturnRecord } from '@/lib/types';
import { money } from '@/lib/format';
import { CloseIcon, RotateCcwIcon, CheckIcon } from '@/components/Icons';

interface AdminReturnDetailModalProps {
  returnRecord: ReturnRecord | null;
  onClose: () => void;
  onStatusChange: (id: string, status: ReturnRecord['status']) => void;
  isUpdating: boolean;
}

export function AdminReturnDetailModal({
  returnRecord,
  onClose,
  onStatusChange,
  isUpdating,
}: AdminReturnDetailModalProps) {
  if (!returnRecord) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 sm:p-8 space-y-5 text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <RotateCcwIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">Return Request Dossier</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="bg-sand-50 p-3.5 rounded-sm border border-sand-200 space-y-1">
          <p className="font-semibold text-neutral-900">Order Reference: {returnRecord.orderNumber}</p>
          <p className="text-neutral-500 font-mono text-[11px]">Return Tracking: {returnRecord.returnTrackingNumber || 'Prepaid Label Issued'}</p>
          <p className="text-neutral-700">Reason: {returnRecord.reason}</p>
        </div>

        <div className="space-y-2">
          <h4 className="uppercase tracking-wider font-semibold text-neutral-600">Garments to Restock:</h4>
          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {returnRecord.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-sand-50/70 border border-sand-200 rounded-sm">
                <div>
                  <p className="font-medium text-neutral-900">{it.productName}</p>
                  <p className="text-[10px] text-neutral-400">Size: {it.size} • Qty: {it.quantity}</p>
                </div>
                <span className="font-mono font-medium">{money(it.price * it.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-sand-200 space-y-2">
          <p className="uppercase tracking-wider font-semibold text-neutral-600">Transition Status:</p>
          <div className="grid grid-cols-3 gap-2">
            {(['APPROVED', 'RECEIVED', 'REFUNDED', 'REJECTED'] as const).map((st) => (
              <button
                key={st}
                type="button"
                disabled={isUpdating || returnRecord.status === st}
                onClick={() => onStatusChange(returnRecord.id, st)}
                className={`py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm border transition-all ${
                  returnRecord.status === st
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-sand-50 text-neutral-600 border-sand-300 hover:bg-sand-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
