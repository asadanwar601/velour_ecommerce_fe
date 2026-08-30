'use client';

import React, { useState, useEffect } from 'react';
import { getAvailableSizes, addCustomSize, deleteCustomSize } from '@/lib/api';
import { PlusIcon, TrashIcon, CheckIcon } from '@/components/Icons';

export function AdminSizesTaxonomySection() {
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadSizes = async () => {
    try {
      setIsLoading(true);
      const data = await getAvailableSizes();
      setSizes(data);
    } catch {
      console.error('Failed to load sizes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSizes();
  }, []);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSize.trim()) return;
    const clean = newSize.trim().toUpperCase();
    if (sizes.includes(clean)) return showFeedback('Size already exists');
    try {
      const updated = await addCustomSize(clean);
      setSizes(updated);
      setNewSize('');
      showFeedback(`Size "${clean}" registered`);
    } catch {
      showFeedback('Failed to add size');
    }
  };

  const handleDelete = async (sizeToDelete: string) => {
    try {
      const updated = await deleteCustomSize(sizeToDelete);
      setSizes(updated);
      showFeedback(`Size "${sizeToDelete}" removed`);
    } catch {
      showFeedback('Failed to remove size');
    }
  };

  return (
    <div className="bg-white border border-sand-200 p-6 rounded-sm space-y-6 text-xs shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-200 pb-3">
        <div>
          <h3 className="font-serif text-base text-neutral-900">Garment Sizing Matrix & Taxonomy</h3>
          <p className="text-[11px] text-neutral-500">
            Define standardized sizing options across Atelier collections (Alphabetical & Numeric).
          </p>
        </div>
        <span className="font-mono text-neutral-400 text-[11px]">{sizes.length} active sizes</span>
      </div>

      {feedback && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-sm flex items-center gap-1.5">
          <CheckIcon size={14} />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add Size Input Form */}
      <form onSubmit={handleAdd} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="New size label (e.g. 46 or 3XL)..."
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          className="flex-1 p-2 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none uppercase font-mono"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1 transition-all cursor-pointer"
        >
          <PlusIcon size={12} />
          Add Size
        </button>
      </form>

      {/* Sizing Chips Grid */}
      {isLoading ? (
        <div className="py-6 text-neutral-400">Loading sizing matrix...</div>
      ) : (
        <div className="flex flex-wrap gap-2.5 pt-2">
          {sizes.map((s) => (
            <div
              key={s}
              className="flex items-center gap-2 px-3 py-1.5 bg-sand-50 border border-sand-300 rounded-sm group hover:border-neutral-900 transition-colors shadow-xs"
            >
              <span className="font-mono font-bold text-neutral-900">{s}</span>
              <button
                type="button"
                onClick={() => handleDelete(s)}
                className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                title={`Delete size ${s}`}
              >
                <TrashIcon size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
