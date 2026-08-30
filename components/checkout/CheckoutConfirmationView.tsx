'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { CheckIcon, PackageIcon, ShieldIcon, GiftIcon, ArrowRightIcon } from '@/components/Icons';

interface CheckoutConfirmationViewProps {
  confirmedOrder: Order;
}

export function CheckoutConfirmationView({ confirmedOrder }: CheckoutConfirmationViewProps) {
  return (
    <div className="min-h-screen bg-sand-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fade-in">
      <div className="max-w-2xl w-full bg-white border border-sand-200 shadow-xl rounded-sm p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon size={32} />
        </div>

        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 mb-4 tracking-tight">
          Thank you for your atelier order.
        </h1>
        <p className="text-sm text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
          Your order has been recorded and assigned to our packaging atelier. A confirmation email has been dispatched to{' '}
          <strong className="text-neutral-900 font-medium">{confirmedOrder.contactEmail || 'your email'}</strong>.
        </p>

        <div className="bg-sand-50 border border-sand-200 rounded-sm p-6 mb-8 text-left space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-3">
            <div>
              <span className="text-xs text-neutral-500 uppercase tracking-wider block">Order Reference</span>
              <span className="font-mono text-sm font-semibold text-neutral-900">{confirmedOrder.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-500 uppercase tracking-wider block">Estimated Delivery</span>
              <span className="text-sm font-medium text-neutral-900">
                {confirmedOrder.estimatedDelivery
                  ? new Date(confirmedOrder.estimatedDelivery).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '3-5 Business Days'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs text-neutral-500 uppercase tracking-wider block">Garments Ordered</span>
            {confirmedOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm py-1">
                <div className="flex items-center gap-3">
                  {item.product?.primaryImageUrl && (
                    <div className="relative w-10 h-12 rounded-sm overflow-hidden bg-sand-100 flex-shrink-0">
                      <Image src={item.product.primaryImageUrl} alt={item.product.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-neutral-900 block">{item.product?.name || 'Garment'}</span>
                    <span className="text-xs text-neutral-500">Size {item.size} • Qty {item.quantity}</span>
                  </div>
                </div>
                <span className="font-mono text-neutral-900 font-medium">{money(item.lineTotal || item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-sand-200 pt-3 flex items-center justify-between font-medium text-neutral-900">
            <span>Total Paid</span>
            <span className="font-mono text-lg text-gold-600 font-bold">{money(confirmedOrder.total)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/orders"
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Track Order Status
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
