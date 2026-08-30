'use client';

import React from 'react';
import { SearchIcon, UserIcon, ShieldIcon, LayersIcon } from '@/components/Icons';

interface AdminUserFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedRole: 'ALL' | 'CUSTOMER' | 'ADMIN';
  onRoleChange: (role: 'ALL' | 'CUSTOMER' | 'ADMIN') => void;
  selectedStatus: 'ALL' | 'ACTIVE' | 'ARCHIVED';
  onStatusChange: (status: 'ALL' | 'ACTIVE' | 'ARCHIVED') => void;
  counts?: { all: number; customers: number; admins: number };
}

export function AdminUserFilterBar({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  counts,
}: AdminUserFilterBarProps) {
  return (
    <div className="space-y-4 pb-4 border-b border-sand-200">
      {/* Role Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-sand-100 rounded-sm">
          <button
            type="button"
            onClick={() => onRoleChange('ALL')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedRole === 'ALL'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <LayersIcon size={14} />
            <span>All Users</span>
            {counts && <span className="font-mono text-[10px] opacity-75">({counts.all})</span>}
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('ADMIN')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedRole === 'ADMIN'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <ShieldIcon size={14} />
            <span>Admins</span>
            {counts && <span className="font-mono text-[10px] opacity-75">({counts.admins})</span>}
          </button>

          <button
            type="button"
            onClick={() => onRoleChange('CUSTOMER')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedRole === 'CUSTOMER'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <UserIcon size={14} />
            <span>Customers</span>
            {counts && <span className="font-mono text-[10px] opacity-75">({counts.customers})</span>}
          </button>
        </div>

        {/* Status Dropdown & Search Input */}
        <div className="flex items-center gap-2 flex-1 sm:flex-initial w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as any)}
            className="px-3 py-2 bg-white border border-sand-300 text-xs font-medium rounded-sm outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-sand-300 focus:border-neutral-900 text-xs rounded-sm outline-none"
            />
            <div className="absolute left-2.5 top-2.5 text-neutral-400">
              <SearchIcon size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
