'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '@/lib/types';
import { money } from '@/lib/format';
import { TrashIcon } from '@/components/Icons';
import QuantityStepper from '@/components/QuantityStepper';

interface CartPageItemListProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, qty: number) => void;
  onRemoveItem: (id: string, size?: string) => void;
}

export function CartPageItemList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartPageItemListProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm divide-y divide-sand-200 shadow-sm">
      {items.map((item) => {
        const primaryImage = item.product?.images?.[0] || item.product?.primaryImageUrl;

        return (
          <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex gap-4 items-center">
              <Link
                href={`/product/${item.product?.id || item.productId}`}
                className="relative w-20 h-28 bg-sand-100 rounded-sm overflow-hidden flex-shrink-0"
              >
                {primaryImage && (
                  <Image src={primaryImage} alt={item.product?.name || 'Garment'} fill className="object-cover" />
                )}
              </Link>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">{item.product?.category}</p>
                <Link
                  href={`/product/${item.product?.id || item.productId}`}
                  className="font-serif text-base text-neutral-900 hover:underline line-clamp-1"
                >
                  {item.product?.name}
                </Link>
                <p className="text-xs text-neutral-500">Size: <span className="font-semibold text-neutral-800">{item.size}</span></p>
                <p className="font-mono text-xs font-semibold text-neutral-900">{money(item.price ?? item.product?.price)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-100">
              <QuantityStepper
                value={item.quantity}
                onChange={(newQty) => onUpdateQuantity(item.id || item.productId || '', item.size, newQty)}
                min={1}
                max={10}
              />

              <span className="font-mono text-sm font-bold text-neutral-900 min-w-[70px] text-right">
                {money(item.lineTotal || (item.price ?? item.product?.price) * item.quantity)}
              </span>

              <button
                type="button"
                onClick={() => onRemoveItem(item.id || item.productId || '', item.size)}
                className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                title="Remove piece"
              >
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
