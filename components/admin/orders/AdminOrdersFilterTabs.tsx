'use client';

import React from 'react';
import { SearchIcon } from '@/components/Icons';
import { Order } from '@/lib/types';

export type FilterStatus = 'ALL' | Order['status'];

interface AdminOrdersFilterTabsProps {
  activeTab: FilterStatus;
  onTabChange: (tab: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function AdminOrdersFilterTabs({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: AdminOrdersFilterTabsProps) {
  const tabs: { id: FilterStatus; label: string }[] = [
    { id: 'ALL', label: 'All Orders' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'PAID', label: 'Paid & Ready' },
    { id: 'SHIPPED', label: 'Dispatched' },
    { id: 'DELIVERED', label: 'Delivered' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-sand-200">
      <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-neutral-900 text-white'
                : 'bg-sand-100/70 text-neutral-600 hover:bg-sand-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search by order # or client..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-sand-300 focus:border-neutral-900 text-xs rounded-sm outline-none"
        />
        <div className="absolute left-3 top-2.5 text-neutral-400">
          <SearchIcon size={14} />
        </div>
      </div>
    </div>
  );
}
