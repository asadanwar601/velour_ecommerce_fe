'use client';

import React from 'react';
import Link from 'next/link';
import { PackageIcon, GoogleIcon, ShieldIcon } from '@/components/Icons';

interface OrdersGuestGateViewProps {
  onOpenGoogleModal: () => void;
}

export function OrdersGuestGateView({ onOpenGoogleModal }: OrdersGuestGateViewProps) {
  return (
    <div className="max-w-xl mx-auto bg-white border border-sand-200 rounded-sm p-8 sm:p-12 text-center shadow-lg space-y-6">
      <div className="w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mx-auto text-neutral-800">
        <PackageIcon size={32} />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Client Verification</span>
        <h2 className="font-serif text-3xl text-neutral-900">Sign in to View Orders</h2>
        <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
          Access your comprehensive order history, live courier tracking timeline, downloadable invoices, and self-service returns.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenGoogleModal}
        className="w-full py-3.5 px-4 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow-sm"
      >
        <GoogleIcon size={18} />
        <span>Continue with Google</span>
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2 border-t border-sand-200">
        <Link href="/login" className="text-neutral-900 hover:underline font-medium">
          Sign In with Email
        </Link>
        <span>•</span>
        <Link href="/login?mode=signup" className="text-neutral-900 hover:underline">
          Register New Account
        </Link>
      </div>
    </div>
  );
}
