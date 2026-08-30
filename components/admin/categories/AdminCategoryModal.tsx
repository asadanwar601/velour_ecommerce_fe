'use client';

import React from 'react';
import { CategoryConfig } from '@/lib/types';
import { CloseIcon, LayersIcon } from '@/components/Icons';

interface AdminCategoryModalProps {
  isOpen: boolean;
  isEditing: boolean;
  name: string;
  onNameChange: (val: string) => void;
  slug: string;
  onSlugChange: (val: string) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  isSaving: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export function AdminCategoryModal({
  isOpen,
  isEditing,
  name,
  onNameChange,
  slug,
  onSlugChange,
  description,
  onDescriptionChange,
  isSaving,
  onSubmit,
  onClose,
}: AdminCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 space-y-5 text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <LayersIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">
              {isEditing ? 'Edit Category' : 'Create Category'}
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Category Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="e.g. evening-wear"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-mono"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="button"
              disabled={isSaving}
              onClick={onSubmit}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isSaving ? 'Saving...' : 'Save Category'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
