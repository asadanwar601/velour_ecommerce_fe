'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';
import { getBrandSettings } from '@/lib/api';
import { BrandSettings } from '@/lib/types';
import { useLazyViewportData } from '@/lib/hooks/useLazyViewportData';
import { InstagramIcon, PinterestIcon, TwitterIcon } from './Icons';

const initialFallbackSettings: BrandSettings = {
  brandName: SITE_CONFIG.shortName,
  tagline: SITE_CONFIG.description,
  instagramUrl: SITE_CONFIG.instagramUrl,
  facebookUrl: SITE_CONFIG.pinterestUrl,
  youtubeUrl: 'https://youtube.com/@velour.atelier',
  supportEmail: SITE_CONFIG.supportEmail,
  supportPhone: SITE_CONFIG.supportPhone,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Lazy Viewport Data-Fetching: Defer API request until footer approaches viewport (200px rootMargin)
  const { ref, data: brandSettings } = useLazyViewportData<BrandSettings, HTMLElement>(
    getBrandSettings,
    {
      initialData: initialFallbackSettings,
      rootMargin: '200px 0px',
      triggerOnce: true,
    }
  );

  const brand = brandSettings || initialFallbackSettings;

  return (
    <footer ref={ref} className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Blurb */}
          <div className="footer-brand">
            <span className="brand-logo" style={{ color: 'var(--text-inverse)', fontSize: '1.65rem' }}>
              {(brand.brandName || SITE_CONFIG.shortName).toUpperCase()}
            </span>
            <p style={{ marginTop: '1rem' }}>
              {brand.tagline || SITE_CONFIG.description}
            </p>
            <div className="footer-social-icons">
              <a
                href={brand.instagramUrl || 'https://instagram.com/velour.atelier'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={brand.facebookUrl || 'https://facebook.com/velour.atelier'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Facebook"
              >
                <PinterestIcon size={18} />
              </a>
              <a
                href={brand.youtubeUrl || 'https://youtube.com/@velour.atelier'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="YouTube"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="footer-col">
            <h4>Collections</h4>
            <div className="footer-links">
              <Link href="/women">Women’s Collection</Link>
              <Link href="/men">Men’s Collection</Link>
              <Link href="/women?sub=Outerwear">Outerwear</Link>
              <Link href="/men?sub=Tailoring">Tailoring</Link>
              <Link href="/women?sub=Knitwear">Cashmere & Knitwear</Link>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-links">
              <Link href="/about">About {brand.brandName || SITE_CONFIG.name}</Link>
              <Link href="/about#craftsmanship">Craftsmanship</Link>
              <Link href="/about#sustainability">Sustainability</Link>
              <Link href="/contact">Store Locations</Link>
              <Link href="/contact">Press Inquiries</Link>
            </div>
          </div>

          {/* Column 3: Support & Legal */}
          <div className="footer-col">
            <h4>Client Care</h4>
            <div className="footer-links">
              <Link href="/contact">Customer Support</Link>
              <Link href="/contact#shipping">Shipping & Returns</Link>
              <Link href="/contact#size-guide">Size Guide</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/privacy#terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <div>&copy; {currentYear} {brand.brandName || SITE_CONFIG.name}. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Designed with precision</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
