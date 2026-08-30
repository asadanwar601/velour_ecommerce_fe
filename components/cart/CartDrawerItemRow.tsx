'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '@/lib/types';
import { money } from '@/lib/format';
import { TrashIcon } from '@/components/Icons';
import QuantityStepper from '@/components/QuantityStepper';

interface CartDrawerItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, size: string, qty: number) => void;
  onRemoveItem: (id: string, size?: string) => void;
  onCloseDrawer: () => void;
}

export function CartDrawerItemRow({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onCloseDrawer,
}: CartDrawerItemRowProps) {
  const primaryImage = item.product?.images?.[0] || item.product?.primaryImageUrl;

  return (
    <div className="flex gap-4 py-4 border-b border-[#e8e4df] last:border-b-0">
      <Link
        href={`/product/${item.product?.id || item.productId}`}
        onClick={onCloseDrawer}
        className="relative w-20 h-24 bg-[#f8f6f3] rounded-sm overflow-hidden flex-shrink-0"
      >
        {primaryImage && (
          <Image src={primaryImage} alt={item.product?.name || 'Garment'} fill className="object-cover" />
        )}
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/product/${item.product?.id || item.productId}`}
              onClick={onCloseDrawer}
              className="text-xs font-serif text-[#16130f] hover:underline line-clamp-1"
            >
              {item.product?.name}
            </Link>
            <button
              onClick={() => onRemoveItem(item.id || item.productId || '', item.size)}
              className="text-[#8a7f72] hover:text-red-600 transition-colors"
              title="Remove item"
            >
              <TrashIcon size={14} />
            </button>
          </div>
          <p className="text-[11px] text-[#8a7f72] mt-0.5">Size: {item.size}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <QuantityStepper
            value={item.quantity}
            onChange={(newQty) => onUpdateQuantity(item.id || item.productId || '', item.size, newQty)}
            min={1}
            max={10}
          />
          <span className="font-mono text-xs font-semibold text-[#16130f]">
            {money(item.lineTotal || (item.price ?? item.product?.price) * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
