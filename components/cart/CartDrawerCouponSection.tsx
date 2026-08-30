'use client';

import React, { useState } from 'react';
import { Coupon } from '@/lib/types';
import { TagIcon, CheckIcon } from '@/components/Icons';

interface CartDrawerCouponSectionProps {
  coupon: Coupon | null;
  onApplyCoupon: (code: string) => Promise<any>;
  onRemoveCoupon: () => void;
}

export function CartDrawerCouponSection({
  coupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CartDrawerCouponSectionProps) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    setIsApplying(true);
    try {
      await onApplyCoupon(couponInput.trim());
      setCouponInput('');
    } catch (err: any) {
      setCouponError(err.message || 'Invalid promotional code.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="py-3 border-t border-[#e8e4df]">
      {coupon ? (
        <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-sm text-xs">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckIcon size={14} />
            <span>Code <strong>{coupon.code}</strong> applied</span>
          </div>
          <button
            type="button"
            onClick={onRemoveCoupon}
            className="text-xs text-red-600 hover:underline uppercase tracking-wider"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Promo / Voucher code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-[#f8f6f3] border border-[#e8e4df] focus:border-[#16130f] text-xs text-[#16130f] rounded-sm outline-none uppercase"
          />
          <button
            type="submit"
            disabled={isApplying || !couponInput.trim()}
            className="px-4 py-1.5 bg-[#16130f] hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-wider font-medium rounded-sm transition-all"
          >
            {isApplying ? 'Applying...' : 'Apply'}
          </button>
        </form>
      )}
      {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
    </div>
  );
}
