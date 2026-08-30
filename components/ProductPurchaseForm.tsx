'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useCart, useWishlist, useRecentlyViewed } from '@/lib/store';
import QuantityStepper from './QuantityStepper';
import { ChevronDownIcon, CheckIcon, HeartIcon, HeartFilledIcon, RulersIcon } from './Icons';
import SizeGuideModal from './SizeGuideModal';

interface ProductPurchaseFormProps {
  product: Product;
}

export default function ProductPurchaseForm({ product }: ProductPurchaseFormProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Track product in recently viewed history
  useEffect(() => {
    if (product?.id) {
      addRecentlyViewed(product.id);
    }
  }, [product?.id, addRecentlyViewed]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size before adding to your bag.');
      return;
    }

    setErrorMsg('');
    setIsAdding(true);
    addItem(product, selectedSize, quantity);

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div>
      {/* Size Selector */}
      <div className="pdp-sizes-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="eyebrow">Select Size</span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.78rem',
              color: 'var(--accent-gold, #c5a880)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              textDecoration: 'underline',
            }}
          >
            <RulersIcon size={14} />
            <span>Size & Fit Guide</span>
          </button>
        </div>

        <div className="size-options" role="radiogroup" aria-label="Available sizes">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`size-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedSize(size);
                  setErrorMsg('');
                }}
              >
                {size}
              </button>
            );
          })}
        </div>

        {errorMsg && (
          <p style={{ color: 'var(--accent-terracotta, #f87171)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {errorMsg}
          </p>
        )}
      </div>

      {/* Action Stepper + Add to Cart + Wishlist */}
      <div className="pdp-actions" style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem' }}>
        <QuantityStepper value={quantity} onChange={setQuantity} />

        <button
          type="button"
          className="btn btn-primary"
          style={{ flex: 1 }}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckIcon size={18} /> Added to Bag
            </span>
          ) : (
            'Add to Shopping Bag'
          )}
        </button>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="btn btn-secondary"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          style={{
            padding: '0 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? '#ef4444' : 'inherit',
          }}
        >
          {isFavorited ? <HeartFilledIcon size={20} /> : <HeartIcon size={20} />}
        </button>
      </div>

      {/* Accordion Details */}
      <div className="pdp-accordions" style={{ marginTop: '2.5rem' }}>
        {/* Accordion 1: Material & Details */}
        <div className="accordion-item">
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => toggleAccordion('details')}
            aria-expanded={openAccordion === 'details'}
          >
            <span>Material, Fiber & Tailoring</span>
            <ChevronDownIcon
              size={16}
              className={`accordion-chevron ${openAccordion === 'details' ? 'open' : ''}`}
            />
          </button>
          {openAccordion === 'details' && (
            <div className="accordion-content">
              <p>
                Each piece is sculpted from pure natural fibers sourced from family-owned mills in
                Biella, Italy and Ulaanbaatar, Mongolia. Dry clean only. Store on wide contoured cedar hangers.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 2: Shipping & Returns */}
        <div className="accordion-item">
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => toggleAccordion('shipping')}
            aria-expanded={openAccordion === 'shipping'}
          >
            <span>Complimentary Worldwide Shipping & Returns</span>
            <ChevronDownIcon
              size={16}
              className={`accordion-chevron ${openAccordion === 'shipping' ? 'open' : ''}`}
            />
          </button>
          {openAccordion === 'shipping' && (
            <div className="accordion-content">
              <p>
                Complimentary carbon-neutral DHL Express delivery on all orders over $75. Every order includes a prepaid digital return label with 30-day effortless worldwide returns and exchanges.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 3: Sustainability */}
        <div className="accordion-item">
          <button
            type="button"
            className="accordion-trigger"
            onClick={() => toggleAccordion('sustainability')}
            aria-expanded={openAccordion === 'sustainability'}
          >
            <span>Atelier Provenance & Sustainability</span>
            <ChevronDownIcon
              size={16}
              className={`accordion-chevron ${openAccordion === 'sustainability' ? 'open' : ''}`}
            />
          </button>
          {openAccordion === 'sustainability' && (
            <div className="accordion-content">
              <p>
                Crafted in limited small-batch editions to eliminate garment waste. Packaged in 100% FSC-certified recycled unbleached gift boxes and biodegradable garment wraps.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category === 'men' ? 'men' : 'women'}
        productId={product.id}
      />
    </div>
  );
}
