'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Order } from '@/lib/types';
import { money } from '@/lib/format';
import { ArrowRightIcon, PackageIcon } from '@/components/Icons';

interface AccountRecentOrdersListProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export function AccountRecentOrdersList({ orders, onSelectOrder }: AccountRecentOrdersListProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-sand-200 pb-3">
        <h3 className="font-serif text-base text-neutral-900">Recent Purchases</h3>
        <Link href="/orders" className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
          <span>All Orders</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="py-8 text-center text-xs text-neutral-500 space-y-3">
          <PackageIcon size={24} className="mx-auto text-neutral-400" />
          <p>No recent orders placed yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="p-3.5 bg-sand-50/60 border border-sand-200 rounded-sm hover:border-neutral-900 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-900">{order.orderNumber}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-sand-200 text-neutral-800 rounded-full uppercase font-semibold">
                    {order.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {order.items.length} items
                </p>
              </div>

              <div className="text-right">
                <span className="font-mono text-sm font-bold text-neutral-900 block">{money(order.total)}</span>
                <span className="text-[10px] text-gold-700 font-medium">Timeline →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
