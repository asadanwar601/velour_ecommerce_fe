'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon } from './Icons';

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Baveha Autumn Winter Collection editorial',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Baveha Men Tailoring and Outerwear',
  },
  {
    url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1600&q=85',
    alt: 'Baveha Luxury Minimalist Outerwear',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    const target = document.getElementById('featured-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-label="Hero Showcase">
      {/* Background Media: Slideshow with crossfade */}
      <div className="hero-media-wrapper">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.url}
            className={`hero-slideshow-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={85}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Hero Foreground Content */}
      <div className="hero-content">
        <span className="eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
          Autumn / Winter Collection 2026
        </span>
        <h1 className="hero-title">Timeless Form, Quiet Luxury.</h1>
        <p className="hero-subtitle">
          Sculptural tailoring and pure natural fibers designed for effortless distinction.
        </p>

        <div className="hero-actions">
          <Link href="/women" className="btn btn-white">
            Shop Women
          </Link>
          <Link href="/men" className="btn btn-secondary" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.7)' }}>
            Shop Men
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={handleScrollDown}
        aria-label="Scroll to featured collection"
      >
        <span>Explore</span>
        <ChevronDownIcon size={16} />
      </button>
    </section>
  );
}
