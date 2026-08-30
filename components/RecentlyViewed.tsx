'use client';

import React from 'react';
import { useRecentlyViewed } from '@/lib/store';
import { PRODUCTS } from '@/lib/data';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';

interface RecentlyViewedProps {
  currentProductId?: string;
}

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const { recentlyViewedIds } = useRecentlyViewed();

  // Filter out current piece and find products
  const recentProducts = recentlyViewedIds
    .filter((id) => id !== currentProductId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is import('@/lib/types').Product => !!p)
    .slice(0, 4);

  if (recentProducts.length === 0) return null;

  return (
    <section style={{ marginTop: '5rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '4rem' }}>
      <ScrollReveal>
        <div className="section-header">
          <span className="eyebrow">Personal Gallery</span>
          <h2>Recently Viewed Pieces</h2>
        </div>
      </ScrollReveal>

      <div className="product-grid">
        {recentProducts.map((prod, idx) => (
          <ScrollReveal key={prod.id} delayMs={idx * 60}>
            <ProductCard product={prod} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
