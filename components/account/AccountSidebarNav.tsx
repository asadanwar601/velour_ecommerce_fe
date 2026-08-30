'use client';

import React from 'react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types';
import {
  UserIcon,
  PackageIcon,
  MapPinIcon,
  LockIcon,
  HeartIcon,
  LogoutIcon,
  ShieldIcon,
} from '@/components/Icons';

interface AccountSidebarNavProps {
  user: UserProfile;
  pathname: string;
  ordersCount: number;
  addressesCount: number;
  wishlistCount: number;
  onLogout: () => void;
}

export function AccountSidebarNav({
  user,
  pathname,
  ordersCount,
  addressesCount,
  wishlistCount,
  onLogout,
}: AccountSidebarNavProps) {
  const userInitials = user.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase()
    : 'CL';

  const navItems = [
    { href: '/account', label: 'Overview', icon: UserIcon },
    { href: '/account/profile', label: 'Personal Profile', icon: UserIcon },
    { href: '/orders', label: 'Orders & Tracking', icon: PackageIcon, count: ordersCount },
    { href: '/account/addresses', label: 'Saved Addresses', icon: MapPinIcon, count: addressesCount },
    { href: '/account/security', label: 'Security & 2FA', icon: LockIcon },
    { href: '/wishlist', label: 'Wishlist', icon: HeartIcon, count: wishlistCount },
  ];

  return (
    <aside className="bg-white border border-sand-200 rounded-sm p-6 shadow-sm space-y-6 text-xs text-neutral-800">
      <div className="flex items-center gap-3 border-b border-sand-200 pb-4">
        <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-serif text-base font-bold flex-shrink-0">
          {userInitials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-neutral-900 truncate">
            {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Valued Client'}
          </p>
          <p className="text-[11px] text-neutral-400 truncate font-mono">{user.email}</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm transition-all ${
                isActive
                  ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                  : 'text-neutral-700 hover:bg-sand-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} />
                <span>{item.label}</span>
              </span>
              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-sand-200 text-neutral-800'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}

        {user.isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-gold-700 hover:bg-gold-50 font-semibold rounded-sm transition-colors mt-2"
          >
            <ShieldIcon size={16} />
            <span>Admin Console</span>
          </Link>
        )}
      </nav>

      <div className="pt-3 border-t border-sand-200">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-sm transition-colors"
        >
          <LogoutIcon size={16} />
          <span className="uppercase tracking-wider font-semibold text-[11px]">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
