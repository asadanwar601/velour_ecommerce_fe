'use client';

import React from 'react';
import { money } from '@/lib/format';
import { PackageIcon, ShoppingBagIcon, SlidersIcon, AlertTriangleIcon } from '@/components/Icons';

interface AdminDashboardStatsCardsProps {
  totalRevenue: number;
  ordersCount: number;
  pendingOrdersCount: number;
  lowStockCount: number;
  productsCount: number;
}

export function AdminDashboardStatsCards({
  totalRevenue,
  ordersCount,
  pendingOrdersCount,
  lowStockCount,
  productsCount,
}: AdminDashboardStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-1">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Total Revenue</span>
          <span className="text-gold-600 font-serif font-bold text-sm">$</span>
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{money(totalRevenue)}</p>
        <p className="text-[11px] text-neutral-500">Gross sales across all orders</p>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-1">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Atelier Orders</span>
          <PackageIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{ordersCount}</p>
        <p className="text-[11px] text-amber-700 font-medium">{pendingOrdersCount} pending dispatch</p>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-1">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Low Stock Pieces</span>
          <AlertTriangleIcon size={18} className="text-amber-600" />
        </div>
        <p className="font-mono text-2xl font-bold text-amber-900">{lowStockCount}</p>
        <p className="text-[11px] text-amber-700">Styles under 15 units</p>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-1">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Catalog Styles</span>
          <ShoppingBagIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{productsCount}</p>
        <p className="text-[11px] text-neutral-500">Active online garments</p>
      </div>
    </div>
  );
}
