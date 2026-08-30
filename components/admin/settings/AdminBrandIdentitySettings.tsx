'use client';

import React from 'react';
import { BrandSettings } from '@/lib/types';
import { SparklesIcon } from '@/components/Icons';

interface AdminBrandIdentitySettingsProps {
  settings: BrandSettings;
  onChange: (field: keyof BrandSettings, val: string) => void;
  isSaving: boolean;
  onSave: (e: React.FormEvent) => void;
}

export function AdminBrandIdentitySettings({
  settings,
  onChange,
  isSaving,
  onSave,
}: AdminBrandIdentitySettingsProps) {
  return (
    <form onSubmit={onSave} className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-5 text-xs">
      <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
        <SparklesIcon size={18} className="text-gold-700" />
        <h3 className="font-serif text-base text-neutral-900">Brand Dossier & Metadata</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Maison Brand Name</label>
          <input
            type="text"
            required
            value={settings.brandName}
            onChange={(e) => onChange('brandName', e.target.value)}
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Tagline</label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) => onChange('tagline', e.target.value)}
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Brand Description</label>
        <textarea
          rows={2}
          value={settings.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Concierge Email</label>
          <input
            type="email"
            value={settings.supportEmail || ''}
            onChange={(e) => onChange('supportEmail', e.target.value)}
            placeholder="care@velour.com"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Concierge Phone</label>
          <input
            type="text"
            value={settings.supportPhone || ''}
            onChange={(e) => onChange('supportPhone', e.target.value)}
            placeholder="+1 (800) 555-0199"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
      </div>

      {/* Social & Web Presence */}
      <div className="pt-2 border-t border-sand-200">
        <h4 className="font-serif text-sm text-neutral-900 mb-3">Social & Web Presence</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Instagram URL</label>
            <input
              type="url"
              value={settings.instagramUrl || ''}
              onChange={(e) => onChange('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/velour.atelier"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Facebook URL</label>
            <input
              type="url"
              value={settings.facebookUrl || ''}
              onChange={(e) => onChange('facebookUrl', e.target.value)}
              placeholder="https://facebook.com/velour.atelier"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">YouTube URL</label>
            <input
              type="url"
              value={settings.youtubeUrl || ''}
              onChange={(e) => onChange('youtubeUrl', e.target.value)}
              placeholder="https://youtube.com/@velour.atelier"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Official Website</label>
            <input
              type="url"
              value={settings.websiteUrl || ''}
              onChange={(e) => onChange('websiteUrl', e.target.value)}
              placeholder="https://velour.com"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer"
        >
          {isSaving ? 'Saving Dossier...' : 'Save Brand Settings'}
        </button>
      </div>
    </form>
  );
}
