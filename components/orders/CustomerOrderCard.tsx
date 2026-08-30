'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { TruckIcon, ArrowRightIcon, ShoppingBagIcon, DownloadIcon } from '@/components/Icons';
import { downloadOrderInvoicePdf } from '@/lib/api';

interface CustomerOrderCardProps {
  order: Order;
  onSelectOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
}

export function CustomerOrderCard({ order, onSelectOrder, onReorder }: CustomerOrderCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'SHIPPED':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'PROCESSING':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-sand-100 text-neutral-800 border-sand-300';
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      setIsDownloading(true);
      await downloadOrderInvoicePdf(order.id, order.orderNumber);
    } catch (err: any) {
      alert(err.message || 'Failed to download invoice PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-sand-50/70 border-b border-sand-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Order Number</span>
            <span className="font-mono text-sm font-semibold text-neutral-900">{order.orderNumber}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Date Placed</span>
            <span className="text-xs text-neutral-800 font-medium">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs px-2.5 py-1 border rounded-full font-medium uppercase tracking-wider ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
          <span className="font-mono text-sm font-bold text-neutral-900">{money(order.total)}</span>
        </div>
      </div>

      {/* Body: Items Preview */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-sand-50 p-2 rounded-sm border border-sand-200">
              {item.product?.primaryImageUrl && (
                <div className="relative w-10 h-12 bg-sand-100 rounded-sm overflow-hidden flex-shrink-0">
                  <Image src={item.product.primaryImageUrl} alt={item.product.name} fill className="object-cover" />
                </div>
              )}
              <div className="pr-2">
                <p className="text-xs font-semibold text-neutral-900 line-clamp-1">{item.product?.name || 'Garment'}</p>
                <p className="text-[11px] text-neutral-500">Size: {item.size} • Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 sm:px-5 border-t border-sand-200 bg-sand-50/30 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <TruckIcon size={14} />
          <span>{order.carrier || 'FedEx Express'} {order.trackingNumber ? `• ${order.trackingNumber}` : ''}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadInvoice}
            disabled={isDownloading}
            className="px-3 py-1.5 bg-sand-100 hover:bg-sand-200 text-neutral-800 text-xs font-medium uppercase tracking-wider rounded-sm transition-all flex items-center gap-1 cursor-pointer"
            title="Download PDF Invoice"
          >
            <DownloadIcon size={12} />
            <span>{isDownloading ? 'PDF...' : 'Invoice'}</span>
          </button>
          <button
            type="button"
            onClick={() => onReorder(order)}
            className="px-3 py-1.5 bg-sand-100 hover:bg-sand-200 text-neutral-900 text-xs font-medium uppercase tracking-wider rounded-sm transition-all flex items-center gap-1"
          >
            <ShoppingBagIcon size={12} />
            <span>Reorder</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectOrder(order)}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider rounded-sm transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Timeline</span>
            <ArrowRightIcon size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
