import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById, getRelated } from '@/lib/api';
import { money } from '@/lib/format';
import ProductGallery from '@/components/ProductGallery';
import ProductPurchaseForm from '@/components/ProductPurchaseForm';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import ProductReviews from '@/components/ProductReviews';
import RecentlyViewed from '@/components/RecentlyViewed';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | BAVEHA',
    };
  }

  return {
    title: `${product.name} | BAVEHA`,
    description: product.description,
    openGraph: {
      title: `${product.name} — BAVEHA`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelated(product.id, 4);
  const hasDiscount = !!(product.compareAtPrice && product.compareAtPrice > product.price);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '6rem' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <li>
            <Link href="/" style={{ color: 'var(--text-secondary)' }}>
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/${product.category}`} style={{ color: 'var(--text-secondary)' }}>
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/${product.category}?sub=${encodeURIComponent(product.subcategory)}`}
              style={{ color: 'var(--text-secondary)' }}
            >
              {product.subcategory}
            </Link>
          </li>
          <li>/</li>
          <li style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{product.name}</li>
        </ol>
      </nav>

      {/* Main PDP Grid */}
      <div className="pdp-grid">
        {/* Left: Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Right: Purchase Info */}
        <div className="pdp-info">
          <div>
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
              {product.category} &bull; {product.subcategory}
            </span>
            <h1 className="pdp-title" style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              {product.name}
            </h1>
            <div className="pdp-price">
              {hasDiscount ? (
                <>
                  <span className="price-sale">{money(product.price)}</span>
                  <span className="price-compare" style={{ fontSize: '1.1rem' }}>
                    {money(product.compareAtPrice!)}
                  </span>
                </>
              ) : (
                <span className="price-current">{money(product.price)}</span>
              )}
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
            {product.description}
          </p>

          {/* Sizing, Stepper, and Add To Cart */}
          <ProductPurchaseForm product={product} />
        </div>
      </div>

      {/* Customer Reviews & Star Ratings Section */}
      <ProductReviews productId={product.id} productName={product.name} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '4.5rem', borderTop: '1px solid var(--border-hairline)', paddingTop: '4rem' }}>
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Complete The Look</span>
              <h2>You May Also Admire</h2>
            </div>
          </ScrollReveal>

          <div className="product-grid">
            {relatedProducts.map((relProduct, idx) => (
              <ScrollReveal key={relProduct.id} delayMs={idx * 80}>
                <ProductCard product={relProduct} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Items Carousel */}
      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}
