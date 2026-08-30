'use client';

import React from 'react';
import Link from 'next/link';
import { Coupon, GiftOptions } from '@/lib/types';
import { money } from '@/lib/format';
import { TagIcon, GiftIcon, ShieldIcon, ArrowRightIcon } from '@/components/Icons';

interface CartPageSummaryPanelProps {
  subtotal: number;
  discountAmount: number;
  shipping: number;
  total: number;
  coupon: Coupon | null;
  giftOptions: GiftOptions;
  onGiftToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  couponInput: string;
  onCouponInputChange: (val: string) => void;
  couponError: string;
  isApplyingCoupon: boolean;
  onApplyCoupon: (e: React.FormEvent) => void;
  onRemoveCoupon: () => void;
}

export function CartPageSummaryPanel({
  subtotal,
  discountAmount,
  shipping,
  total,
  coupon,
  giftOptions,
  onGiftToggle,
  couponInput,
  onCouponInputChange,
  couponError,
  isApplyingCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CartPageSummaryPanelProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm p-6 sm:p-8 shadow-sm space-y-6 text-xs text-neutral-800">
      <h2 className="font-serif text-lg text-neutral-900 border-b border-sand-200 pb-3">
        Order Summary
      </h2>

      {/* Pricing Lines */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-neutral-500">Bag Subtotal</span>
          <span className="font-mono text-sm font-semibold text-neutral-900">{money(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Promotion ({coupon?.code})</span>
            <span className="font-mono">-{money(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-neutral-500">Estimated Courier Shipping</span>
          <span className="font-mono text-neutral-900 font-medium">
            {shipping === 0 ? 'COMPLIMENTARY' : money(shipping)}
          </span>
        </div>

        <div className="border-t border-sand-200 pt-3 flex justify-between items-center text-sm font-bold text-neutral-900">
          <span>Estimated Total</span>
          <span className="font-mono text-lg text-neutral-900">{money(total)}</span>
        </div>
      </div>

      {/* Gift Packaging Checkbox */}
      <div className="p-3.5 bg-sand-50 border border-sand-200 rounded-sm space-y-2">
        <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-900">
          <input
            type="checkbox"
            checked={giftOptions.isGift}
            onChange={onGiftToggle}
            className="accent-neutral-900 w-4 h-4"
          />
          <GiftIcon size={14} className="text-gold-700" />
          <span>Complimentary Signature Gift Packaging</span>
        </label>
        {giftOptions.isGift && (
          <p className="text-[11px] text-neutral-500 pl-6">
            Your pieces will arrive nestled in an embossed archival gift box with black grosgrain ribbon.
          </p>
        )}
      </div>

      {/* Coupon Form */}
      <div className="border-t border-sand-200 pt-4">
        {coupon ? (
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-sm">
            <span className="text-emerald-800 font-medium">Code <strong>{coupon.code}</strong> applied</span>
            <button type="button" onClick={onRemoveCoupon} className="text-red-600 hover:underline uppercase text-[10px] font-bold">
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={onApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="Voucher or promo code"
              value={couponInput}
              onChange={(e) => onCouponInputChange(e.target.value)}
              className="flex-1 p-2 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none uppercase font-mono text-xs"
            />
            <button
              type="submit"
              disabled={isApplyingCoupon || !couponInput.trim()}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-wider font-semibold rounded-sm transition-all"
            >
              {isApplyingCoupon ? '...' : 'Apply'}
            </button>
          </form>
        )}
        {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
      </div>

      <Link
        href="/checkout"
        className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all shadow-md block text-center"
      >
        <span>Proceed to Checkout</span>
        <ArrowRightIcon size={14} />
      </Link>

      <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
        <ShieldIcon size={14} />
        <span>30-Day Complimentary Returns & Global Guarantee</span>
      </div>
    </div>
  );
}
