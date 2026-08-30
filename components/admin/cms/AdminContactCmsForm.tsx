'use client';

import React from 'react';
import { ContactPageContent } from '@/lib/types';
import { AdminContactStepsManager } from './AdminContactStepsManager';
import { MapPinIcon } from '@/components/Icons';

interface AdminContactCmsFormProps {
  content: ContactPageContent;
  onChange: (field: keyof ContactPageContent, val: any) => void;
  isSaving: boolean;
  onSave: (e: React.FormEvent) => void;
}

export function AdminContactCmsForm({
  content,
  onChange,
  isSaving,
  onSave,
}: AdminContactCmsFormProps) {
  return (
    <form onSubmit={onSave} className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-6 text-xs">
      <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
        <MapPinIcon size={18} className="text-gold-700" />
        <h3 className="font-serif text-base text-neutral-900">Contact Us & Concierge CMS</h3>
      </div>

      {/* Header Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Eyebrow Subtitle
          </label>
          <input
            type="text"
            value={content.subtitle || ''}
            onChange={(e) => onChange('subtitle', e.target.value)}
            placeholder="e.g. Client Care"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Main Headline
          </label>
          <input
            type="text"
            required
            value={content.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g. How May We Assist You?"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
          Concierge Introduction Blurb
        </label>
        <textarea
          rows={2}
          value={content.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Guidance on operating hours, appointments, and styling support..."
          className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
        />
      </div>

      {/* Concierge Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-sand-200">
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Concierge Email
          </label>
          <input
            type="email"
            value={content.supportEmail || ''}
            onChange={(e) => onChange('supportEmail', e.target.value)}
            placeholder="concierge@velour.com"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Concierge Phone
          </label>
          <input
            type="text"
            value={content.supportPhone || ''}
            onChange={(e) => onChange('supportPhone', e.target.value)}
            placeholder="+1 (800) 555-0198"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Working / Operating Hours
          </label>
          <input
            type="text"
            value={content.workingHours || ''}
            onChange={(e) => onChange('workingHours', e.target.value)}
            placeholder="Mon – Fri: 9:00 AM – 6:00 PM EST"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
      </div>

      {/* Location & Map */}
      <div className="pt-2 border-t border-sand-200 space-y-4">
        <h4 className="font-serif text-sm text-neutral-900">Flagship Atelier Location & Live Map</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              value={content.addressLine1 || ''}
              onChange={(e) => onChange('addressLine1', e.target.value)}
              placeholder="482 Mercer Street"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
            />
          </div>
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              value={content.addressLine2 || ''}
              onChange={(e) => onChange('addressLine2', e.target.value)}
              placeholder="SoHo, New York, NY 10013"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Google Maps Embed URL
          </label>
          <input
            type="url"
            value={content.mapEmbedUrl || ''}
            onChange={(e) => onChange('mapEmbedUrl', e.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Paste Google Maps embed iframe src URL. It will automatically render as an interactive map on the contact page.
          </span>
        </div>

        {content.mapEmbedUrl && (
          <div className="border border-sand-300 rounded-sm overflow-hidden h-44 w-full shadow-inner bg-sand-100">
            <iframe
              src={content.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Live Atelier Map Preview"
            />
          </div>
        )}
      </div>

      {/* Custom Steps / Protocol Manager */}
      <AdminContactStepsManager
        steps={content.contactStepsJson || []}
        onChange={(steps) => onChange('contactStepsJson', steps)}
      />

      {/* Submit */}
      <div className="pt-4 border-t border-sand-200">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer shadow-sm"
        >
          {isSaving ? 'Publishing Contact Us Changes...' : 'Save & Publish Contact Page'}
        </button>
      </div>
    </form>
  );
}
