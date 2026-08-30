'use client';

import React, { useState } from 'react';
import { inviteAdminUser } from '@/lib/api';
import { XIcon, UserIcon, ShieldIcon } from '@/components/Icons';

interface AdminInviteAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function AdminInviteAdminModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminInviteAdminModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please fill in all mandatory fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const res = await inviteAdminUser({
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || undefined,
      });
      onSuccess(res.message || `Administrator ${email} registered.`);
      onClose();
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhone('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create administrator user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-sand-300 rounded-sm shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <ShieldIcon size={18} className="text-gold-700" />
            <h3 className="font-serif text-base text-neutral-900">Invite Atelier Administrator</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
          >
            <XIcon size={16} />
          </button>
        </div>

        <p className="text-[11px] text-neutral-500">
          Create administrative credentials. Note: Regular customer accounts must self-register via the storefront.
        </p>

        {errorMessage && (
          <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-600 font-semibold mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marcus"
                className="w-full p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-neutral-600 font-semibold mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Vance"
                className="w-full p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-600 font-semibold mb-1">Admin Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="administrator@velour.com"
              className="w-full p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-600 font-semibold mb-1">Initial Password *</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters..."
              className="w-full p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-neutral-600 font-semibold mb-1">Phone Line (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="pt-3 border-t border-sand-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-sand-300 hover:bg-sand-50 text-neutral-700 font-semibold rounded-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Create Administrator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
