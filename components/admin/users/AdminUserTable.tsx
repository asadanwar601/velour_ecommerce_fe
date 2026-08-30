'use client';

import React from 'react';
import { AdminUser } from '@/lib/types';
import { money } from '@/lib/format';
import { EditIcon, TrashIcon, ShieldCheckIcon, CheckIcon, UserIcon } from '@/components/Icons';

interface AdminUserTableProps {
  users: AdminUser[];
  onInspectUser: (user: AdminUser) => void;
  onOpenEdit: (user: AdminUser) => void;
  onDeleteUser: (user: AdminUser) => void;
}

export function AdminUserTable({
  users,
  onInspectUser,
  onOpenEdit,
  onDeleteUser,
}: AdminUserTableProps) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white border border-sand-200 rounded-sm p-12 text-center space-y-3 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-neutral-400">
          <UserIcon size={24} />
        </div>
        <h3 className="font-serif text-base text-neutral-900">No Client Accounts Found</h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          No registered user profiles matched the selected criteria or role filter.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50/80 border-b border-sand-200 text-neutral-600 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">User Profile</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4 text-center">Verification</th>
              <th className="py-3.5 px-4 text-center">Orders</th>
              <th className="py-3.5 px-4 text-right">Lifetime Spend</th>
              <th className="py-3.5 px-4 text-center">Security</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {users.map((user) => {
              const spend = user.totalSpend ?? user.totalSpent ?? 0;
              const isVerified = user.isEmailVerified ?? true;

              return (
                <tr key={user.id} className="hover:bg-sand-50/40 transition-colors">
                  <td className="py-3.5 px-4 cursor-pointer" onClick={() => onInspectUser(user)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sand-200 text-neutral-800 flex items-center justify-center font-bold flex-shrink-0">
                        {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 hover:text-gold-700 transition-colors">
                          {user.firstName || 'Anonymous'} {user.lastName || ''}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-mono">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'ADMIN'
                          ? 'bg-neutral-900 text-white'
                          : 'bg-sand-100 text-neutral-700 border border-sand-300'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckIcon size={12} />
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        Pending OTP
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono font-medium text-neutral-800">
                    {user.orderCount ?? 0}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                    {money(spend)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {user.twoFactorEnabled || user.mfaEnabled ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <ShieldCheckIcon size={12} />
                        2FA Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400">Standard</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(user)}
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                        title="Edit user"
                      >
                        <EditIcon size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteUser(user)}
                        className="p-1.5 text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete user"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
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
