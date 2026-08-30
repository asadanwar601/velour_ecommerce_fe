'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { getTrending } from '@/lib/api';
import { useLazyViewportData } from '@/lib/hooks/useLazyViewportData';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

export function LazyTrendingSection() {
  const { ref, data: trendingProducts, isLoading } = useLazyViewportData<Product[], HTMLElement>(
    () => getTrending(4),
    {
      rootMargin: '250px 0px',
      triggerOnce: true,
    }
  );

  return (
    <section ref={ref} className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="eyebrow">Most Coveted</span>
            <h2>Trending This Week</h2>
            <p>The most sought-after essentials chosen by our global clientele.</p>
          </div>
        </ScrollReveal>

        {isLoading || !trendingProducts ? (
          /* Zero CLS Skeleton Matrix */
          <div className="product-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="product-card animate-pulse">
                <div className="aspect-3/4 bg-sand-200/60 rounded-sm mb-3" />
                <div className="h-4 bg-sand-200/80 rounded-sm w-3/4 mb-2" />
                <div className="h-3 bg-sand-200/60 rounded-sm w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {trendingProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delayMs={idx * 80}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
