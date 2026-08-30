'use client';

import React from 'react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types';
import {
  UserIcon,
  PackageIcon,
  MapPinIcon,
  HeartIcon,
  LockIcon,
  LogoutIcon,
  ShieldIcon,
} from '@/components/Icons';

interface AuthenticatedDropdownViewProps {
  user: UserProfile;
  ordersCount: number;
  wishlistCount: number;
  onClose: () => void;
  onLogout: () => void;
}

export function AuthenticatedDropdownView({
  user,
  ordersCount,
  wishlistCount,
  onClose,
  onLogout,
}: AuthenticatedDropdownViewProps) {
  const userInitials = user.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase()
    : 'CL';

  return (
    <div className="text-xs text-[#16130f]">
      {/* User Header */}
      <div className="p-4 border-b border-[#e8e4df] bg-[#f8f6f3] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#16130f] text-white flex items-center justify-center font-serif text-sm font-semibold flex-shrink-0">
          {userInitials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[#16130f] truncate">
            {user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Valued Client'}
          </p>
          <p className="text-[11px] text-[#8a7f72] truncate">{user.email}</p>
        </div>
      </div>

      {/* Menu Links */}
      <div className="py-2 space-y-0.5">
        <Link
          href="/account"
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#f8f6f3] transition-colors"
        >
          <UserIcon size={16} />
          <span>Client Overview</span>
        </Link>
        <Link
          href="/orders"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2 hover:bg-[#f8f6f3] transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <PackageIcon size={16} />
            <span>Orders & Returns</span>
          </span>
          {ordersCount > 0 && (
            <span className="font-mono text-[10px] bg-sand-200 text-neutral-800 px-1.5 py-0.5 rounded-full font-semibold">
              {ordersCount}
            </span>
          )}
        </Link>
        <Link
          href="/account/addresses"
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#f8f6f3] transition-colors"
        >
          <MapPinIcon size={16} />
          <span>Saved Addresses</span>
        </Link>
        <Link
          href="/wishlist"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2 hover:bg-[#f8f6f3] transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <HeartIcon size={16} />
            <span>Atelier Wishlist</span>
          </span>
          {wishlistCount > 0 && (
            <span className="font-mono text-[10px] bg-sand-200 text-neutral-800 px-1.5 py-0.5 rounded-full font-semibold">
              {wishlistCount}
            </span>
          )}
        </Link>
        <Link
          href="/account/security"
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#f8f6f3] transition-colors"
        >
          <LockIcon size={16} />
          <span>Security & 2FA</span>
        </Link>
        {user.isAdmin && (
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-2 text-gold-700 hover:bg-gold-50 transition-colors font-medium"
          >
            <ShieldIcon size={16} />
            <span>Admin Console</span>
          </Link>
        )}
      </div>

      {/* Logout */}
      <div className="p-2 border-t border-[#e8e4df]">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-sm transition-colors text-left"
        >
          <LogoutIcon size={16} />
          <span className="uppercase tracking-wider text-[11px] font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
