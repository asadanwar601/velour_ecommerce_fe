'use client';

import React from 'react';
import { AboutPageContent } from '@/lib/types';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { AdminMilestonesManager } from './AdminMilestonesManager';
import { SparklesIcon } from '@/components/Icons';

interface AdminAboutCmsFormProps {
  content: AboutPageContent;
  onChange: (field: keyof AboutPageContent, val: any) => void;
  isSaving: boolean;
  onSave: (e: React.FormEvent) => void;
}

export function AdminAboutCmsForm({
  content,
  onChange,
  isSaving,
  onSave,
}: AdminAboutCmsFormProps) {
  return (
    <form onSubmit={onSave} className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-6 text-xs">
      <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
        <SparklesIcon size={18} className="text-gold-700" />
        <h3 className="font-serif text-base text-neutral-900">About Us Editorial & Storytelling CMS</h3>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Eyebrow Subtitle
          </label>
          <input
            type="text"
            value={content.heroSubtitle || ''}
            onChange={(e) => onChange('heroSubtitle', e.target.value)}
            placeholder="e.g. Our Philosophy"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Main Editorial Headline
          </label>
          <input
            type="text"
            required
            value={content.heroTitle || ''}
            onChange={(e) => onChange('heroTitle', e.target.value)}
            placeholder="e.g. Form, Texture, & Permanence"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
      </div>

      {/* Banner Image */}
      <div>
        <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
          Atelier / Studio Banner Image URL
        </label>
        <input
          type="url"
          value={content.bannerImageUrl || ''}
          onChange={(e) => onChange('bannerImageUrl', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
        />
      </div>

      {/* Rich Text Editor for Maison Story */}
      <RichTextEditor
        label="Maison Story & Craftsmanship (Rich Text Editor)"
        value={content.storyHtml || ''}
        onChange={(html) => onChange('storyHtml', html)}
        placeholder="Craft the narrative of your atelier with headings, quotes, and lists..."
        minHeight="260px"
      />

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-sand-200">
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Mission Section Heading
          </label>
          <input
            type="text"
            value={content.missionTitle || ''}
            onChange={(e) => onChange('missionTitle', e.target.value)}
            placeholder="e.g. Artisanal Materiality"
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
        <div>
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
            Mission Summary Text
          </label>
          <textarea
            rows={2}
            value={content.missionText || ''}
            onChange={(e) => onChange('missionText', e.target.value)}
            placeholder="Core summary of garment philosophy..."
            className="w-full p-2.5 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none"
          />
        </div>
      </div>

      {/* Milestones Manager */}
      <AdminMilestonesManager
        milestones={content.milestonesJson || []}
        onChange={(updated) => onChange('milestonesJson', updated)}
      />

      {/* Submit */}
      <div className="pt-4 border-t border-sand-200">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer shadow-sm"
        >
          {isSaving ? 'Publishing About Us Changes...' : 'Save & Publish About Page'}
        </button>
      </div>
    </form>
  );
}
