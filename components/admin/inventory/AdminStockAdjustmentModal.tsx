'use client';

import React from 'react';
import { Product, InventoryAdjustDto } from '@/lib/types';
import { CloseIcon, SlidersIcon } from '@/components/Icons';

interface AdminStockAdjustmentModalProps {
  product: Product | null;
  locations: string[];
  location: string;
  onLocationChange: (loc: string) => void;
  adjustType: InventoryAdjustDto['type'];
  onTypeChange: (type: InventoryAdjustDto['type']) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  isAdjusting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function AdminStockAdjustmentModal({
  product,
  locations,
  location,
  onLocationChange,
  adjustType,
  onTypeChange,
  quantity,
  onQuantityChange,
  reason,
  onReasonChange,
  isAdjusting,
  onSubmit,
  onClose,
}: AdminStockAdjustmentModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <SlidersIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">Adjust Inventory Stock</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="bg-sand-50 p-3 rounded-sm border border-sand-200">
          <p className="text-xs font-semibold text-neutral-900">{product.name}</p>
          <p className="text-[11px] text-neutral-500 font-mono">SKU: {product.id}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Target Warehouse Hub</label>
            <select
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-medium"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Adjustment Action</label>
            <div className="grid grid-cols-3 gap-2">
              {(['RESTOCK', 'DISPATCH', 'CORRECTION', 'RETURN'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onTypeChange(t)}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-sm border transition-all ${
                    adjustType === t
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-sand-50 text-neutral-600 border-sand-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Quantity ({adjustType === 'DISPATCH' ? 'Deduction' : 'Addition'})
            </label>
            <input
              type="number"
              min={1}
              required
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value) || 0)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Audit Ledger Note</label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="submit"
              disabled={isAdjusting || quantity <= 0}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isAdjusting ? 'Recording Ledger...' : 'Commit Stock Adjustment'}
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
