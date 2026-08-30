'use client';

import React from 'react';
import Image from 'next/image';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { TruckIcon, CheckIcon, RotateCcwIcon, FileTextIcon, ShoppingBagIcon } from '@/components/Icons';

interface OrderTrackingTimelineViewProps {
  order: Order;
  onOpenCancel: () => void;
  onOpenReturn: () => void;
  onOpenInvoice: () => void;
  onReorder: (order: Order) => void;
}

export function OrderTrackingTimelineView({
  order,
  onOpenCancel,
  onOpenReturn,
  onOpenInvoice,
  onReorder,
}: OrderTrackingTimelineViewProps) {
  const isCancellable = order.status === 'PAID' || order.status === 'PENDING';
  const isReturnable = order.status === 'DELIVERED' && !order.returnRecord;

  const trackingSteps = [
    { title: 'Order Confirmed', completed: true, desc: 'Payment verified & Atelier assigned' },
    {
      title: 'Atelier Packaging',
      completed: ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status),
      desc: 'Bespoke box & quality check',
    },
    {
      title: 'In Transit',
      completed: ['SHIPPED', 'DELIVERED'].includes(order.status),
      desc: order.trackingNumber ? `Courier tracking: ${order.trackingNumber}` : 'FedEx Express Courier',
    },
    {
      title: 'Delivered',
      completed: order.status === 'DELIVERED',
      desc: order.status === 'DELIVERED' ? 'Delivered to recipient address' : 'Estimated 3-5 business days',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tracking Stepper */}
      <div className="bg-sand-50 border border-sand-200 p-5 rounded-sm">
        <h4 className="text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-4 flex items-center gap-2">
          <TruckIcon size={16} />
          Live Courier Shipment Progress
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {trackingSteps.map((step, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step.completed ? 'bg-neutral-900 text-white' : 'bg-sand-200 text-neutral-500'
                  }`}
                >
                  {step.completed ? <CheckIcon size={12} /> : idx + 1}
                </div>
                <span className={`text-xs font-medium ${step.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>
                  {step.title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 pl-7">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-wider text-neutral-600 font-semibold">Garments in this Order</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-sand-50/50 border border-sand-200 rounded-sm">
              <div className="flex items-center gap-3">
                {item.product?.primaryImageUrl && (
                  <div className="relative w-10 h-12 rounded-sm overflow-hidden bg-sand-100 flex-shrink-0">
                    <Image src={item.product.primaryImageUrl} alt={item.product.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-neutral-900">{item.product?.name || 'Garment'}</p>
                  <p className="text-[11px] text-neutral-500">Size: {item.size} • Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-medium text-neutral-900">
                {money(item.lineTotal || item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total & Action Buttons */}
      <div className="pt-4 border-t border-sand-200 flex flex-wrap items-center justify-between gap-3">
        <div className="text-left">
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">Total Amount</span>
          <span className="font-mono text-lg font-bold text-neutral-900">{money(order.total)}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenInvoice}
            className="px-3.5 py-2 border border-sand-300 hover:border-neutral-900 text-neutral-700 text-xs font-medium uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all"
          >
            <FileTextIcon size={14} />
            Invoice
          </button>
          <button
            type="button"
            onClick={() => onReorder(order)}
            className="px-3.5 py-2 bg-sand-100 hover:bg-sand-200 text-neutral-900 text-xs font-medium uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all"
          >
            <ShoppingBagIcon size={14} />
            Reorder
          </button>
          {isCancellable && (
            <button
              type="button"
              onClick={onOpenCancel}
              className="px-3.5 py-2 text-red-600 hover:bg-red-50 border border-red-200 text-xs font-medium uppercase tracking-wider rounded-sm transition-all"
            >
              Cancel Order
            </button>
          )}
          {isReturnable && (
            <button
              type="button"
              onClick={onOpenReturn}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all"
            >
              <RotateCcwIcon size={14} />
              Return Pieces
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
