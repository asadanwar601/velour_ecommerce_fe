'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { money } from '@/lib/format';
import { TrashIcon, ShoppingBagIcon } from '@/components/Icons';

interface WishlistGarmentCardProps {
  product: Product;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onMoveToBag: (product: Product) => void;
  onRemove: (id: string) => void;
}

export function WishlistGarmentCard({
  product,
  selectedSize,
  onSelectSize,
  onMoveToBag,
  onRemove,
}: WishlistGarmentCardProps) {
  const primaryImage = product.images?.[0] || product.primaryImageUrl;

  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative aspect-[3/4] bg-sand-100 overflow-hidden">
          {primaryImage && (
            <Image src={primaryImage} alt={product.name} fill className="object-cover" />
          )}
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full text-neutral-600 hover:text-red-600 transition-colors shadow-sm"
            title="Remove from wishlist"
          >
            <TrashIcon size={14} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">{product.category}</p>
          <Link href={`/product/${product.id}`} className="font-serif text-sm text-neutral-900 hover:underline line-clamp-1 block">
            {product.name}
          </Link>
          <p className="font-mono text-xs font-bold text-neutral-900">{money(product.price)}</p>

          <div className="flex gap-1 pt-1 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSelectSize(s)}
                className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded-sm border uppercase transition-all ${
                  selectedSize === s
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-sand-50 text-neutral-600 border-sand-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={() => onMoveToBag(product)}
          className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <ShoppingBagIcon size={14} />
          <span>Move to Bag</span>
        </button>
      </div>
    </div>
  );
}
