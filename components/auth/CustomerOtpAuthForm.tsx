'use client';

import React from 'react';
import { ArrowRightIcon } from '@/components/Icons';

interface CustomerOtpAuthFormProps {
  otpSent: boolean;
  otpIdentifier: string;
  onIdentifierChange: (val: string) => void;
  otpChannel: 'EMAIL' | 'WHATSAPP';
  onChannelChange: (val: 'EMAIL' | 'WHATSAPP') => void;
  otpCode: string;
  onCodeChange: (val: string) => void;
  otpMessage: string;
  isSubmitting: boolean;
  onRequestOtp: (e: React.FormEvent) => void;
  onVerifyOtp: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function CustomerOtpAuthForm({
  otpSent,
  otpIdentifier,
  onIdentifierChange,
  otpChannel,
  onChannelChange,
  otpCode,
  onCodeChange,
  otpMessage,
  isSubmitting,
  onRequestOtp,
  onVerifyOtp,
  onReset,
}: CustomerOtpAuthFormProps) {
  if (otpSent) {
    return (
      <form onSubmit={onVerifyOtp} className="space-y-4">
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm">
          {otpMessage || `A 6-digit one-time code was sent to ${otpIdentifier}.`}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Enter 6-Digit Passcode</label>
          <input
            type="text"
            required
            maxLength={6}
            value={otpCode}
            onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, ''))}
            placeholder="749210"
            className="w-full tracking-widest text-center font-mono text-xl py-2 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || otpCode.length < 6}
          className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
        >
          {isSubmitting ? 'Authenticating...' : 'Verify & Enter Atelier'}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full text-xs text-neutral-500 hover:text-neutral-900 text-center block pt-1"
        >
          Change identifier or request new code
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onRequestOtp} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Delivery Channel</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChannelChange('EMAIL')}
            className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all ${
              otpChannel === 'EMAIL'
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-sand-50 text-neutral-600 border-sand-200'
            }`}
          >
            Email Passcode
          </button>
          <button
            type="button"
            onClick={() => onChannelChange('WHATSAPP')}
            className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all ${
              otpChannel === 'WHATSAPP'
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-sand-50 text-neutral-600 border-sand-200'
            }`}
          >
            WhatsApp OTP
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">
          {otpChannel === 'EMAIL' ? 'Email Address *' : 'Mobile Number (with country code) *'}
        </label>
        <input
          type={otpChannel === 'EMAIL' ? 'email' : 'tel'}
          required
          value={otpIdentifier}
          onChange={(e) => onIdentifierChange(e.target.value)}
          placeholder={otpChannel === 'EMAIL' ? 'client@velour.com' : '+15551234567'}
          className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !otpIdentifier.trim()}
        className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
      >
        {isSubmitting ? 'Dispatching OTP...' : 'Send Verification Passcode'}
      </button>
    </form>
  );
}
