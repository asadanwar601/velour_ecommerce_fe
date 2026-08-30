'use client';

import React from 'react';
import Link from 'next/link';
import { LockIcon } from '@/components/Icons';

export function AdminAccessGate() {
  return (
    <div className="min-h-screen bg-sand-50/50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-sand-200 p-8 rounded-sm text-center space-y-6 shadow-xl">
        <div className="w-14 h-14 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto border border-red-200">
          <LockIcon size={28} />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-red-700 font-bold block">Access Restricted</span>
          <h2 className="font-serif text-2xl text-neutral-900">Administrator Credentials Required</h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            This section is restricted to authorized VELOUR maison managers, executive directors, and fulfillment staff.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/login"
            className="block w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
          >
            Sign In with Staff Account
          </Link>
        </div>
      </div>
    </div>
  );
}
