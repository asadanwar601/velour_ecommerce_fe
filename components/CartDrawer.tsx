'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { CloseIcon, ShoppingBagIcon } from './Icons';
import { CartDrawerShippingProgress } from './cart/CartDrawerShippingProgress';
import { CartDrawerItemRow } from './cart/CartDrawerItemRow';
import { CartDrawerCouponSection } from './cart/CartDrawerCouponSection';
import { CartDrawerFooter } from './cart/CartDrawerFooter';

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeItem,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const estimatedShipping = subtotal >= 75 || subtotal === 0 ? 0 : 15;
  const estimatedTotal = Math.max(0, subtotal - discountAmount + estimatedShipping);

  return (
    <div
      className="fixed inset-0 z-[999] flex justify-end animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Shopping Bag"
    >
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-[#16130f]/45 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[460px] h-full bg-white border-l border-[#e8e4df] flex flex-col shadow-2xl z-[1000] text-[#16130f]">
        {/* Header */}
        <div className="p-5 border-b border-[#e8e4df] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon size={18} />
            <h2 className="font-serif text-lg text-[#16130f] tracking-tight">
              Atelier Bag <span className="font-mono text-sm text-[#8a7f72]">({itemCount})</span>
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1 text-[#8a7f72] hover:text-[#16130f] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <CartDrawerShippingProgress subtotal={subtotal} threshold={75} />

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f8f6f3] border border-[#e8e4df] flex items-center justify-center text-[#8a7f72]">
                <ShoppingBagIcon size={28} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#16130f] mb-1">Your atelier bag is empty</h3>
                <p className="text-xs text-[#8a7f72] max-w-xs">
                  Explore our luxury collection crafted with natural fibers and bespoke cuts.
                </p>
              </div>
              <Link
                href="/women"
                onClick={closeCartDrawer}
                className="px-6 py-2.5 bg-[#16130f] hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium rounded-sm transition-all"
              >
                Discover Collection
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartDrawerItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onCloseDrawer={closeCartDrawer}
                />
              ))}

              <CartDrawerCouponSection
                coupon={coupon}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <CartDrawerFooter
            subtotal={subtotal}
            discountAmount={discountAmount}
            estimatedShipping={estimatedShipping}
            estimatedTotal={estimatedTotal}
            itemCount={itemCount}
            onCloseDrawer={closeCartDrawer}
          />
        )}
      </div>
    </div>
  );
}
