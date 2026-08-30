'use client';

import React from 'react';
import Image from 'next/image';
import { Product, CategoryConfig } from '@/lib/types';
import { CloseIcon, TrashIcon, SparklesIcon } from '@/components/Icons';

interface AdminProductFormModalProps {
  isOpen: boolean;
  isEditing: boolean;
  categories: CategoryConfig[];
  availableSizes: string[];
  availableTags: string[];
  formData: any;
  onChange: (field: string, val: any) => void;
  onToggleSize: (size: string) => void;
  onToggleTag: (tag: string) => void;
  onAddImage: (url: string) => void;
  onRemoveImage: (idx: number) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function AdminProductFormModal({
  isOpen,
  isEditing,
  categories,
  availableSizes,
  availableTags,
  formData,
  onChange,
  onToggleSize,
  onToggleTag,
  onAddImage,
  onRemoveImage,
  isSubmitting,
  onSubmit,
  onClose,
}: AdminProductFormModalProps) {
  if (!isOpen) return null;

  const currentCategory = categories.find((c) => c.id === formData.category);
  const subcategories = currentCategory?.subcategories || ['Outerwear', 'Tailoring', 'Knitwear', 'Accessories'];

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-sand-200 rounded-sm shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <SparklesIcon size={18} className="text-gold-700" />
            <h3 className="font-serif text-xl text-neutral-900">
              {isEditing ? 'Edit Garment Details' : 'Introduce New Atelier Garment'}
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Garment Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="e.g. Double-Breasted Wool Coat"
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Price ($) *</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => onChange('price', parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-mono"
                />
              </div>
              <div>
                <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Initial Stock</label>
                <input
                  type="number"
                  min={0}
                  value={formData.initialStock}
                  onChange={(e) => onChange('initialStock', parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-medium capitalize"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Subcategory</label>
              <select
                value={formData.subcategory}
                onChange={(e) => onChange('subcategory', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-medium"
              >
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Garment Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          {/* Sizes */}
          <div className="space-y-1">
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold">Available Sizing</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onToggleSize(size)}
                  className={`px-3 py-1.5 rounded-sm border uppercase font-mono font-medium transition-all ${
                    formData.sizes.includes(size)
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-sand-50 text-neutral-600 border-sand-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-2">
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold">Gallery Images</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                id="modalImageUrlInput"
                className="flex-1 p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('modalImageUrlInput') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    onAddImage(input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-3.5 py-2 bg-sand-200 hover:bg-sand-300 font-semibold uppercase tracking-wider rounded-sm"
              >
                Add URL
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.images.map((img: string, idx: number) => (
                <div key={idx} className="relative w-16 h-20 bg-sand-100 rounded-sm overflow-hidden border border-sand-200 group">
                  <Image src={img} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isSubmitting ? 'Saving Garment...' : isEditing ? 'Update Garment' : 'Create Garment'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3.5 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
