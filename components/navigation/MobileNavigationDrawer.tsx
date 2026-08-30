'use client';

import React from 'react';
import Link from 'next/link';
import { CloseIcon, HeartIcon, UserIcon, ShieldIcon } from '@/components/Icons';
import { UserProfile } from '@/lib/types';
import ThemeToggle from '../ThemeToggle';

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  navLinks: { href: string; label: string }[];
  isAuthenticated: boolean;
  user: UserProfile | null;
  wishlistCount: number;
}

export function MobileNavigationDrawer({
  isOpen,
  onClose,
  pathname,
  navLinks,
  isAuthenticated,
  user,
  wishlistCount,
}: MobileNavigationDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex animate-fade-in" role="dialog" aria-modal="true">
      <div onClick={onClose} className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />

      <div className="relative w-72 max-w-[80vw] h-full bg-white border-r border-sand-200 p-6 flex flex-col justify-between z-10 text-neutral-900">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-sand-200 pb-4">
            <span className="font-serif text-lg font-bold tracking-widest">VELOUR</span>
            <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-900">
              <CloseIcon size={20} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`text-sm uppercase tracking-widest font-semibold transition-colors ${
                  pathname === link.href ? 'text-gold-700 font-bold' : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={onClose}
              className="text-sm uppercase tracking-widest font-semibold text-neutral-700 hover:text-neutral-900 flex items-center justify-between pt-2 border-t border-sand-200"
            >
              <span className="flex items-center gap-2">
                <HeartIcon size={16} />
                <span>Wishlist</span>
              </span>
              {wishlistCount > 0 && (
                <span className="font-mono text-xs bg-sand-200 px-2 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <div className="pt-2 border-t border-sand-200 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-neutral-600 font-semibold">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>

        <div className="border-t border-sand-200 pt-4 space-y-2 text-xs">
          {isAuthenticated && user ? (
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2 text-neutral-900 font-semibold"
            >
              <UserIcon size={16} />
              <span>{user.firstName || 'Client Profile'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="block w-full py-2.5 bg-neutral-900 text-white text-center uppercase tracking-widest font-semibold rounded-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
