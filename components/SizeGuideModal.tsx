'use client';

import React, { useState, useEffect } from 'react';
import { CloseIcon, RulersIcon } from './Icons';
import { getProductSizeGuide } from '@/lib/api';
import { ProductSizeGuide } from '@/lib/types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: 'women' | 'men';
  productId?: string;
}

export default function SizeGuideModal({ isOpen, onClose, category = 'women', productId }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'women' | 'men'>(category);
  const [dynamicGuide, setDynamicGuide] = useState<ProductSizeGuide | null>(null);

  useEffect(() => {
    if (isOpen && productId) {
      getProductSizeGuide(productId)
        .then((guide) => setDynamicGuide(guide))
        .catch(() => setDynamicGuide(null));
    }
  }, [isOpen, productId]);

  if (!isOpen) return null;

  const womenSizes = [
    { size: 'XS', us: '0-2', bustIn: '32-33', bustCm: '81-84', waistIn: '24-25', waistCm: '61-64', hipIn: '34-35', hipCm: '86-89' },
    { size: 'S', us: '4-6', bustIn: '34-35', bustCm: '86-89', waistIn: '26-27', waistCm: '66-69', hipIn: '36-37', hipCm: '91-94' },
    { size: 'M', us: '8-10', bustIn: '36-37', bustCm: '91-94', waistIn: '28-29', waistCm: '71-74', hipIn: '38-39', hipCm: '96-99' },
    { size: 'L', us: '12-14', bustIn: '38-40', bustCm: '96-102', waistIn: '30-32', waistCm: '76-81', hipIn: '40-42', hipCm: '102-107' },
    { size: 'XL', us: '16', bustIn: '41-43', bustCm: '104-109', waistIn: '33-35', waistCm: '84-89', hipIn: '43-45', hipCm: '109-114' },
  ];

  const menSizes = [
    { size: 'XS / 36R', chestIn: '34-36', chestCm: '86-91', waistIn: '28-30', waistCm: '71-76', neckIn: '14.5', neckCm: '37' },
    { size: 'S / 38R', chestIn: '37-39', chestCm: '94-99', waistIn: '31-32', waistCm: '78-81', neckIn: '15.0', neckCm: '38' },
    { size: 'M / 40R', chestIn: '40-42', chestCm: '101-107', waistIn: '33-34', waistCm: '83-86', neckIn: '15.5', neckCm: '39' },
    { size: 'L / 42R', chestIn: '43-45', chestCm: '109-114', waistIn: '35-36', waistCm: '88-91', neckIn: '16.0', neckCm: '41' },
    { size: 'XL / 44R', chestIn: '46-48', chestCm: '117-122', waistIn: '37-39', waistCm: '94-99', neckIn: '16.5', neckCm: '42' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(22, 19, 15, 0.5)',
        backdropFilter: 'blur(6px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e8e4df',
          borderRadius: '4px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          color: '#16130f',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <RulersIcon size={20} style={{ color: '#967444' }} />
            <h3 style={{ fontSize: '1.35rem', color: '#16130f', margin: 0, fontWeight: 600 }}>Atelier Sizing & Measurements</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#6b635b', cursor: 'pointer' }}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Tab & Unit Toggle Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('women')}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                borderRadius: '2px',
                border: '1px solid',
                borderColor: activeTab === 'women' ? '#967444' : '#e8e4df',
                backgroundColor: activeTab === 'women' ? 'rgba(150, 116, 68, 0.1)' : 'transparent',
                color: activeTab === 'women' ? '#967444' : '#6b635b',
                cursor: 'pointer',
                fontWeight: activeTab === 'women' ? 600 : 400,
              }}
            >
              Women’s Silhouette
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('men')}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.82rem',
                borderRadius: '2px',
                border: '1px solid',
                borderColor: activeTab === 'men' ? '#967444' : '#e8e4df',
                backgroundColor: activeTab === 'men' ? 'rgba(150, 116, 68, 0.1)' : 'transparent',
                color: activeTab === 'men' ? '#967444' : '#6b635b',
                cursor: 'pointer',
                fontWeight: activeTab === 'men' ? 600 : 400,
              }}
            >
              Men’s Tailoring
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#faf8f5', borderRadius: '2px', padding: '2px', border: '1px solid #e8e4df' }}>
            <button
              type="button"
              onClick={() => setUnit('in')}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                border: 'none',
                borderRadius: '2px',
                backgroundColor: unit === 'in' ? '#ffffff' : 'transparent',
                color: unit === 'in' ? '#16130f' : '#6b635b',
                cursor: 'pointer',
                fontWeight: unit === 'in' ? 600 : 400,
                boxShadow: unit === 'in' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              INCHES
            </button>
            <button
              type="button"
              onClick={() => setUnit('cm')}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                border: 'none',
                borderRadius: '2px',
                backgroundColor: unit === 'cm' ? '#ffffff' : 'transparent',
                color: unit === 'cm' ? '#16130f' : '#6b635b',
                cursor: 'pointer',
                fontWeight: unit === 'cm' ? 600 : 400,
                boxShadow: unit === 'cm' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              CM
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e8e4df', borderRadius: '2px', overflowX: 'auto', marginBottom: '1.75rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e8e4df', backgroundColor: '#faf8f5' }}>
                <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Size</th>
                {activeTab === 'women' ? (
                  <>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>US Standard</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Bust ({unit})</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Waist ({unit})</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Hips ({unit})</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Chest ({unit})</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Waist ({unit})</th>
                    <th style={{ padding: '0.75rem 1rem', color: '#6b635b', textTransform: 'uppercase' }}>Neck Collar ({unit})</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'women'
                ? womenSizes.map((row) => (
                    <tr key={row.size} style={{ borderBottom: '1px solid #f0ede6' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#967444' }}>{row.size}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{row.us}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{unit === 'in' ? row.bustIn : row.bustCm}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{unit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{unit === 'in' ? row.hipIn : row.hipCm}</td>
                    </tr>
                  ))
                : menSizes.map((row) => (
                    <tr key={row.size} style={{ borderBottom: '1px solid #f0ede6' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#967444' }}>{row.size}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{unit === 'in' ? row.chestIn : row.chestCm}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{unit === 'in' ? row.waistIn : row.waistCm}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#16130f' }}>{unit === 'in' ? row.neckIn : row.neckCm}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Note */}
        <div style={{ backgroundColor: '#faf8f5', border: '1px solid #e8e4df', borderRadius: '2px', padding: '1.25rem', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <h4 style={{ fontSize: '0.85rem', color: '#16130f', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
            Atelier Measuring Advice
          </h4>
          <p style={{ color: '#6b635b', margin: 0 }}>
            • <strong>Chest/Bust:</strong> Measure around the fullest part of your chest, holding tape level under armpits.<br />
            • <strong>Waist:</strong> Measure around your natural waistline, keeping tape comfortably loose.<br />
            • <strong>Hips:</strong> Measure around fullest point of your hips approximately 8 inches below waistline.
          </p>
        </div>
      </div>
    </div>
  );
}
