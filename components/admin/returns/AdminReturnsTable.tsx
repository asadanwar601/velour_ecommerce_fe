'use client';

import React from 'react';
import { ReturnRecord } from '@/lib/types';
import { money } from '@/lib/format';
import { RotateCcwIcon, CheckIcon } from '@/components/Icons';

interface AdminReturnsTableProps {
  returns: ReturnRecord[];
  onSelectReturn: (record: ReturnRecord) => void;
  onStatusChange: (id: string, status: ReturnRecord['status']) => void;
}

export function AdminReturnsTable({
  returns,
  onSelectReturn,
  onStatusChange,
}: AdminReturnsTableProps) {
  const getBadgeClass = (status: ReturnRecord['status']) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'RECEIVED':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'REFUNDED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'REJECTED':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-sand-100 text-neutral-800 border-sand-300';
    }
  };

  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50 border-b border-sand-200 text-neutral-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Order & Return Tracking</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4 text-center">Items</th>
              <th className="py-3 px-4 text-right">Refund Estimate</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {returns.map((ret) => {
              const totalItems = ret.items.reduce((s, i) => s + i.quantity, 0);
              const estRefund = ret.items.reduce((s, i) => s + i.price * i.quantity, 0);

              return (
                <tr key={ret.id} className="hover:bg-sand-50/50 transition-colors">
                  <td className="py-3.5 px-4 cursor-pointer" onClick={() => onSelectReturn(ret)}>
                    <p className="font-mono font-bold text-neutral-900 hover:text-gold-700">{ret.orderNumber}</p>
                    <p className="text-[11px] text-neutral-400 font-mono">{ret.returnTrackingNumber || 'No label'}</p>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-700 max-w-xs truncate">
                    {ret.reason}
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono">
                    {totalItems}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                    {money(estRefund)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(ret.status)}`}>
                      {ret.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {ret.status === 'REQUESTED' ? (
                      <button
                        type="button"
                        onClick={() => onStatusChange(ret.id, 'APPROVED')}
                        className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white uppercase text-[10px] tracking-wider font-semibold rounded-sm transition-all"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectReturn(ret)}
                        className="text-neutral-500 hover:text-neutral-900 font-medium underline"
                      >
                        Manage
                      </button>
                    )}
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
