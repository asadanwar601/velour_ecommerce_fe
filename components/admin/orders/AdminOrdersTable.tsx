'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { TruckIcon, EditIcon } from '@/components/Icons';

interface AdminOrdersTableProps {
  orders: Order[];
  onOpenStatusModal: (order: Order, defaultStatus: Order['status']) => void;
  onQuickDispatch: (order: Order) => void;
}

export function AdminOrdersTable({
  orders,
  onOpenStatusModal,
  onQuickDispatch,
}: AdminOrdersTableProps) {
  const getStatusBadgeStyle = (status: Order['status']) => {
    switch (status) {
      case 'PAID':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'SHIPPED':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'DELIVERED':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-900 border-red-200';
      default:
        return 'bg-sand-100 text-neutral-800 border-sand-300';
    }
  };

  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50 border-b border-sand-200 text-neutral-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Order Reference</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Pieces</th>
              <th className="py-3 px-4 text-right">Total</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-sand-50/50 transition-colors">
                <td className="py-3.5 px-4">
                  <p className="font-mono font-bold text-neutral-900">{order.orderNumber}</p>
                  <p className="text-[11px] text-neutral-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </td>

                <td className="py-3.5 px-4">
                  <p className="font-semibold text-neutral-900">{order.contactName}</p>
                  <p className="text-[11px] text-neutral-400 font-mono">{order.contactEmail}</p>
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-neutral-700">{order.items.length} items</span>
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                  {money(order.total)}
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {order.status === 'PAID' && (
                      <button
                        type="button"
                        onClick={() => onQuickDispatch(order)}
                        className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white uppercase text-[10px] tracking-wider font-semibold rounded-sm transition-all flex items-center gap-1"
                      >
                        <TruckIcon size={12} />
                        Dispatch
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onOpenStatusModal(order, order.status)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                      title="Edit status"
                    >
                      <EditIcon size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
