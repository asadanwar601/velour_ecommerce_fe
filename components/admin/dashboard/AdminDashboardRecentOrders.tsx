'use client';

import React from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { TruckIcon, ArrowRightIcon } from '@/components/Icons';

interface AdminDashboardRecentOrdersProps {
  orders: Order[];
  onQuickDispatch: (id: string, number: string) => void;
  dispatchingId: string | null;
}

export function AdminDashboardRecentOrders({
  orders,
  onQuickDispatch,
  dispatchingId,
}: AdminDashboardRecentOrdersProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm space-y-4 p-5">
      <div className="flex items-center justify-between border-b border-sand-200 pb-3">
        <h3 className="font-serif text-base text-neutral-900">Recent Customer Orders</h3>
        <Link href="/admin/orders" className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
          <span>View All</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50 text-neutral-500 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Order</th>
              <th className="py-2.5 px-3">Client</th>
              <th className="py-2.5 px-3 text-right">Total</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-sand-50/50">
                <td className="py-3 px-3 font-mono font-bold text-neutral-900">{order.orderNumber}</td>
                <td className="py-3 px-3 text-neutral-700">{order.contactName}</td>
                <td className="py-3 px-3 text-right font-mono font-bold">{money(order.total)}</td>
                <td className="py-3 px-3 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'PAID'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : order.status === 'SHIPPED'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  {order.status === 'PAID' ? (
                    <button
                      type="button"
                      disabled={dispatchingId === order.id}
                      onClick={() => onQuickDispatch(order.id, order.orderNumber)}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase text-[10px] tracking-wider font-semibold rounded-sm transition-all inline-flex items-center gap-1"
                    >
                      <TruckIcon size={12} />
                      Dispatch
                    </button>
                  ) : (
                    <span className="text-[11px] text-neutral-400">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
