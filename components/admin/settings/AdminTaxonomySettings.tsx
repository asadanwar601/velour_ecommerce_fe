'use client';

import React, { useState } from 'react';
import { CategoryConfig } from '@/lib/types';
import { TagIcon, PlusIcon, TrashIcon } from '@/components/Icons';

interface AdminTaxonomySettingsProps {
  categories: CategoryConfig[];
  sizes: string[];
  tags: string[];
  onCreateCategory: (name: string, desc: string) => void;
  onDeleteCategory: (id: string) => void;
  onCreateSubcategory: (catId: string, name: string) => void;
  onDeleteSubcategory: (catId: string, subName: string) => void;
  onAddSize: (size: string) => void;
  onDeleteSize: (size: string) => void;
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

export function AdminTaxonomySettings({
  categories,
  sizes,
  tags,
  onCreateCategory,
  onDeleteCategory,
  onCreateSubcategory,
  onDeleteSubcategory,
  onAddSize,
  onDeleteSize,
  onAddTag,
  onDeleteTag,
}: AdminTaxonomySettingsProps) {
  const [newCatName, setNewCatName] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || '');
  const [newSubcatName, setNewSubcatName] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newTag, setNewTag] = useState('');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
      {/* Categories & Subcategories */}
      <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-4">
        <h3 className="font-serif text-base text-neutral-900 border-b border-sand-200 pb-2">
          Category Hierarchy
        </h3>

        {/* Add Category Form */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category Name..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {
              if (newCatName.trim()) {
                onCreateCategory(newCatName.trim(), '');
                setNewCatName('');
              }
            }}
            className="px-3.5 py-2 bg-neutral-900 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1"
          >
            <PlusIcon size={12} />
            Add
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <div key={cat.id} className="p-3 bg-sand-50 border border-sand-200 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-900">{cat.name}</span>
                <button
                  type="button"
                  onClick={() => onDeleteCategory(cat.id)}
                  className="text-neutral-400 hover:text-red-600"
                >
                  <TrashIcon size={12} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pl-2">
                {cat.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-sand-200 rounded-sm text-[11px]"
                  >
                    <span>{sub}</span>
                    <button
                      type="button"
                      onClick={() => onDeleteSubcategory(cat.id, sub)}
                      className="text-neutral-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizing & Tags Configuration */}
      <div className="space-y-6">
        {/* Custom Sizes */}
        <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-4">
          <h3 className="font-serif text-base text-neutral-900 border-b border-sand-200 pb-2">
            Available Sizes
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. XXL, Petite, 42..."
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              className="flex-1 p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none uppercase"
            />
            <button
              type="button"
              onClick={() => {
                if (newSize.trim()) {
                  onAddSize(newSize.trim().toUpperCase());
                  setNewSize('');
                }
              }}
              className="px-3.5 py-2 bg-neutral-900 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1"
            >
              <PlusIcon size={12} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-sand-100 border border-sand-300 rounded-sm flex items-center gap-1.5 font-mono font-medium">
                <span>{s}</span>
                <button type="button" onClick={() => onDeleteSize(s)} className="text-neutral-400 hover:text-red-600 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Custom Marketing Tags */}
        <div className="bg-white border border-sand-200 p-6 rounded-sm shadow-sm space-y-4">
          <h3 className="font-serif text-base text-neutral-900 border-b border-sand-200 pb-2">
            Marketing Tags
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Sustainable Silk, Runaway Choice..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (newTag.trim()) {
                  onAddTag(newTag.trim());
                  setNewTag('');
                }
              }}
              className="px-3.5 py-2 bg-neutral-900 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1"
            >
              <PlusIcon size={12} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="px-2.5 py-1 bg-sand-100 border border-sand-300 rounded-sm flex items-center gap-1.5">
                <span>{t}</span>
                <button type="button" onClick={() => onDeleteTag(t)} className="text-neutral-400 hover:text-red-600 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
