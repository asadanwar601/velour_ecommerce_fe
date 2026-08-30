'use client';

import React from 'react';
import { Review } from '@/lib/types';
import { StarIcon, CheckIcon } from '@/components/Icons';

interface ProductReviewCardProps {
  review: Review;
}

export function ProductReviewCard({ review }: ProductReviewCardProps) {
  return (
    <div className="p-5 bg-white border border-sand-200 rounded-sm shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex text-gold-600">
            {[1, 2, 3, 4, 5].map((st) => (
              <StarIcon key={st} size={14} filled={st <= review.rating} />
            ))}
          </div>
          {review.title && (
            <span className="font-semibold text-neutral-900 line-clamp-1">{review.title}</span>
          )}
        </div>
        <span className="text-[11px] text-neutral-400">
          {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <p className="text-neutral-700 leading-relaxed">{review.comment}</p>

      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-sand-100">
        <div className="flex items-center gap-1.5 font-medium">
          <span>{review.authorName}</span>
          {review.verifiedBuyer && (
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm font-semibold text-[10px]">
              <CheckIcon size={10} /> Verified
            </span>
          )}
        </div>
        {review.fit && (
          <span className="text-neutral-400 capitalize">Fit: {review.fit}</span>
        )}
      </div>
    </div>
  );
}
