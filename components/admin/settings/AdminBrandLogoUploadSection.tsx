'use client';

import React from 'react';
import Image from 'next/image';
import { LayersIcon, TrashIcon } from '@/components/Icons';

interface AdminBrandLogoUploadSectionProps {
  logoUrl?: string | null;
  iconUrl?: string | null;
  onLogoUpload: (file: File) => void;
  onIconUpload: (file: File) => void;
  onDeleteLogo: () => void;
  onDeleteIcon: () => void;
}

export function AdminBrandLogoUploadSection({
  logoUrl,
  iconUrl,
  onLogoUpload,
  onIconUpload,
  onDeleteLogo,
  onDeleteIcon,
}: AdminBrandLogoUploadSectionProps) {
  return (
    <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-5 text-xs">
      <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
        <LayersIcon size={18} />
        <h3 className="font-serif text-base text-neutral-900">Brand Visual Assets</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Brand Logo */}
        <div className="space-y-3">
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold">Primary Logo</label>
          <div className="p-4 bg-sand-50 border border-sand-200 rounded-sm flex items-center justify-between">
            <div className="relative w-32 h-12 bg-white rounded-sm border border-sand-200 flex items-center justify-center p-1 overflow-hidden">
              {logoUrl ? (
                <Image src={logoUrl} alt="Logo" fill className="object-contain" />
              ) : (
                <span className="text-[10px] text-neutral-400 font-serif font-bold">VELOUR</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="px-3 py-1.5 bg-white border border-sand-300 hover:border-neutral-900 text-neutral-800 uppercase tracking-wider font-semibold rounded-sm cursor-pointer">
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && onLogoUpload(e.target.files[0])}
                  className="sr-only"
                />
              </label>
              {logoUrl && (
                <button
                  type="button"
                  onClick={onDeleteLogo}
                  className="p-1.5 text-neutral-400 hover:text-red-600"
                  title="Reset to default logo"
                >
                  <TrashIcon size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Favicon / App Icon */}
        <div className="space-y-3">
          <label className="block uppercase tracking-wider text-neutral-600 font-semibold">Favicon / App Icon</label>
          <div className="p-4 bg-sand-50 border border-sand-200 rounded-sm flex items-center justify-between">
            <div className="relative w-12 h-12 bg-white rounded-sm border border-sand-200 flex items-center justify-center p-1 overflow-hidden">
              {iconUrl ? (
                <Image src={iconUrl} alt="Icon" fill className="object-contain" />
              ) : (
                <span className="text-xs font-serif font-bold text-neutral-900">V</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="px-3 py-1.5 bg-white border border-sand-300 hover:border-neutral-900 text-neutral-800 uppercase tracking-wider font-semibold rounded-sm cursor-pointer">
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && onIconUpload(e.target.files[0])}
                  className="sr-only"
                />
              </label>
              {iconUrl && (
                <button
                  type="button"
                  onClick={onDeleteIcon}
                  className="p-1.5 text-neutral-400 hover:text-red-600"
                  title="Reset to default icon"
                >
                  <TrashIcon size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
