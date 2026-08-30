'use client';

import React from 'react';
import Link from 'next/link';
import { GoogleIcon } from '@/components/Icons';

interface UnauthenticatedDropdownViewProps {
  onClose: () => void;
  onOpenGoogleModal: () => void;
}

export function UnauthenticatedDropdownView({
  onClose,
  onOpenGoogleModal,
}: UnauthenticatedDropdownViewProps) {
  return (
    <div className="p-5 space-y-4 text-center">
      <div>
        <h3 className="font-serif text-base text-[#16130f]">Client Portal</h3>
        <p className="text-xs text-[#8a7f72] mt-1">Sign in to manage orders, addresses, and wishlist.</p>
      </div>

      <button
        type="button"
        onClick={() => {
          onClose();
          onOpenGoogleModal();
        }}
        className="w-full py-2.5 px-4 bg-white border border-[#e8e4df] hover:border-[#16130f] text-[#16130f] text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow-sm"
      >
        <GoogleIcon size={16} />
        <span>Continue with Google</span>
      </button>

      <div className="flex items-center gap-2 justify-center text-xs pt-1 border-t border-[#e8e4df]">
        <Link
          href="/login"
          onClick={onClose}
          className="text-[#16130f] hover:underline font-medium uppercase tracking-wider text-[11px]"
        >
          Sign In
        </Link>
        <span className="text-[#8a7f72]">•</span>
        <Link
          href="/login?mode=signup"
          onClick={onClose}
          className="text-[#8a7f72] hover:text-[#16130f] uppercase tracking-wider text-[11px]"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
