'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const NEUTRAL_PLACEHOLDER =
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80';

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageSources, setImageSources] = useState<string[]>(
    images.length > 0 ? images : [NEUTRAL_PLACEHOLDER]
  );

  const handleImageError = (index: number) => {
    setImageSources((prev) => {
      const updated = [...prev];
      updated[index] = NEUTRAL_PLACEHOLDER;
      return updated;
    });
  };

  const activeSrc = imageSources[selectedIndex] || imageSources[0] || NEUTRAL_PLACEHOLDER;

  return (
    <div className="pdp-gallery">
      {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
      {imageSources.length > 1 && (
        <div className="pdp-thumbnails">
          {imageSources.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              className={`pdp-thumb-btn ${idx === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1}`}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="90px"
                  onError={() => handleImageError(idx)}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main Feature Image */}
      <div className="pdp-main-image-wrap">
        <Image
          src={activeSrc}
          alt={productName}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 55vw"
          onError={() => handleImageError(selectedIndex)}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
