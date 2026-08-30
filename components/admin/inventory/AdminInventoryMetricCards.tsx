'use client';

import React from 'react';
import { PackageIcon, AlertTriangleIcon, SlidersIcon } from '@/components/Icons';

interface AdminInventoryMetricCardsProps {
  totalUnits: number;
  totalSkus: number;
  lowStockSkus: number;
  filterMode: 'all' | 'lowStock';
  onFilterChange: (mode: 'all' | 'lowStock') => void;
}

export function AdminInventoryMetricCards({
  totalUnits,
  totalSkus,
  lowStockSkus,
  filterMode,
  onFilterChange,
}: AdminInventoryMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-1">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Total Stock Units</span>
          <PackageIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{totalUnits.toLocaleString()}</p>
        <p className="text-[11px] text-neutral-500">Across 3 regional ateliers & hubs</p>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-1">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Tracked SKU Styles</span>
          <SlidersIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{totalSkus}</p>
        <p className="text-[11px] text-neutral-500">Active atelier catalog styles</p>
      </div>

      <div
        onClick={() => onFilterChange(filterMode === 'lowStock' ? 'all' : 'lowStock')}
        className={`p-5 rounded-sm border cursor-pointer transition-all space-y-1 ${
          filterMode === 'lowStock'
            ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400'
            : 'bg-white border-sand-200 hover:border-amber-300'
        }`}
      >
        <div className="flex items-center justify-between text-amber-700">
          <span className="text-xs uppercase tracking-wider font-semibold">Low Stock Threshold</span>
          <AlertTriangleIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-amber-900">{lowStockSkus}</p>
        <p className="text-[11px] text-amber-700">
          {filterMode === 'lowStock' ? 'Showing low-stock items only' : 'Click to filter (< 15 units)'}
        </p>
      </div>
    </div>
  );
}
