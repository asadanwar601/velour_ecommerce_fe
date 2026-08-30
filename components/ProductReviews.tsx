'use client';

import React, { useState, useEffect } from 'react';
import { Review } from '@/lib/types';
import { ProductReviewOverview } from './reviews/ProductReviewOverview';
import { ProductReviewModal } from './reviews/ProductReviewModal';
import { ProductReviewCard } from './reviews/ProductReviewCard';

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [fit, setFit] = useState<'small' | 'true-to-size' | 'large'>('true-to-size');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Reviews are loaded from memory/api
    setReviews([
      {
        id: 'rev_1',
        productId,
        authorName: 'Sophie Van Der Bilt',
        rating: 5,
        title: 'Masterpiece in Tailoring',
        comment: 'The silhouette and weight of this fabric are extraordinary. Pairs seamlessly from boardroom to evening galas.',
        fit: 'true-to-size',
        verifiedBuyer: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'rev_2',
        productId,
        authorName: 'Julian H.',
        rating: 5,
        title: 'Impeccable Comfort',
        comment: 'Exquisite cut. Breathable and luxurious hand feel.',
        fit: 'true-to-size',
        verifiedBuyer: true,
        createdAt: new Date().toISOString(),
      },
    ]);
    setIsLoading(false);
  }, [productId]);

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : '5.0';

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    const newRev: Review = {
      id: `rev_${Date.now()}`,
      productId,
      authorName: authorName.trim(),
      rating,
      title: title.trim() || 'Exquisite piece',
      comment: comment.trim(),
      fit,
      verifiedBuyer: true,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newRev, ...prev]);
    setIsModalOpen(false);
    setAuthorName('');
    setTitle('');
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="mt-16 pt-12 border-t border-sand-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <ProductReviewOverview
            averageRating={averageRating}
            totalReviews={totalReviews}
            onOpenReviewModal={() => setIsModalOpen(true)}
          />
        </div>

        <div className="lg:col-span-8 space-y-4">
          {reviews.map((review) => (
            <ProductReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <ProductReviewModal
        isOpen={isModalOpen}
        productName={productName}
        authorName={authorName}
        onAuthorNameChange={setAuthorName}
        rating={rating}
        onRatingChange={setRating}
        title={title}
        onTitleChange={setTitle}
        comment={comment}
        onCommentChange={setComment}
        fit={fit}
        onFitChange={setFit}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitReview}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
