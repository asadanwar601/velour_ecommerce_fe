'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheckIcon, ShieldIcon } from '@/components/Icons';

export interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mfaType: 'TOTP' | 'PHONE_SMS' | 'PHONE_PROMPT' | 'NONE';
  phoneMasked?: string;
  promptNumber?: number;
}

interface GoogleAccountPickerStepProps {
  accounts: readonly GoogleAccount[];
  onSelectAccount: (account: GoogleAccount) => void;
  showCustomForm: boolean;
  onToggleCustomForm: (show: boolean) => void;
  customEmail: string;
  onCustomEmailChange: (val: string) => void;
  customName: string;
  onCustomNameChange: (val: string) => void;
  onCustomSubmit: (e: React.FormEvent) => void;
}

export function GoogleAccountPickerStep({
  accounts,
  onSelectAccount,
  showCustomForm,
  onToggleCustomForm,
  customEmail,
  onCustomEmailChange,
  customName,
  onCustomNameChange,
  onCustomSubmit,
}: GoogleAccountPickerStepProps) {
  if (showCustomForm) {
    return (
      <form onSubmit={onCustomSubmit} className="space-y-4">
        <div className="text-left space-y-1">
          <label className="text-xs uppercase tracking-wider text-neutral-600 font-medium">Google Email Address</label>
          <input
            type="email"
            required
            placeholder="elena.rostova@gmail.com"
            value={customEmail}
            onChange={(e) => onCustomEmailChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
          />
        </div>
        <div className="text-left space-y-1">
          <label className="text-xs uppercase tracking-wider text-neutral-600 font-medium">Display Name (Optional)</label>
          <input
            type="text"
            placeholder="Elena Rostova"
            value={customName}
            onChange={(e) => onCustomNameChange(e.target.value)}
            className="w-full px-3 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
          />
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-neutral-800 transition-all"
          >
            Authenticate Identity
          </button>
          <button
            type="button"
            onClick={() => onToggleCustomForm(false)}
            className="px-4 py-2.5 border border-sand-300 text-neutral-600 text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-sand-50"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-neutral-500 mb-2">Choose an active account to continue to VELOUR Atelier:</p>
      {accounts.map((account) => (
        <div
          key={account.id}
          onClick={() => onSelectAccount(account)}
          className="p-3 border border-sand-200 hover:border-neutral-900 rounded-sm cursor-pointer transition-all flex items-center justify-between group hover:bg-sand-50/50"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sand-200 border border-sand-300 flex-shrink-0">
              <Image src={account.avatar} alt={account.name} fill className="object-cover" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-gold-700 transition-colors">
                {account.name}
              </p>
              <p className="text-xs text-neutral-500">{account.email}</p>
            </div>
          </div>
          {account.mfaType !== 'NONE' && (
            <span className="flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ShieldCheckIcon size={12} />
              2FA
            </span>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => onToggleCustomForm(true)}
        className="w-full py-2.5 text-xs text-neutral-600 hover:text-neutral-900 border border-dashed border-sand-300 hover:border-neutral-900 rounded-sm transition-all"
      >
        + Use another Google account
      </button>
    </div>
  );
}
