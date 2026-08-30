'use client';

import React from 'react';
import Image from 'next/image';
import { Order } from '@/lib/types';
import { RotateCcwIcon, ShieldIcon } from '@/components/Icons';

interface OrderReturnModalViewProps {
  order: Order;
  selectedItems: Record<string, { quantity: number; reason: string; selected: boolean }>;
  onToggleItem: (id: string) => void;
  onChangeReason: (id: string, reason: string) => void;
  returnMethod: 'ORIGINAL_PAYMENT' | 'STORE_CREDIT';
  onReturnMethodChange: (method: 'ORIGINAL_PAYMENT' | 'STORE_CREDIT') => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function OrderReturnModalView({
  order,
  selectedItems,
  onToggleItem,
  onChangeReason,
  returnMethod,
  onReturnMethodChange,
  isSubmitting,
  onSubmit,
  onBack,
}: OrderReturnModalViewProps) {
  const returnReasons = [
    'Sizing ran slightly large',
    'Sizing ran slightly small',
    'Color tone differs from photo',
    'Fabric / drape not as expected',
    'Changed preference',
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-5 text-left">
      <div className="bg-sand-50 border border-sand-200 p-3 rounded-sm flex items-center justify-between">
        <span className="text-xs uppercase font-semibold text-neutral-800 flex items-center gap-1.5">
          <RotateCcwIcon size={14} />
          Select Garments for Complimentary Return
        </span>
        <span className="text-xs font-mono text-neutral-500">{order.orderNumber}</span>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {order.items.map((item) => {
          const config = selectedItems[item.id] || { selected: false, reason: returnReasons[0], quantity: 1 };
          return (
            <div key={item.id} className="p-3 border border-sand-200 rounded-sm space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.selected}
                  onChange={() => onToggleItem(item.id)}
                  className="accent-neutral-900 w-4 h-4"
                />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-neutral-900">{item.product?.name || 'Garment'}</p>
                  <p className="text-[11px] text-neutral-500">Size: {item.size} • Qty: {item.quantity}</p>
                </div>
              </label>

              {config.selected && (
                <div className="pl-7">
                  <select
                    value={config.reason}
                    onChange={(e) => onChangeReason(item.id, e.target.value)}
                    className="w-full text-xs p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
                  >
                    {returnReasons.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-2 border-t border-sand-200 pt-3">
        <label className="text-xs uppercase tracking-wider text-neutral-600 font-semibold block">
          Preferred Refund Destination:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`p-3 border rounded-sm cursor-pointer text-xs ${
              returnMethod === 'STORE_CREDIT' ? 'border-neutral-900 bg-sand-50' : 'border-sand-200'
            }`}
          >
            <input
              type="radio"
              name="returnMethod"
              value="STORE_CREDIT"
              checked={returnMethod === 'STORE_CREDIT'}
              onChange={() => onReturnMethodChange('STORE_CREDIT')}
              className="sr-only"
            />
            <p className="font-semibold text-neutral-900">Atelier Credit (+10% Bonus)</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Instant credit for future pieces</p>
          </label>

          <label
            className={`p-3 border rounded-sm cursor-pointer text-xs ${
              returnMethod === 'ORIGINAL_PAYMENT' ? 'border-neutral-900 bg-sand-50' : 'border-sand-200'
            }`}
          >
            <input
              type="radio"
              name="returnMethod"
              value="ORIGINAL_PAYMENT"
              checked={returnMethod === 'ORIGINAL_PAYMENT'}
              onChange={() => onReturnMethodChange('ORIGINAL_PAYMENT')}
              className="sr-only"
            />
            <p className="font-semibold text-neutral-900">Original Payment</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Refunded within 3-5 business days</p>
          </label>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          {isSubmitting ? 'Generating Return Label...' : 'Generate Prepaid Shipping Label'}
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
