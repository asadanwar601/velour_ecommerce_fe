'use client';

import React from 'react';

interface CustomerEmailPasswordFormProps {
  mode: 'signin' | 'register';
  email: string;
  onEmailChange: (val: string) => void;
  password: string;
  onPasswordChange: (val: string) => void;
  firstName: string;
  onFirstNameChange: (val: string) => void;
  lastName: string;
  onLastNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function CustomerEmailPasswordForm({
  mode,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
  phone,
  onPhoneChange,
  isSubmitting,
  onSubmit,
}: CustomerEmailPasswordFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'register' && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => onLastNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Email Address *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your.email@atelier.com"
          className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Password *</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 text-sm text-neutral-900 rounded-sm outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md mt-2"
      >
        {isSubmitting
          ? 'Verifying Credentials...'
          : mode === 'signin'
          ? 'Sign In to Atelier'
          : 'Create Account'}
      </button>
    </form>
  );
}
