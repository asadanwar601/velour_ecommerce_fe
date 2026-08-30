'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart, useAuth } from '@/lib/store';
import { checkout as apiCheckout } from '@/lib/api';
import { Order } from '@/lib/types';
import { COMMERCE_CONFIG } from '@/lib/config';
import { CheckoutConfirmationView } from '@/components/checkout/CheckoutConfirmationView';
import { CheckoutShippingAddressSection } from '@/components/checkout/CheckoutShippingAddressSection';
import { CheckoutPaymentMethodSection } from '@/components/checkout/CheckoutPaymentMethodSection';
import { CheckoutOrderSummaryPanel } from '@/components/checkout/CheckoutOrderSummaryPanel';

export default function CheckoutPage() {
  const { items, subtotal, discountAmount, coupon, giftOptions, clearCart, isHydrated } = useCart();
  const { user, isAuthenticated, openGoogleModal } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'NY',
    postalCode: '',
    country: 'US',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '123',
  });

  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user) {
      const defaultAddr = (user.addresses || []).find((a) => a.isDefault) || (user.addresses || [])[0];
      if (defaultAddr) {
        setSelectedSavedAddressId(defaultAddr.id);
        setFormData((prev) => ({
          ...prev,
          firstName: defaultAddr.firstName || user.firstName || '',
          lastName: defaultAddr.lastName || user.lastName || '',
          email: user.email || '',
          phone: defaultAddr.phone || user.phone || '',
          address: defaultAddr.line1,
          apartment: defaultAddr.line2 || '',
          city: defaultAddr.city,
          state: defaultAddr.state,
          postalCode: defaultAddr.zip,
          country: defaultAddr.country || 'US',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          firstName: prev.firstName || user.firstName || '',
          lastName: prev.lastName || user.lastName || '',
          email: user.email || '',
          phone: prev.phone || user.phone || '',
        }));
      }
    }
  }, [user]);

  const handleSelectSavedAddress = (addrId: string) => {
    setSelectedSavedAddressId(addrId);
    const match = (user?.addresses || []).find((a) => a.id === addrId);
    if (match) {
      setFormData((prev) => ({
        ...prev,
        firstName: match.firstName,
        lastName: match.lastName,
        phone: match.phone || prev.phone,
        address: match.line1,
        apartment: match.line2 || '',
        city: match.city,
        state: match.state,
        postalCode: match.zip,
        country: match.country || 'US',
      }));
    }
  };

  const shipping =
    subtotal >= COMMERCE_CONFIG.freeShippingThreshold || subtotal === 0
      ? 0
      : COMMERCE_CONFIG.standardShippingFee;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      setErrorMsg('Please sign in or register with Google to complete your purchase.');
      openGoogleModal('/checkout');
      return;
    }

    if (items.length === 0) {
      setErrorMsg('Your bag is currently empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await apiCheckout({
        shippingAddress: {
          line1: formData.address,
          line2: formData.apartment || undefined,
          city: formData.city,
          state: formData.state,
          zip: formData.postalCode,
          country: formData.country,
        },
        contactName: `${formData.firstName} ${formData.lastName}`.trim(),
        contactEmail: formData.email,
        contactPhone: formData.phone || undefined,
        couponCode: coupon?.code,
        giftPackaging: giftOptions.isGift,
        giftNote: giftOptions.giftMessage,
      });

      setConfirmedOrder(response.order);
      await clearCart();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Checkout failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) return null;

  if (confirmedOrder) {
    return <CheckoutConfirmationView confirmedOrder={confirmedOrder} />;
  }

  return (
    <div className="min-h-screen bg-sand-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/cart" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors">
            ← Return to Shopping Bag
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 mt-2">Atelier Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-sand-200 shadow-sm rounded-sm space-y-8">
            <CheckoutShippingAddressSection
              formData={formData}
              onChange={handleChange}
              user={user}
              isAuthenticated={isAuthenticated}
              selectedSavedAddressId={selectedSavedAddressId}
              onSelectSavedAddress={handleSelectSavedAddress}
              onOpenGoogleModal={() => openGoogleModal('/checkout')}
            />

            <CheckoutPaymentMethodSection
              formData={formData}
              onChange={handleChange}
            />
          </div>

          <div className="lg:col-span-5">
            <CheckoutOrderSummaryPanel
              items={items}
              subtotal={subtotal}
              discountAmount={discountAmount}
              shipping={shipping}
              total={total}
              coupon={coupon}
              giftOptions={giftOptions}
              isSubmitting={isSubmitting}
              errorMsg={errorMsg}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
