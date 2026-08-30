'use client';

import React from 'react';
import Image from 'next/image';
import { Product, ProductInventoryBreakdown } from '@/lib/types';
import { SlidersIcon, AlertTriangleIcon } from '@/components/Icons';

interface AdminInventoryTableProps {
  products: Product[];
  inventoryMap: Record<string, ProductInventoryBreakdown>;
  onOpenAdjustModal: (product: Product, preselectedLocation?: string) => void;
}

export function AdminInventoryTable({
  products,
  inventoryMap,
  onOpenAdjustModal,
}: AdminInventoryTableProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50 border-b border-sand-200 text-neutral-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Garment SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Total Stock</th>
              <th className="py-3 px-4">Regional Hub Breakdown</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {products.map((product) => {
              const breakdown = inventoryMap[product.id];
              const isLowStock = (breakdown?.totalStock ?? 20) < 15;

              return (
                <tr key={product.id} className="hover:bg-sand-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <div className="relative w-9 h-11 bg-sand-100 rounded-sm overflow-hidden flex-shrink-0">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-neutral-900 line-clamp-1">{product.name}</p>
                        <p className="font-mono text-[10px] text-neutral-400">{product.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-600 capitalize">
                    {product.category} / {product.subcategory}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isLowStock ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-sand-100 text-neutral-800'
                      }`}
                    >
                      {isLowStock && <AlertTriangleIcon size={12} />}
                      {breakdown?.totalStock ?? 20}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      {breakdown?.locations && breakdown.locations.length > 0 ? (
                        breakdown.locations.map((loc, i) => (
                          <div key={i} className="flex items-center justify-between text-[11px] text-neutral-500">
                            <span className="truncate max-w-[180px]">{loc.locationName}</span>
                            <span className="font-mono font-medium text-neutral-700">{loc.quantity} units</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-[11px] text-neutral-400">Main Atelier: {breakdown?.totalStock ?? 20} units</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onOpenAdjustModal(product)}
                      className="px-3 py-1.5 border border-sand-300 hover:border-neutral-900 text-neutral-800 uppercase tracking-wider font-semibold rounded-sm transition-all inline-flex items-center gap-1"
                    >
                      <SlidersIcon size={12} />
                      Adjust
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
