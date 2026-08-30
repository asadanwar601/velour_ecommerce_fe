'use client';

import React from 'react';
import { SearchIcon } from '@/components/Icons';

export type OrderFilterTab = 'all' | 'active' | 'delivered' | 'cancelled';

interface OrdersFilterTabsProps {
  activeTab: OrderFilterTab;
  onTabChange: (tab: OrderFilterTab) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  ordersCounts: {
    all: number;
    active: number;
    delivered: number;
    cancelled: number;
  };
}

export function OrdersFilterTabs({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  ordersCounts,
}: OrdersFilterTabsProps) {
  const tabs: { id: OrderFilterTab; label: string; count: number }[] = [
    { id: 'all', label: 'All Orders', count: ordersCounts.all },
    { id: 'active', label: 'In Progress', count: ordersCounts.active },
    { id: 'delivered', label: 'Delivered', count: ordersCounts.delivered },
    { id: 'cancelled', label: 'Cancelled & Returns', count: ordersCounts.cancelled },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-sand-200">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-neutral-900 text-white'
                : 'bg-sand-100/70 text-neutral-600 hover:bg-sand-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] opacity-75 font-mono">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search by order # or piece..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-xs text-neutral-900 rounded-sm outline-none"
        />
        <div className="absolute left-3 top-2.5 text-neutral-400">
          <SearchIcon size={14} />
        </div>
      </div>
    </div>
  );
}
