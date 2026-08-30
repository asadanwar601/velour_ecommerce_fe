'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CloseIcon, SearchIcon } from './Icons';
import { searchProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { money } from '@/lib/format';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Wool Coat', 'Linen Blazer', 'Cashmere', 'Denim', 'Trousers', 'Silk'];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live search debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const hits = await searchProducts(query, 6);
      setResults(hits);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
  };

  if (!isOpen) return null;

  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
      <div className="search-overlay-header">
        <span className="brand-logo" style={{ fontSize: '1.4rem' }}>
          BAVEHA
        </span>
        <button
          onClick={onClose}
          className="nav-icon-btn"
          aria-label="Close search"
          style={{ width: '44px', height: '44px' }}
        >
          <CloseIcon size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="search-input-wrap">
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder="Search collections, coats, knitwear..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="search-suggestions">
        {query.trim() === '' ? (
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              Popular Searches
            </div>
            <div className="search-tags">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="search-tag-pill"
                  onClick={() => handleSelectTag(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <div className="eyebrow">
                {isSearching
                  ? 'Searching...'
                  : `${results.length} result${results.length === 1 ? '' : 's'} found`}
              </div>
              {results.length > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="link-underline"
                  style={{ fontSize: '0.78rem' }}
                >
                  View all results
                </Link>
              )}
            </div>

            {results.length > 0 ? (
              <div className="search-results-grid">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        backgroundColor: '#f3efe9',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {money(p.price)}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              !isSearching && (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '1rem' }}>
                  No items matched your search. Try searching for &ldquo;coat&rdquo;, &ldquo;blazer&rdquo;, or &ldquo;knitwear&rdquo;.
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
