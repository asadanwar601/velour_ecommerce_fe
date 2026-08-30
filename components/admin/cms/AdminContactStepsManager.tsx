'use client';

import React, { useState } from 'react';
import { ContactStep } from '@/lib/types';
import { PlusIcon, TrashIcon } from '@/components/Icons';

interface AdminContactStepsManagerProps {
  steps: ContactStep[];
  onChange: (steps: ContactStep[]) => void;
}

export function AdminContactStepsManager({
  steps = [],
  onChange,
}: AdminContactStepsManagerProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddStep = () => {
    if (!newTitle.trim()) return;
    const nextNumber = steps.length > 0 ? Math.max(...steps.map((s) => s.stepNumber)) + 1 : 1;
    const updated = [
      ...steps,
      { stepNumber: nextNumber, title: newTitle.trim(), description: newDesc.trim() },
    ];
    onChange(updated);
    setNewTitle('');
    setNewDesc('');
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, stepNumber: i + 1 }));
    onChange(updated);
  };

  return (
    <div className="space-y-4 text-xs pt-4 border-t border-sand-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-serif text-sm text-neutral-900">Custom Inquiry Steps & Protocol</h4>
          <p className="text-[11px] text-neutral-500">Step-by-step guidance shown to clients on the Contact page.</p>
        </div>
        <span className="text-[11px] text-neutral-500 font-mono">({steps.length} steps)</span>
      </div>

      {/* Add New Step Form */}
      <div className="p-3 bg-sand-50 border border-sand-200 rounded-sm space-y-2">
        <input
          type="text"
          placeholder="Step Title (e.g. 1. Submit your bespoke inquiry)..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 bg-white border border-sand-300 rounded-sm outline-none"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Detailed instruction or expectation..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="flex-1 p-2 bg-white border border-sand-300 rounded-sm outline-none"
          />
          <button
            type="button"
            onClick={handleAddStep}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1 transition-all"
          >
            <PlusIcon size={12} />
            Add Step
          </button>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3 bg-white border border-sand-200 rounded-sm flex items-start justify-between gap-3 shadow-sm"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                {step.stepNumber}
              </span>
              <div className="space-y-0.5 min-w-0">
                <span className="font-semibold text-neutral-900 block truncate">{step.title}</span>
                <p className="text-neutral-600 text-[11px] leading-relaxed">{step.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveStep(idx)}
              className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
              title="Delete step"
            >
              <TrashIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
