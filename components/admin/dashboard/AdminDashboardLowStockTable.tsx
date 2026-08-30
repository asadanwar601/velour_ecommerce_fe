'use client';

import React from 'react';
import Link from 'next/link';
import { LowStockItem } from '@/lib/types';
import { SlidersIcon, AlertTriangleIcon, ArrowRightIcon } from '@/components/Icons';

interface AdminDashboardLowStockTableProps {
  items: LowStockItem[];
  onOpenRestock: (item: LowStockItem) => void;
}

export function AdminDashboardLowStockTable({
  items,
  onOpenRestock,
}: AdminDashboardLowStockTableProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm space-y-4 p-5">
      <div className="flex items-center justify-between border-b border-sand-200 pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangleIcon size={16} className="text-amber-600" />
          <h3 className="font-serif text-base text-neutral-900">Low Stock Alert Pieces</h3>
        </div>
        <Link href="/admin/inventory" className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
          <span>Manage Inventory</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50 text-neutral-500 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Garment Style</th>
              <th className="py-2.5 px-3 text-center">Remaining Stock</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {items.slice(0, 5).map((item) => (
              <tr key={item.productId} className="hover:bg-sand-50/50">
                <td className="py-3 px-3">
                  <p className="font-semibold text-neutral-900">{item.productName}</p>
                  <p className="font-mono text-[10px] text-neutral-400">{item.productId}</p>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-amber-700">
                  {item.totalStock} units
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => onOpenRestock(item)}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 uppercase text-[10px] tracking-wider font-semibold rounded-sm transition-all inline-flex items-center gap-1"
                  >
                    <SlidersIcon size={12} />
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
