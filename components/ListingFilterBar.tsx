'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronDownIcon, CloseIcon, SlidersIcon } from './Icons';

interface ListingFilterBarProps {
  subcategories: string[];
  currentSubcategory?: string;
  currentSort?: string;
  currentSize?: string;
  currentColor?: string;
  availableSizes?: string[];
  availableColors?: string[];
  totalCount: number;
}

export default function ListingFilterBar({
  subcategories,
  currentSubcategory = 'all',
  currentSort = 'featured',
  currentSize,
  currentColor,
  availableSizes = ['XS', 'S', 'M', 'L', 'XL'],
  availableColors = ['Black', 'Camel', 'Navy', 'Ivory', 'Espresso', 'Burgundy'],
  totalCount,
}: ListingFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    (currentSubcategory && currentSubcategory !== 'all') ||
    !!currentSize ||
    !!currentColor;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="plp-toolbar">
        {/* Subcategory Filter Pills */}
        <div className="filter-pills" role="tablist" aria-label="Subcategory filters">
          <button
            type="button"
            role="tab"
            aria-selected={!currentSubcategory || currentSubcategory.toLowerCase() === 'all'}
            className={`filter-pill ${
              !currentSubcategory || currentSubcategory.toLowerCase() === 'all' ? 'active' : ''
            }`}
            onClick={() => updateParam('sub', 'all')}
          >
            All Items
          </button>

          {subcategories.map((sub) => {
            const isActive = currentSubcategory.toLowerCase() === sub.toLowerCase();
            return (
              <button
                key={sub}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => updateParam('sub', sub)}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Filter Toggle, Count & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: showFilters ? '#16130f' : '#faf8f5',
              color: showFilters ? '#fff' : '#16130f',
              border: '1px solid #e8e4df',
              borderRadius: '4px',
              padding: '0.45rem 0.8rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <SlidersIcon style={{ width: 14, height: 14 }} />
            <span>Refine {hasActiveFilters ? '●' : ''}</span>
          </button>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {totalCount} {totalCount === 1 ? 'item' : 'items'}
          </span>

          <div className="sort-select-wrap">
            <label htmlFor="sort-dropdown" className="eyebrow" style={{ fontSize: '0.68rem' }}>
              Sort By:
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="sort-dropdown"
                className="sort-select"
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Faceted Filter Panel */}
      {showFilters && (
        <div
          style={{
            background: '#faf8f5',
            border: '1px solid #e8e4df',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            marginTop: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#16130f' }}>
              Filter by Atelier Specifications
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.75rem',
                  color: '#b91c1c',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {/* Sizes */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {availableSizes.map((s) => {
                  const isSelected = currentSize?.toLowerCase() === s.toLowerCase();
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateParam('size', isSelected ? 'all' : s)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: isSelected ? '1.5px solid #16130f' : '1px solid #e0dad1',
                        background: isSelected ? '#16130f' : '#fff',
                        color: isSelected ? '#fff' : '#16130f',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '0.5rem' }}>Color Palette</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {availableColors.map((c) => {
                  const isSelected = currentColor?.toLowerCase() === c.toLowerCase();
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => updateParam('color', isSelected ? 'all' : c)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        border: isSelected ? '1.5px solid #16130f' : '1px solid #e0dad1',
                        background: isSelected ? '#16130f' : '#fff',
                        color: isSelected ? '#fff' : '#16130f',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
