'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/store';
import { AdminSidebarNav } from '@/components/admin/navigation/AdminSidebarNav';
import { AdminAccessGate } from '@/components/admin/navigation/AdminAccessGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-sand-50/50 flex items-center justify-center text-xs text-neutral-500">
        Verifying administrator credentials...
      </div>
    );
  }

  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  if (!isAdmin) {
    return <AdminAccessGate />;
  }

  return (
    <div className="min-h-screen bg-sand-50/50 flex">
      <AdminSidebarNav pathname={pathname} />
      <main className="flex-1 p-8 sm:p-10 max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
