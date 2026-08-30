'use client';

import React from 'react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types';
import { UserIcon, ArrowRightIcon } from '@/components/Icons';

interface AuthenticatedSessionCardProps {
  user: UserProfile;
  onLogout: () => void;
}

export function AuthenticatedSessionCard({ user, onLogout }: AuthenticatedSessionCardProps) {
  return (
    <div className="bg-white border border-sand-200 p-8 rounded-sm shadow-lg text-center space-y-6">
      <div className="w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mx-auto text-neutral-800">
        <UserIcon size={32} />
      </div>
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold block">Active Session</span>
        <h2 className="font-serif text-2xl text-neutral-900 mt-1">
          Welcome, {user.firstName || 'Client'}
        </h2>
        <p className="text-xs text-neutral-500 mt-1">{user.email}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href="/account"
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          View Client Profile
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="px-6 py-3 border border-sand-300 hover:border-neutral-900 text-neutral-700 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
