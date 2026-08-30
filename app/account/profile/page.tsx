'use client';

import React, { useState } from 'react';
import { useAuth, useToast } from '@/lib/store';

export default function AccountProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthdate: '1992-04-18',
    preference: 'women',
    newsletter: true,
    smsAlerts: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      showToast({
        title: 'Profile Updated',
        message: 'Your personal atelier details have been saved.',
        type: 'success',
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Personal Profile</h1>
        <p className="text-xs text-neutral-500 mt-1">Manage your client dossier and communication preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6 text-xs text-neutral-800">
        <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-4">
          <h3 className="font-serif text-base text-neutral-900 border-b border-sand-200 pb-2">
            Client Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full p-2.5 bg-sand-100 border border-sand-200 rounded-sm text-neutral-500 font-mono outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Contact Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>
        </div>

        <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-3">
          <h3 className="font-serif text-base text-neutral-900 border-b border-sand-200 pb-2">
            Atelier Communication
          </h3>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
              className="accent-neutral-900 w-4 h-4"
            />
            <span>Receive seasonal collection lookbooks and VIP invitations</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.smsAlerts}
              onChange={(e) => setFormData({ ...formData, smsAlerts: e.target.checked })}
              className="accent-neutral-900 w-4 h-4"
            />
            <span>SMS courier updates & delivery confirmations</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all shadow-sm"
        >
          {isSaving ? 'Updating Profile...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
