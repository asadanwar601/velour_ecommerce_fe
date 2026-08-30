'use client';

import React, { useState, useEffect } from 'react';
import { getAvailableTags, addCustomTag, deleteCustomTag } from '@/lib/api';
import { PlusIcon, TrashIcon, CheckIcon, TagIcon } from '@/components/Icons';

export function AdminTagsTaxonomySection() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadTags = async () => {
    try {
      setIsLoading(true);
      const data = await getAvailableTags();
      setTags(data);
    } catch {
      console.error('Failed to load tags');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const clean = newTag.trim();
    if (tags.some((t) => t.toLowerCase() === clean.toLowerCase())) {
      return showFeedback('Tag already exists');
    }
    try {
      const updated = await addCustomTag(clean);
      setTags(updated);
      setNewTag('');
      showFeedback(`Marketing tag "${clean}" registered`);
    } catch {
      showFeedback('Failed to add tag');
    }
  };

  const handleDelete = async (tagToDelete: string) => {
    try {
      const updated = await deleteCustomTag(tagToDelete);
      setTags(updated);
      showFeedback(`Tag "${tagToDelete}" removed`);
    } catch {
      showFeedback('Failed to remove tag');
    }
  };

  return (
    <div className="bg-white border border-sand-200 p-6 rounded-sm space-y-6 text-xs shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-200 pb-3">
        <div>
          <h3 className="font-serif text-base text-neutral-900">Marketing, Curation & Materiality Tags</h3>
          <p className="text-[11px] text-neutral-500">
            Define promotional tags (e.g. Sustainable, Cashmere, Bespoke) applied across catalogue filters.
          </p>
        </div>
        <span className="font-mono text-neutral-400 text-[11px]">{tags.length} active tags</span>
      </div>

      {feedback && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-sm flex items-center gap-1.5">
          <CheckIcon size={14} />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add Tag Form */}
      <form onSubmit={handleAdd} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="New marketing tag (e.g. Rare Cashmere)..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 p-2 bg-sand-50 border border-sand-300 focus:border-neutral-900 rounded-sm outline-none font-medium"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1 transition-all cursor-pointer"
        >
          <PlusIcon size={12} />
          Add Tag
        </button>
      </form>

      {/* Tags Chips Grid */}
      {isLoading ? (
        <div className="py-6 text-neutral-400">Loading taxonomy tags...</div>
      ) : (
        <div className="flex flex-wrap gap-2.5 pt-2">
          {tags.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 px-3 py-1.5 bg-gold-50/50 border border-gold-200 text-neutral-900 rounded-sm group hover:border-gold-400 transition-colors shadow-xs"
            >
              <TagIcon size={12} className="text-gold-700" />
              <span className="font-semibold">{t}</span>
              <button
                type="button"
                onClick={() => handleDelete(t)}
                className="text-neutral-400 hover:text-red-600 transition-colors p-0.5 ml-1"
                title={`Delete tag ${t}`}
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
