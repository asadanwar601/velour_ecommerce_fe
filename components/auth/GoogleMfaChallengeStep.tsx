'use client';

import React from 'react';
import { GoogleAccount } from './GoogleAccountPickerStep';
import { LockIcon, ShieldCheckIcon } from '@/components/Icons';

interface GoogleMfaChallengeStepProps {
  selectedAccount: GoogleAccount;
  activeMfaMethod: 'TOTP' | 'PHONE_SMS' | 'PHONE_PROMPT';
  onMfaMethodChange: (method: 'TOTP' | 'PHONE_SMS' | 'PHONE_PROMPT') => void;
  mfaCode: string;
  onMfaCodeChange: (code: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function GoogleMfaChallengeStep({
  selectedAccount,
  activeMfaMethod,
  onMfaMethodChange,
  mfaCode,
  onMfaCodeChange,
  onSubmit,
  onBack,
}: GoogleMfaChallengeStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 text-left">
      <div className="bg-sand-50 border border-sand-200 p-3 rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-serif text-xs font-semibold">
            {selectedAccount.name[0]}
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-900">{selectedAccount.name}</p>
            <p className="text-[11px] text-neutral-500">{selectedAccount.email}</p>
          </div>
        </div>
        <button type="button" onClick={onBack} className="text-xs text-gold-700 hover:underline">
          Change
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 py-2 px-3 rounded-sm text-center">
        <ShieldCheckIcon size={16} />
        <span>2-Step Verification Challenge</span>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-medium text-neutral-700 block">
          Enter the 6-digit verification code from Google Authenticator or SMS:
        </label>
        <div className="flex items-center gap-2">
          <LockIcon size={16} className="text-neutral-400" />
          <input
            type="text"
            required
            maxLength={6}
            value={mfaCode}
            onChange={(e) => onMfaCodeChange(e.target.value.replace(/\D/g, ''))}
            placeholder="749210"
            className="w-full tracking-widest text-center font-mono text-xl py-2 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
        <p className="text-[11px] text-neutral-400 text-center">
          Test sandbox pre-filled with demo OTP. Click verify to authenticate.
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          Verify & Sign In
        </button>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-3 border border-sand-300 text-neutral-600 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
        >
          Back
        </button>
      </div>
    </form>
  );
}
