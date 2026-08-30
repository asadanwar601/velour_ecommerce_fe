import React from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Search Results | BAVEHA',
  description: 'Search results across the Baveha collections.',
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  const products = query ? await getProducts({ query }) : [];

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      <header className="plp-header">
        <span className="eyebrow">Search Catalog</span>
        <h1 style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}>
          {query ? `Results for “${query}”` : 'Search Collections'}
        </h1>
        <p style={{ maxWidth: '640px' }}>
          {query
            ? `Found ${products.length} item${products.length === 1 ? '' : 's'} matching your inquiry.`
            : 'Enter a term in the search bar above to browse our tailored pieces.'}
        </p>
      </header>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product, idx) => (
            <ScrollReveal key={product.id} delayMs={idx * 60}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        query && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3>No results found for “{query}”</h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              Check your spelling or explore our popular categories like Outerwear, Tailoring, or Knitwear.
            </p>
          </div>
        )
      )}
    </div>
  );
}
