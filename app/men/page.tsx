import React from 'react';
import type { Metadata } from 'next';
import { getProducts, subcategoriesFor, getProductFacets } from '@/lib/api';
import ListingFilterBar from '@/components/ListingFilterBar';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Men’s Collection | BAVEHA',
  description:
    'Explore the Baveha Men’s Collection. Unstructured wool flannel blazers, Japanese selvedge denim, heavy oxford shirts, and lambskin blousons.',
};

interface ListingPageProps {
  searchParams: Promise<{
    sub?: string;
    size?: string;
    color?: string;
    sort?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  }>;
}

export default async function MenPage({ searchParams }: ListingPageProps) {
  const params = await searchParams;
  const sub = params.sub;
  const size = params.size;
  const color = params.color;
  const sort = params.sort || 'featured';

  const [products, activeSubcategories, facets] = await Promise.all([
    getProducts({
      category: 'men',
      subcategory: sub,
      size,
      color,
      sort,
    }),
    subcategoriesFor('men'),
    getProductFacets(),
  ]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <header className="plp-header">
        <span className="eyebrow">Atelier Tailoring & Essentials</span>
        <h1 style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}>Men’s Collection</h1>
        <p style={{ maxWidth: '640px' }}>
          Unstructured tailoring, heavy shuttle-loom denim, and luxurious natural knitwear crafted for
          enduring comfort.
        </p>
      </header>

      {/* Filter and Sort Toolbar */}
      <React.Suspense fallback={<div className="plp-toolbar" />}>
        <ListingFilterBar
          subcategories={activeSubcategories}
          currentSubcategory={sub}
          currentSort={sort}
          currentSize={size}
          currentColor={color}
          availableSizes={facets.sizes}
          totalCount={products.length}
        />
      </React.Suspense>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product, idx) => (
            <ScrollReveal key={product.id} delayMs={idx * 60}>
              <ProductCard product={product} priority={idx < 4} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h3>No pieces found in this subcategory.</h3>
          <p style={{ marginTop: '0.5rem' }}>Please select another filter or view all pieces.</p>
        </div>
      )}
    </div>
  );
}
