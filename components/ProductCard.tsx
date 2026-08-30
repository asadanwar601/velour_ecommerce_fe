'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { money } from '@/lib/format';
import { useCart, useWishlist } from '@/lib/store';
import { HeartIcon, HeartFilledIcon, StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const NEUTRAL_PLACEHOLDER =
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80';

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [imgSrc1, setImgSrc1] = useState(product.images[0] || NEUTRAL_PLACEHOLDER);
  const [imgSrc2, setImgSrc2] = useState(
    product.images[1] || product.images[0] || NEUTRAL_PLACEHOLDER
  );

  const isFavorited = isInWishlist(product.id);
  const hasDiscount = !!(product.compareAtPrice && product.compareAtPrice > product.price);

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <div className="product-card-media" style={{ position: 'relative' }}>
        {/* Badges */}
        {hasDiscount ? (
          <span className="product-badge product-badge-sale">Sale</span>
        ) : product.isNew ? (
          <span className="product-badge">New</span>
        ) : null}

        {/* Floating Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 15,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #e8e4df',
            color: isFavorited ? '#ef4444' : '#6b635b',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isFavorited ? <HeartFilledIcon size={16} /> : <HeartIcon size={16} />}
        </button>

        <Link href={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          {/* Primary Image */}
          <div className="product-card-img-primary product-card-img">
            <Image
              src={imgSrc1}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
              onError={() => setImgSrc1(NEUTRAL_PLACEHOLDER)}
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Hover Image (Second Image) */}
          <div className="product-card-img-hover product-card-img">
            <Image
              src={imgSrc2}
              alt={`${product.name} preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImgSrc2(NEUTRAL_PLACEHOLDER)}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>

        {/* Quick Add Overlay */}
        <div className="product-quick-add" onClick={(e) => e.stopPropagation()}>
          <div className="eyebrow" style={{ fontSize: '0.65rem', textAlign: 'center' }}>
            Quick Add Size
          </div>
          <div className="quick-add-sizes">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className="quick-size-btn"
                onClick={(e) => handleQuickAdd(e, size)}
                aria-label={`Add size ${size} to bag`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-card-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
          <span className="product-card-category">{product.subcategory}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--accent-gold, #c5a880)', fontSize: '0.72rem' }}>
            <StarIcon size={11} filled />
            <span>4.9</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="product-card-title">
          {product.name}
        </Link>

        <div className="product-card-price">
          {hasDiscount ? (
            <>
              <span className="price-sale">{money(product.price)}</span>
              <span className="price-compare">{money(product.compareAtPrice!)}</span>
            </>
          ) : (
            <span className="price-current">{money(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
