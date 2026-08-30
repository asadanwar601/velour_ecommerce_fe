'use client';

import React, { useState } from 'react';
import { CategoryConfig } from '@/lib/types';
import { EditIcon, TrashIcon, PlusIcon } from '@/components/Icons';

type AdminCategoryItem = CategoryConfig & { productCount?: number };

interface AdminCategoryCardProps {
  category: AdminCategoryItem;
  onEdit: (cat: CategoryConfig) => void;
  onDelete: (id: string) => void;
  onAddSubcategory: (catId: string, name: string) => void;
  onDeleteSubcategory: (catId: string, sub: string) => void;
}

export function AdminCategoryCard({
  category,
  onEdit,
  onDelete,
  onAddSubcategory,
  onDeleteSubcategory,
}: AdminCategoryCardProps) {
  const [subInput, setSubInput] = useState('');

  const handleAddSub = () => {
    if (subInput.trim()) {
      onAddSubcategory(category.id, subInput.trim());
      setSubInput('');
    }
  };

  return (
    <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm flex flex-col justify-between space-y-4 text-xs">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-sand-200 pb-2">
          <div>
            <h3 className="font-serif text-base font-bold text-neutral-900">{category.name}</h3>
            <p className="text-[11px] text-neutral-400 font-mono">slug: {category.slug}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit(category)} className="p-1 text-neutral-500 hover:text-neutral-900">
              <EditIcon size={14} />
            </button>
            <button onClick={() => onDelete(category.id)} className="p-1 text-neutral-500 hover:text-red-600">
              <TrashIcon size={14} />
            </button>
          </div>
        </div>

        {category.description && (
          <p className="text-neutral-600">{category.description}</p>
        )}

        <div className="space-y-1.5 pt-1">
          <span className="uppercase tracking-wider font-semibold text-neutral-500 text-[10px]">Subcategories:</span>
          <div className="flex flex-wrap gap-1.5">
            {category.subcategories.map((sub) => (
              <span key={sub} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sand-50 border border-sand-200 rounded-sm">
                <span className="font-medium text-neutral-800">{sub}</span>
                <button
                  type="button"
                  onClick={() => onDeleteSubcategory(category.id, sub)}
                  className="text-neutral-400 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-sand-200 flex gap-2">
        <input
          type="text"
          placeholder="New subcategory..."
          value={subInput}
          onChange={(e) => setSubInput(e.target.value)}
          className="flex-1 p-2 bg-sand-50 border border-sand-300 rounded-sm outline-none text-xs"
        />
        <button
          type="button"
          onClick={handleAddSub}
          className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1"
        >
          <PlusIcon size={12} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
