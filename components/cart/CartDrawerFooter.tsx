'use client';

import React from 'react';
import Link from 'next/link';
import { money } from '@/lib/format';
import { ShieldIcon, ArrowRightIcon } from '@/components/Icons';

interface CartDrawerFooterProps {
  subtotal: number;
  discountAmount: number;
  estimatedShipping: number;
  estimatedTotal: number;
  itemCount: number;
  onCloseDrawer: () => void;
}

export function CartDrawerFooter({
  subtotal,
  discountAmount,
  estimatedShipping,
  estimatedTotal,
  itemCount,
  onCloseDrawer,
}: CartDrawerFooterProps) {
  return (
    <div className="p-5 border-t border-[#e8e4df] bg-[#ffffff] space-y-4">
      <div className="space-y-1.5 text-xs text-[#8a7f72]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-mono text-[#16130f] font-medium">{money(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Promotion Discount</span>
            <span className="font-mono">-{money(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Express Courier Shipping</span>
          <span className="font-mono text-[#16130f]">
            {estimatedShipping === 0 ? 'COMPLIMENTARY' : money(estimatedShipping)}
          </span>
        </div>

        <div className="border-t border-[#e8e4df] pt-2 flex justify-between items-center text-sm font-semibold text-[#16130f]">
          <span>Estimated Total</span>
          <span className="font-mono text-base">{money(estimatedTotal)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Link
          href="/checkout"
          onClick={onCloseDrawer}
          className="w-full py-3.5 bg-[#16130f] hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 rounded-sm transition-all shadow-sm"
        >
          <span>Proceed to Checkout</span>
          <ArrowRightIcon size={14} />
        </Link>
        <Link
          href="/cart"
          onClick={onCloseDrawer}
          className="w-full py-2.5 border border-[#e8e4df] hover:border-[#16130f] text-[#16130f] text-xs uppercase tracking-widest font-medium flex items-center justify-center rounded-sm transition-colors text-center block"
        >
          View Full Atelier Bag ({itemCount})
        </Link>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8a7f72]">
        <ShieldIcon size={12} />
        <span>Complimentary Express Shipping & Returns</span>
      </div>
    </div>
  );
}
