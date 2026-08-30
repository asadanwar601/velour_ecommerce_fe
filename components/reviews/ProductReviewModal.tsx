'use client';

import React from 'react';
import { CloseIcon, StarIcon } from '@/components/Icons';

interface ProductReviewModalProps {
  isOpen: boolean;
  productName: string;
  authorName: string;
  onAuthorNameChange: (val: string) => void;
  rating: number;
  onRatingChange: (val: number) => void;
  title: string;
  onTitleChange: (val: string) => void;
  comment: string;
  onCommentChange: (val: string) => void;
  fit: 'small' | 'true-to-size' | 'large';
  onFitChange: (val: 'small' | 'true-to-size' | 'large') => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function ProductReviewModal({
  isOpen,
  productName,
  authorName,
  onAuthorNameChange,
  rating,
  onRatingChange,
  title,
  onTitleChange,
  comment,
  onCommentChange,
  fit,
  onFitChange,
  isSubmitting,
  onSubmit,
  onClose,
}: ProductReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 sm:p-8 space-y-5 text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold block">Client Feedback</span>
            <h3 className="font-serif text-lg text-neutral-900 line-clamp-1">{productName}</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Overall Rating</label>
            <div className="flex gap-1 text-gold-600">
              {[1, 2, 3, 4, 5].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onRatingChange(st)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <StarIcon size={22} filled={st <= rating} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Your Name</label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => onAuthorNameChange(e.target.value)}
              placeholder="Elena Rostova"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Review Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Impeccable drape & construction"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Fit & Sizing Accuracy</label>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'true-to-size', 'large'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onFitChange(f)}
                  className={`py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm border transition-all ${
                    fit === f
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-sand-50 text-neutral-600 border-sand-300'
                  }`}
                >
                  {f === 'true-to-size' ? 'True to Size' : f === 'small' ? 'Runs Small' : 'Runs Large'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Your Thoughts</label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Describe the fabric quality, silhouette, styling versatility..."
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isSubmitting ? 'Publishing...' : 'Submit Atelier Review'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
