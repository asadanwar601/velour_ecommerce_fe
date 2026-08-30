'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/store';
import { COMMERCE_CONFIG } from '@/lib/config';
import { ShoppingBagIcon } from '@/components/Icons';
import { CartPageItemList } from '@/components/cart/CartPageItemList';
import { CartPageSummaryPanel } from '@/components/cart/CartPageSummaryPanel';

const FREE_SHIPPING_THRESHOLD = COMMERCE_CONFIG.freeShippingThreshold;

export default function CartPage() {
  const {
    items,
    subtotal,
    discountAmount,
    coupon,
    applyCoupon,
    removeCoupon,
    giftOptions,
    setGiftOptions,
    isHydrated,
    updateQuantity,
    removeItem,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : COMMERCE_CONFIG.standardShippingFee;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError('');
    setIsApplying(true);
    try {
      await applyCoupon(couponInput.trim());
      setCouponInput('');
    } catch (err: any) {
      setCouponError(err.message || 'Invalid promo code.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleGiftToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGiftOptions({ ...giftOptions, isGift: e.target.checked });
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-sand-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Shopping Bag</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 mt-1">Your Atelier Bag</h1>
          <p className="text-xs text-neutral-500 mt-1">Review your selected bespoke garments and proceed to checkout.</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-sand-200 p-16 text-center rounded-sm space-y-4 shadow-sm max-w-lg mx-auto">
            <div className="w-14 h-14 bg-sand-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBagIcon size={28} />
            </div>
            <div>
              <h3 className="font-serif text-xl text-neutral-900">Your Bag is Empty</h3>
              <p className="text-xs text-neutral-500 mt-1">Explore our wardrobe pieces crafted from natural cashmere and silk.</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link href="/women" className="px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-neutral-800 transition-all">
                Women's Collection
              </Link>
              <Link href="/men" className="px-6 py-2.5 border border-sand-300 text-neutral-800 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-sand-50 transition-all">
                Men's Tailoring
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <CartPageItemList
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            </div>

            <div className="lg:col-span-5 sticky top-24">
              <CartPageSummaryPanel
                subtotal={subtotal}
                discountAmount={discountAmount}
                shipping={shipping}
                total={total}
                coupon={coupon}
                giftOptions={giftOptions}
                onGiftToggle={handleGiftToggle}
                couponInput={couponInput}
                onCouponInputChange={setCouponInput}
                couponError={couponError}
                isApplyingCoupon={isApplying}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={removeCoupon}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
