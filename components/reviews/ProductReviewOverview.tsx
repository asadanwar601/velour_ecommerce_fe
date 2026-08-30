'use client';

import React from 'react';
import { StarIcon } from '@/components/Icons';

interface ProductReviewOverviewProps {
  averageRating: string;
  totalReviews: number;
  onOpenReviewModal: () => void;
}

export function ProductReviewOverview({
  averageRating,
  totalReviews,
  onOpenReviewModal,
}: ProductReviewOverviewProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold block">
          Client Impressions
        </span>
        <h2 className="font-serif text-2xl text-neutral-900 mt-1">Ratings & Reviews</h2>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-serif text-4xl font-bold text-neutral-900">{averageRating}</span>
        <div className="flex gap-0.5 text-gold-600">
          {[1, 2, 3, 4, 5].map((st) => (
            <StarIcon key={st} size={18} filled={st <= Math.round(Number(averageRating))} />
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Based on {totalReviews} verified atelier reviews
      </p>

      <button
        type="button"
        onClick={onOpenReviewModal}
        className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-sm"
      >
        Write a Review
      </button>
    </div>
  );
}
