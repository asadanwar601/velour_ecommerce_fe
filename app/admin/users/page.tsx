'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  getAdminUsers,
  updateAdminUser,
  deleteAdminUser,
} from '@/lib/api';
import { AdminUser } from '@/lib/types';
import { CheckIcon, ShieldIcon } from '@/components/Icons';
import { AdminUserFilterBar } from '@/components/admin/users/AdminUserFilterBar';
import { AdminUserDetailDrawer } from '@/components/admin/users/AdminUserDetailDrawer';
import { AdminUserEditModal } from '@/components/admin/users/AdminUserEditModal';
import { AdminUserTable } from '@/components/admin/users/AdminUserTable';
import { AdminInviteAdminModal } from '@/components/admin/users/AdminInviteAdminModal';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'ALL' | 'CUSTOMER' | 'ADMIN'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'ACTIVE' | 'ARCHIVED'>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [inspectingUser, setInspectingUser] = useState<AdminUser | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: 'CUSTOMER' as 'CUSTOMER' | 'ADMIN',
    status: 'ACTIVE' as 'ACTIVE' | 'ARCHIVED' | 'SUSPENDED',
  });

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminUsers({
        role: selectedRole,
        status: selectedStatus,
        query: searchQuery.trim() || undefined,
      });
      const list = Array.isArray(res) ? res : res.data || [];
      setUsers(list);
    } catch (err: any) {
      console.error('Failed to load admin users:', err);
      setToastMsg('Failed to load user accounts from API');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [selectedRole, selectedStatus, searchQuery]);

  const counts = useMemo(() => ({
    all: users.length,
    customers: users.filter((u) => u.role === 'CUSTOMER').length,
    admins: users.filter((u) => u.role === 'ADMIN').length,
  }), [users]);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingUser(user);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      role: user.role,
      status: user.status || (user.isArchived ? 'ARCHIVED' : 'ACTIVE'),
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      setIsSubmitting(true);
      const updated = await updateAdminUser(editingUser.id, editFormData);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
      showNotification(`Account "${updated.firstName} ${updated.lastName}" updated.`);
      setEditingUser(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (!window.confirm(`Are you sure you want to permanently remove ${user.firstName} ${user.lastName}?`)) return;
    try {
      await deleteAdminUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      showNotification(`Account ${user.email} removed.`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl text-neutral-900">User Accounts & Administration</h1>
          <p className="text-xs text-neutral-500">
            Inspect customer profiles, lifetime purchases, and invite verified Atelier Administrators.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <ShieldIcon size={14} />
          <span>Invite Administrator</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      <AdminUserFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        counts={counts}
      />

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">
          Loading client database...
        </div>
      ) : (
        <AdminUserTable
          users={users}
          onInspectUser={setInspectingUser}
          onOpenEdit={handleOpenEdit}
          onDeleteUser={handleDeleteUser}
        />
      )}

      <AdminUserDetailDrawer
        user={inspectingUser}
        onClose={() => setInspectingUser(null)}
        onOpenEdit={handleOpenEdit}
      />

      <AdminUserEditModal
        user={editingUser}
        formData={editFormData}
        onChange={(f, v) => setEditFormData((prev) => ({ ...prev, [f]: v }))}
        isSubmitting={isSubmitting}
        onSubmit={handleEditSubmit}
        onClose={() => setEditingUser(null)}
      />

      <AdminInviteAdminModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={(msg) => {
          showNotification(msg);
          loadUsers();
        }}
      />
    </div>
  );
}
