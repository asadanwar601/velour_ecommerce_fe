'use client';

import React, { useState, useEffect } from 'react';
import { ReturnRecord } from '@/lib/types';
import { SearchIcon, CheckIcon } from '@/components/Icons';
import { AdminReturnsTable } from '@/components/admin/returns/AdminReturnsTable';
import { AdminReturnDetailModal } from '@/components/admin/returns/AdminReturnDetailModal';

type StatusFilter = 'ALL' | ReturnRecord['status'];

export default function AdminReturnsPage() {
  const [returnsList, setReturnsList] = useState<ReturnRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusFilter>('ALL');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<ReturnRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Simulated returns list
      setReturnsList([
        {
          id: 'ret_1',
          orderId: 'ord_1',
          orderNumber: 'VLR-84920',
          status: 'REQUESTED',
          reason: 'Sizing ran slightly large',
          returnTrackingNumber: 'VLR-RET-938201',
          items: [
            {
              productId: 'prod_1',
              productName: 'Double-Breasted Wool Coat',
              size: 'L',
              quantity: 1,
              price: 490,
              reason: 'Sizing ran slightly large',
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (returnId: string, status: ReturnRecord['status']) => {
    try {
      setIsUpdating(true);
      setReturnsList((prev) =>
        prev.map((r) => (r.id === returnId ? { ...r, status, updatedAt: new Date().toISOString() } : r)),
      );
      if (selectedReturn && selectedReturn.id === returnId) {
        setSelectedReturn((prev) => (prev ? { ...prev, status } : null));
      }
      notify(`Return status updated to ${status}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const filtered = returnsList.filter((r) => {
    const matchesTab = activeTab === 'ALL' || r.status === activeTab;
    const matchesSearch =
      r.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Returns & RMA Inspection</h1>
        <p className="text-xs text-neutral-500">Review prepaid return requests, inspect garments, and release refunds.</p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-sand-200">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
          {(['ALL', 'REQUESTED', 'APPROVED', 'RECEIVED', 'REFUNDED', 'REJECTED'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-neutral-900 text-white' : 'bg-sand-100/70 text-neutral-600 hover:bg-sand-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search return #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-sand-300 focus:border-neutral-900 text-xs rounded-sm outline-none"
          />
          <div className="absolute left-3 top-2.5 text-neutral-400">
            <SearchIcon size={14} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">Loading RMA records...</div>
      ) : (
        <AdminReturnsTable
          returns={filtered}
          onSelectReturn={setSelectedReturn}
          onStatusChange={handleStatusChange}
        />
      )}

      <AdminReturnDetailModal
        returnRecord={selectedReturn}
        onClose={() => setSelectedReturn(null)}
        onStatusChange={handleStatusChange}
        isUpdating={isUpdating}
      />
    </div>
  );
}
