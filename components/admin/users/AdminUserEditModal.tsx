'use client';

import React from 'react';
import { AdminUser } from '@/lib/types';
import { CloseIcon, EditIcon } from '@/components/Icons';

interface AdminUserEditModalProps {
  user: AdminUser | null;
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    role: 'CUSTOMER' | 'ADMIN';
    status: 'ACTIVE' | 'ARCHIVED' | 'SUSPENDED';
  };
  onChange: (field: string, val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function AdminUserEditModal({
  user,
  formData,
  onChange,
  isSubmitting,
  onSubmit,
  onClose,
}: AdminUserEditModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 space-y-5 text-xs">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <EditIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">Edit User Account</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">System Role</label>
              <select
                value={formData.role}
                onChange={(e) => onChange('role', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-medium"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Account Status</label>
              <select
                value={formData.status}
                onChange={(e) => onChange('status', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-medium"
              >
                <option value="ACTIVE">Active</option>
                <option value="ARCHIVED">Archived</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isSubmitting ? 'Updating...' : 'Save User Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
