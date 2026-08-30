'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWishlist, useCart } from '@/lib/store';
import { Product } from '@/lib/types';
import { HeartIcon } from '@/components/Icons';
import { WishlistGarmentCard } from '@/components/wishlist/WishlistGarmentCard';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem, openCartDrawer } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleMoveToBag = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0] || 'M';
    addItem(product, size, 1);
    removeFromWishlist(product.id);
    openCartDrawer();
  };

  return (
    <div className="min-h-screen bg-sand-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sand-200 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Curated Selection</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 mt-1">Saved Atelier Pieces</h1>
            <p className="text-xs text-neutral-500 mt-1">Your private wishlist of bespoke tailoring and knitwear.</p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs text-neutral-500 hover:text-red-600 underline font-medium"
            >
              Clear All Saved Pieces
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-sand-200 p-16 text-center rounded-sm space-y-4 shadow-sm max-w-lg mx-auto">
            <div className="w-14 h-14 bg-sand-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <HeartIcon size={28} />
            </div>
            <div>
              <h3 className="font-serif text-xl text-neutral-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Save pieces while exploring our seasonal collections for easy access.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link
                href="/women"
                className="px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-neutral-800 transition-all"
              >
                Women's Collection
              </Link>
              <Link
                href="/men"
                className="px-6 py-2.5 border border-sand-300 text-neutral-800 text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-sand-50 transition-all"
              >
                Men's Tailoring
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <WishlistGarmentCard
                key={product.id}
                product={product}
                selectedSize={selectedSizes[product.id] || product.sizes[0] || 'M'}
                onSelectSize={(size) => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                onMoveToBag={handleMoveToBag}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
