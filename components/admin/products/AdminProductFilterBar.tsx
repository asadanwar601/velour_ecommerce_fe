'use client';

import React from 'react';
import { SearchIcon, PlusIcon } from '@/components/Icons';
import { CategoryConfig } from '@/lib/types';

interface AdminProductFilterBarProps {
  categories: CategoryConfig[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCreateModal: () => void;
}

export function AdminProductFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
}: AdminProductFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-sand-200">
      <div className="flex gap-2 flex-wrap w-full sm:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 bg-white border border-sand-300 text-xs font-medium rounded-sm outline-none capitalize"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <input
            type="text"
            placeholder="Search garments..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-sand-300 focus:border-neutral-900 text-xs rounded-sm outline-none"
          />
          <div className="absolute left-3 top-2.5 text-neutral-400">
            <SearchIcon size={14} />
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 transition-all shadow-sm whitespace-nowrap"
        >
          <PlusIcon size={14} />
          <span>New Garment</span>
        </button>
      </div>
    </div>
  );
}
