'use client';

import React, { useState } from 'react';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { PrinterIcon, DownloadIcon } from '@/components/Icons';
import { downloadOrderInvoicePdf } from '@/lib/api';

interface OrderInvoiceModalViewProps {
  order: Order;
  onBack: () => void;
}

export function OrderInvoiceModalView({ order, onBack }: OrderInvoiceModalViewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      await downloadOrderInvoicePdf(order.id, order.orderNumber);
    } catch (err: any) {
      alert(err.message || 'Failed to download official invoice PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 bg-white border border-sand-300 rounded-sm space-y-4 printable-invoice">
        <div className="flex justify-between items-start border-b border-sand-200 pb-4">
          <div>
            <h3 className="font-serif text-xl text-neutral-900 tracking-wider">VELOUR ATELIER</h3>
            <p className="text-xs text-neutral-500">Official Purchase Invoice & Receipt</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-semibold text-neutral-900">{order.orderNumber}</p>
            <p className="text-xs text-neutral-500">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs text-neutral-600">
          <div>
            <p className="font-semibold text-neutral-900 mb-1">Billed & Shipped To:</p>
            <p>{order.contactName}</p>
            <p>{order.shippingAddress?.line1}</p>
            {order.shippingAddress?.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
            <p>{order.contactEmail}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-neutral-900 mb-1">Payment Details:</p>
            <p>Status: {order.status}</p>
            <p>Carrier: {order.carrier || 'FedEx Luxury Express'}</p>
            {order.couponCode && <p>Promo Applied: {order.couponCode}</p>}
          </div>
        </div>

        <table className="w-full text-xs mt-4">
          <thead>
            <tr className="border-b border-sand-200 text-neutral-500">
              <th className="py-2 text-left">Garment</th>
              <th className="py-2 text-center">Size</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className="py-2.5 text-neutral-900 font-medium">{item.product?.name || 'Garment'}</td>
                <td className="py-2.5 text-center text-neutral-600">{item.size}</td>
                <td className="py-2.5 text-center text-neutral-600">{item.quantity}</td>
                <td className="py-2.5 text-right font-mono text-neutral-900 font-medium">
                  {money(item.lineTotal || item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-sand-200 pt-3 space-y-1.5 text-xs text-right">
          <p><span className="text-neutral-500">Subtotal:</span> <span className="font-mono text-neutral-900 font-medium">{money(order.subtotal)}</span></p>
          {(order.discountAmount || 0) > 0 && <p className="text-gold-700"><span className="text-neutral-500">Discount:</span> <span className="font-mono">-{money(order.discountAmount || 0)}</span></p>}
          <p><span className="text-neutral-500">Shipping:</span> <span className="font-mono text-neutral-900 font-medium">{(order.shipping ?? 0) === 0 ? 'FREE' : money(order.shipping)}</span></p>
          <p className="text-sm font-bold text-neutral-900 pt-1 border-t border-sand-200">
            Total Paid: <span className="font-mono">{money(order.total)}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <DownloadIcon size={16} />
          {isDownloading ? 'Generating PDF...' : 'Download Official PDF Invoice'}
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-3 border border-sand-300 hover:bg-sand-50 text-neutral-700 text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <PrinterIcon size={16} />
          Print
        </button>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-3 border border-sand-300 text-neutral-600 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}
