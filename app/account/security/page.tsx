'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useToast } from '@/lib/store';
import { LockIcon, ShieldCheckIcon, LogoutIcon } from '@/components/Icons';

export default function AccountSecurityPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.twoFactorEnabled || false);

  if (!user) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast({
        title: 'Security Updated',
        message: 'Your atelier password has been successfully updated.',
        type: 'success',
      });
    }, 500);
  };

  const handleToggle2FA = () => {
    const nextState = !is2FAEnabled;
    setIs2FAEnabled(nextState);
    showToast({
      title: nextState ? 'Two-Factor Enabled' : 'Two-Factor Disabled',
      message: nextState
        ? 'TOTP / SMS 2FA is now active for your account.'
        : 'Two-factor authentication has been disabled.',
      type: nextState ? 'success' : 'info',
    });
  };

  return (
    <div className="space-y-6 text-xs text-neutral-800">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Security & Authentication</h1>
        <p className="text-neutral-500 mt-1">Manage password credentials, multi-factor authentication, and active sessions.</p>
      </div>

      <div className="max-w-xl space-y-6">
        {/* Password Reset */}
        <form onSubmit={handlePasswordSubmit} className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-sand-200 pb-2">
            <LockIcon size={16} />
            <h3 className="font-serif text-base text-neutral-900">Change Password</h3>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">New Password *</label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Confirm New Password *</label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
          >
            {isChangingPassword ? 'Securing...' : 'Update Password'}
          </button>
        </form>

        {/* 2FA Toggle */}
        <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-serif text-base text-neutral-900 flex items-center gap-2">
                <ShieldCheckIcon size={16} className="text-emerald-700" />
                Two-Factor Authentication (2FA)
              </span>
              <p className="text-neutral-500">Require an authenticator code or SMS OTP on every sign in attempt.</p>
            </div>
            <button
              type="button"
              onClick={handleToggle2FA}
              className={`px-4 py-2 uppercase font-semibold tracking-wider rounded-sm transition-all ${
                is2FAEnabled ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-sand-100 text-neutral-700'
              }`}
            >
              {is2FAEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Logout All */}
        <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-neutral-900">Sign Out Everywhere</h4>
            <p className="text-neutral-500">Invalidate all active browser sessions and saved tokens.</p>
          </div>
          <button
            type="button"
            onClick={() => { logout(); router.push('/'); }}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-1.5"
          >
            <LogoutIcon size={14} />
            <span>Sign Out All</span>
          </button>
        </div>
      </div>
    </div>
  );
}
