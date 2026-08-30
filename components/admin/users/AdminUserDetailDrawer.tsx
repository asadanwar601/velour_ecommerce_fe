'use client';

import React from 'react';
import { AdminUser } from '@/lib/types';
import { money, date } from '@/lib/format';
import { CloseIcon, UserIcon, ShieldCheckIcon, PackageIcon, MapPinIcon } from '@/components/Icons';

interface AdminUserDetailDrawerProps {
  user: AdminUser | null;
  onClose: () => void;
  onOpenEdit: (user: AdminUser) => void;
}

export function AdminUserDetailDrawer({ user, onClose, onOpenEdit }: AdminUserDetailDrawerProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex justify-end animate-fade-in" role="dialog" aria-modal="true">
      <div onClick={onClose} className="absolute inset-0 bg-[#16130f]/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-md h-full bg-white border-l border-sand-300 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 text-xs text-neutral-800 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-sand-200 pb-3">
            <div className="flex items-center gap-2">
              <UserIcon size={18} />
              <h3 className="font-serif text-lg text-neutral-900">Client Profile Record</h3>
            </div>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Profile Header */}
          <div className="bg-sand-50 p-4 rounded-sm border border-sand-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-900">{user.firstName} {user.lastName}</span>
              <span className="px-2 py-0.5 bg-neutral-900 text-white uppercase text-[10px] font-bold tracking-wider rounded-sm">
                {user.role}
              </span>
            </div>
            <p className="text-neutral-600 font-mono">{user.email}</p>
            {user.phone && <p className="text-neutral-500">{user.phone}</p>}
          </div>

          {/* Spend & Order Stats */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-sand-50 border border-sand-200 rounded-sm">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Lifetime Spend</span>
              <span className="font-mono text-base font-bold text-neutral-900">{money(user.totalSpent || 0)}</span>
            </div>
            <div className="p-3 bg-sand-50 border border-sand-200 rounded-sm">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Total Orders</span>
              <span className="font-mono text-base font-bold text-neutral-900">{user.orderCount || 0}</span>
            </div>
          </div>

          {/* Security & 2FA */}
          <div className="p-4 bg-sand-50 border border-sand-200 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-wider font-semibold text-neutral-700 flex items-center gap-1.5">
                <ShieldCheckIcon size={14} />
                MFA Authentication
              </span>
              <span className={`font-semibold ${user.mfaEnabled ? 'text-emerald-700' : 'text-neutral-400'}`}>
                {user.mfaEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Registered on: {date(user.createdAt)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenEdit(user);
          }}
          className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          Edit Account Settings
        </button>
      </div>
    </div>
  );
}
