'use client';

import React from 'react';
import { money } from '@/lib/format';
import { TruckIcon, CheckIcon } from '@/components/Icons';

interface CartDrawerShippingProgressProps {
  subtotal: number;
  threshold?: number;
}

export function CartDrawerShippingProgress({ subtotal, threshold = 75 }: CartDrawerShippingProgressProps) {
  const progressPercent = Math.min(100, (subtotal / threshold) * 100);
  const amountNeeded = Math.max(0, threshold - subtotal);
  const isEligible = subtotal >= threshold;

  return (
    <div className="p-4 bg-[#f8f6f3] border-b border-[#e8e4df]">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="flex items-center gap-1.5 text-[#16130f] font-medium">
          <TruckIcon size={14} />
          {isEligible ? 'Complimentary Express Shipping Unlocked' : `Add ${money(amountNeeded)} for Complimentary Shipping`}
        </span>
        <span className="font-mono text-[#8a7f72] font-semibold">{Math.round(progressPercent)}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#e8e4df] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#16130f] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
