'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, useWishlist, useOrders } from '@/lib/store';
import { UserIcon } from '@/components/Icons';
import { AccountSidebarNav } from '@/components/account/AccountSidebarNav';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoadingAuth, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { orders } = useOrders();

  const handleLogout = async () => {
    logout();
    router.push('/');
  };

  if (isLoadingAuth) {
    return (
      <div className="py-24 text-center text-xs text-neutral-500">
        Authenticating client profile...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[80vh] bg-sand-50/50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-sand-200 rounded-sm p-8 text-center shadow-lg space-y-6">
          <div className="w-14 h-14 bg-sand-100 rounded-full flex items-center justify-center mx-auto text-neutral-800">
            <UserIcon size={28} />
          </div>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Client Portal</span>
            <h2 className="font-serif text-2xl text-neutral-900">Sign In Required</h2>
            <p className="text-xs text-neutral-500">Please sign in to access your atelier profile, orders, and addresses.</p>
          </div>
          <Link
            href="/login"
            className="block w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <AccountSidebarNav
              user={user}
              pathname={pathname}
              ordersCount={orders.length}
              addressesCount={(user.addresses || []).length}
              wishlistCount={wishlistCount}
              onLogout={handleLogout}
            />
          </div>

          <main className="lg:col-span-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
