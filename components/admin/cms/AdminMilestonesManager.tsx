'use client';

import React, { useState } from 'react';
import { CompanyMilestone } from '@/lib/types';
import { PlusIcon, TrashIcon } from '@/components/Icons';

interface AdminMilestonesManagerProps {
  milestones: CompanyMilestone[];
  onChange: (milestones: CompanyMilestone[]) => void;
}

export function AdminMilestonesManager({
  milestones = [],
  onChange,
}: AdminMilestonesManagerProps) {
  const [newYear, setNewYear] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddMilestone = () => {
    if (!newYear.trim() || !newTitle.trim()) return;
    const updated = [
      ...milestones,
      { year: newYear.trim(), title: newTitle.trim(), description: newDesc.trim() },
    ];
    onChange(updated);
    setNewYear('');
    setNewTitle('');
    setNewDesc('');
  };

  const handleRemoveMilestone = (index: number) => {
    const updated = milestones.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4 text-xs pt-4 border-t border-sand-200">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-sm text-neutral-900">Chronological Milestones & Timeline</h4>
        <span className="text-[11px] text-neutral-500 font-mono">({milestones.length} milestones)</span>
      </div>

      {/* Add New Milestone */}
      <div className="p-3 bg-sand-50 border border-sand-200 rounded-sm space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Year (e.g. 2021)"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            className="p-2 bg-white border border-sand-300 rounded-sm outline-none"
          />
          <input
            type="text"
            placeholder="Milestone Title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="sm:col-span-2 p-2 bg-white border border-sand-300 rounded-sm outline-none"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Detailed description of achievement..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="flex-1 p-2 bg-white border border-sand-300 rounded-sm outline-none"
          />
          <button
            type="button"
            onClick={handleAddMilestone}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1 transition-all"
          >
            <PlusIcon size={12} />
            Add
          </button>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-2">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="p-3 bg-white border border-sand-200 rounded-sm flex items-start justify-between gap-3 shadow-sm"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-gold-700 bg-sand-100 px-2 py-0.5 rounded-sm">
                  {m.year}
                </span>
                <span className="font-semibold text-neutral-900 truncate">{m.title}</span>
              </div>
              <p className="text-neutral-600 text-[11px] leading-relaxed">{m.description}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveMilestone(idx)}
              className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
              title="Delete milestone"
            >
              <TrashIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
