import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import NewsletterForm from '@/components/NewsletterForm';
import { LazyTrendingSection } from '@/components/home/LazyTrendingSection';
import { getFeatured, getNewArrivals } from '@/lib/api';
import { ArrowRightIcon, TruckIcon, RefreshIcon, ShieldIcon } from '@/components/Icons';

export default async function HomePage() {
  // Only fetch critical above-the-fold collections upfront; low-priority sections are viewport-deferred
  const [featuredProducts, newArrivals] = await Promise.all([
    getFeatured(4),
    getNewArrivals(4),
  ]);

  return (
    <div>
      {/* 1. Hero Showcase */}
      <Hero />

      {/* 2. Category Highlights (Women / Men) */}
      <section className="section" aria-label="Collections by Category">
        <div className="container">
          <div className="category-highlight-grid">
            {/* Women's Card */}
            <ScrollReveal>
              <Link href="/women" className="category-card" aria-label="Explore Women's Collection">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                  alt="Women's Collection"
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                  className="category-card-bg"
                  style={{ objectFit: 'cover' }}
                />
                <div className="category-card-overlay" />
                <div className="category-card-content">
                  <span className="eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
                    Atelier 2026
                  </span>
                  <h3>Women’s Collection</h3>
                  <span className="link-underline" style={{ color: 'var(--text-inverse)' }}>
                    Explore Wardrobe <ArrowRightIcon size={16} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Men's Card */}
            <ScrollReveal delayMs={150}>
              <Link href="/men" className="category-card" aria-label="Explore Men's Collection">
                <Image
                  src="https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=80"
                  alt="Men's Collection"
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                  className="category-card-bg"
                  style={{ objectFit: 'cover' }}
                />
                <div className="category-card-overlay" />
                <div className="category-card-content">
                  <span className="eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
                    Tailoring & Outerwear
                  </span>
                  <h3>Men’s Collection</h3>
                  <span className="link-underline" style={{ color: 'var(--text-inverse)' }}>
                    Explore Wardrobe <ArrowRightIcon size={16} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section id="featured-section" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow">Curated Selection</span>
              <h2>Featured Pieces</h2>
              <p>Iconic staples designed with meticulous attention to line, weight, and texture.</p>
            </div>
          </ScrollReveal>

          <div className="product-grid">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delayMs={idx * 80}>
                <ProductCard product={product} priority={idx < 2} />
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/women" className="btn btn-secondary">
              View All Featured
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner (Winter Sale & Editorial) */}
      <section className="container">
        <ScrollReveal>
          <div className="promo-banner">
            <Image
              src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1600&q=80"
              alt="Winter campaign"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', opacity: 0.35 }}
            />
            <div className="promo-banner-content">
              <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>
                Seasonal Archive Sale
              </span>
              <h2>Winter Archive — Up to 40% Off</h2>
              <p>
                Take advantage of rare pricing on our signature double-faced wool coats, cashmere
                knitwear, and structured outerwear.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/women" className="btn btn-white">
                  Shop Women’s Sale
                </Link>
                <Link href="/men" className="btn btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>
                  Shop Men’s Sale
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="eyebrow eyebrow-accent">Just Landed</span>
              <h2>New Arrivals</h2>
              <p>The latest silhouettes from our modern European atelier.</p>
            </div>
          </ScrollReveal>

          <div className="product-grid">
            {newArrivals.map((product, idx) => (
              <ScrollReveal key={product.id} delayMs={idx * 80}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Commitments / Features Strip */}
      <aside className="promo-strip" aria-label="Brand Commitments">
        <div className="container">
          <div className="promo-features-grid">
            <div className="promo-feature-item">
              <TruckIcon size={28} style={{ color: 'var(--text-primary)' }} />
              <h4>Complimentary Delivery</h4>
              <p>Free standard worldwide shipping on all orders over $75 with carbon-neutral transit.</p>
            </div>
            <div className="promo-feature-item">
              <ShieldIcon size={28} style={{ color: 'var(--text-primary)' }} />
              <h4>Artisanal Craft</h4>
              <p>Spun from Grade-A Mongolian cashmere, European flax, and Japanese selvedge denim.</p>
            </div>
            <div className="promo-feature-item">
              <RefreshIcon size={28} style={{ color: 'var(--text-primary)' }} />
              <h4>30-Day Easy Returns</h4>
              <p>Try pieces in the comfort of your home with complimentary prepaid return labels.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 7. Deferred Viewport Trending Section */}
      <LazyTrendingSection />

      {/* 8. Newsletter Strip (UI only) */}
      <section className="newsletter-section" aria-label="Newsletter Signup">
        <div className="container-narrow">
          <ScrollReveal>
            <span className="eyebrow">The Baveha Journal</span>
            <h2 style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              Subscribe for Private Access
            </h2>
            <p>
              Receive early access to seasonal collections, limited capsule releases, and editorial
              wardrobe perspectives.
            </p>
            <NewsletterForm />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
