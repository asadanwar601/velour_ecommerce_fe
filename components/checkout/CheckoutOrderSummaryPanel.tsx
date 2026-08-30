'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem, Coupon, GiftOptions } from '@/lib/types';
import { money } from '@/lib/format';
import { TagIcon, GiftIcon, ShieldIcon } from '@/components/Icons';

interface CheckoutOrderSummaryPanelProps {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shipping: number;
  total: number;
  coupon: Coupon | null;
  giftOptions: GiftOptions;
  isSubmitting: boolean;
  errorMsg: string;
}

export function CheckoutOrderSummaryPanel({
  items,
  subtotal,
  discountAmount,
  shipping,
  total,
  coupon,
  giftOptions,
  isSubmitting,
  errorMsg,
}: CheckoutOrderSummaryPanelProps) {
  return (
    <div className="bg-sand-50 border border-sand-200 p-6 sm:p-8 rounded-sm sticky top-24 space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-900 border-b border-sand-200 pb-3">
        Order Summary ({items.length})
      </h2>

      {/* Line Items */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3.5 items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-16 bg-sand-100 rounded-sm overflow-hidden flex-shrink-0">
                {item.product?.primaryImageUrl && (
                  <Image src={item.product.primaryImageUrl} alt={item.product.name} fill className="object-cover" />
                )}
                <span className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {item.quantity}
                </span>
              </div>
              <div>
                <p className="font-medium text-neutral-900 line-clamp-1">{item.product?.name}</p>
                <p className="text-neutral-500">Size: {item.size}</p>
              </div>
            </div>
            <span className="font-mono text-neutral-900 font-medium">
              {money(item.lineTotal || (item.price ?? item.product.price) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Calculations */}
      <div className="border-t border-sand-200 pt-4 space-y-2.5 text-xs text-neutral-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-mono text-neutral-900">{money(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-gold-700 font-medium">
            <span className="flex items-center gap-1.5">
              <TagIcon size={12} />
              Promo ({coupon?.code})
            </span>
            <span className="font-mono">-{money(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Complimentary Packaging</span>
          <span className="text-emerald-700 font-medium">{giftOptions.isGift ? 'Included' : 'Standard'}</span>
        </div>

        <div className="flex justify-between">
          <span>Express Courier Shipping</span>
          <span className="font-mono text-neutral-900">{shipping === 0 ? 'COMPLIMENTARY' : money(shipping)}</span>
        </div>

        <div className="border-t border-sand-200 pt-3 flex justify-between items-center text-sm font-semibold text-neutral-900">
          <span>Total Order Value</span>
          <span className="font-mono text-lg text-neutral-900">{money(total)}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          `Complete Purchase • ${money(total)}`
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
        <ShieldIcon size={14} />
        <span>Atelier Guarantee • 30-Day Complimentary Returns</span>
      </div>
    </div>
  );
}
