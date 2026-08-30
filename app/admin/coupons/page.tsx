'use client';

import React, { useState, useEffect } from 'react';
import { getAllCouponsAdmin, createCoupon } from '@/lib/api';
import { Coupon } from '@/lib/types';
import { money } from '@/lib/format';
import { SearchIcon, CheckIcon, CloseIcon, SparklesIcon } from '@/components/Icons';

type AdminCoupon = Coupon & { id?: string; redemptions?: number; isActive?: boolean; createdAt?: string };

const s: Record<string, React.CSSProperties> = {
  page: { padding: '2rem 2.5rem', maxWidth: '1200px', fontFamily: 'var(--font-body, system-ui)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' as const },
  title: { fontSize: '1.5rem', fontWeight: 700, color: '#16130f', margin: 0 },
  sub: { fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' },
  btn: { background: '#16130f', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  card: { background: '#fff', border: '1px solid #e8e4df', borderRadius: '6px', padding: '1.5rem', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' },
  couponCard: { background: '#fff', border: '1.5px dashed #d0c9c0', borderRadius: '8px', padding: '1.25rem', position: 'relative' as const },
  code: { fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: '#16130f', letterSpacing: '0.08em', background: '#faf8f5', padding: '0.35rem 0.75rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.75rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600 },
  input: { width: '100%', border: '1px solid #e8e4df', borderRadius: '4px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', color: '#16130f', outline: 'none', boxSizing: 'border-box' as const },
  label: { fontSize: '0.78rem', fontWeight: 600, color: '#555', marginBottom: '0.3rem', display: 'block' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' },
  modal: { background: '#fff', borderRadius: '8px', padding: '2rem', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  toast: { position: 'fixed' as const, bottom: '2rem', right: '2rem', background: '#16130f', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '6px', fontSize: '0.85rem', zIndex: 2000 },
};

const EMPTY_FORM = { code: '', type: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING', value: 0, minOrder: 0, maxUses: 0, expiresAt: '', isActive: true };

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const load = async () => {
    try { setIsLoading(true); const data = await getAllCouponsAdmin(); setCoupons(data); }
    catch { notify('Failed to load coupons'); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = coupons.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!form.code.trim() || !form.value) return notify('Code and value are required');
    setSaving(true);
    try {
      const discountType = form.type === 'PERCENTAGE' ? 'percentage' : form.type === 'FIXED_AMOUNT' ? 'fixed' : 'free_shipping';
      const created = await createCoupon({
        code: form.code.toUpperCase().trim(),
        discountType,
        type: form.type,
        value: Number(form.value),
        minOrder: form.minOrder ? Number(form.minOrder) : undefined,
        minSubtotal: form.minOrder ? Number(form.minOrder) : undefined,
        maxUses: form.maxUses ? Number(form.maxUses) : undefined,
        expiresAt: form.expiresAt || undefined,
        description: '',
        isActive: form.isActive,
      });
      setCoupons(prev => [created as AdminCoupon, ...prev]);
      setShowModal(false);
      setForm({ ...EMPTY_FORM });
      notify('Coupon created successfully');
    } catch { notify('Failed to create coupon'); }
    finally { setSaving(false); }
  };

  const discountLabel = (c: Coupon) =>
    (c.type === 'PERCENTAGE' || c.discountType === 'percentage') ? `${c.value}% off` :
    (c.type === 'FIXED_AMOUNT' || c.discountType === 'fixed') ? `${money(c.value)} off` :
    'Free Shipping';

  return (
    <div style={s.page}>
      {toast && <div style={s.toast}>{toast}</div>}

      <div style={s.header}>
        <div>
          <h1 style={s.title}>Coupons & Promotions</h1>
          <p style={s.sub}>{coupons.length} promo codes · Manage discounts and offers</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <SearchIcon style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#999' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search codes…" style={{ ...s.input, paddingLeft: '2rem', width: '220px' }} />
          </div>
          <button style={s.btn} onClick={() => setShowModal(true)}>
            <span style={{ fontSize: '1.1rem' }}>+</span> New Coupon
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>Loading coupons…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <SparklesIcon style={{ width: 40, height: 40, margin: '0 auto 1rem', opacity: 0.3 }} />
          <p>No coupons found. Create your first promo code.</p>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map((coupon, i) => (
            <div key={coupon.id || coupon.code || i} style={s.couponCard}>
              {/* Active badge */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <span style={{ ...s.badge, background: coupon.isActive !== false ? 'rgba(21,128,61,0.1)' : 'rgba(185,28,28,0.08)', color: coupon.isActive !== false ? '#15803d' : '#b91c1c' }}>
                  {coupon.isActive !== false ? '● Active' : '● Inactive'}
                </span>
              </div>
              <div style={s.code}>{coupon.code}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#16130f', marginBottom: '0.4rem' }}>{discountLabel(coupon)}</div>
              {coupon.description && <p style={{ fontSize: '0.8rem', color: '#777', margin: '0 0 0.75rem' }}>{coupon.description}</p>}
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#888', flexWrap: 'wrap' }}>
                {coupon.minOrder ? <span>Min order: {money(coupon.minOrder)}</span> : null}
                {coupon.maxUses ? <span>Max uses: {coupon.maxUses}</span> : null}
                {(coupon.redemptions ?? 0) > 0 && <span>Used: {coupon.redemptions}×</span>}
                {coupon.expiresAt && <span>Expires: {new Date(coupon.expiresAt).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Coupon Modal */}
      {showModal && (
        <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={s.modal}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#16130f' }}>New Promo Code</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                <CloseIcon style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={s.label}>Promo Code *</label>
                <input style={s.input} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="e.g. VELOUR20" />
              </div>
              <div style={s.row2}>
                <div>
                  <label style={s.label}>Discount Type *</label>
                  <select style={s.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING' }))}>
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED_AMOUNT">Fixed Amount ($)</option>
                    <option value="FREE_SHIPPING">Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label style={s.label}>Value *</label>
                  <input style={s.input} type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: Number(e.target.value) }))} placeholder={form.type === 'PERCENTAGE' ? '20' : '25'} />
                </div>
              </div>
              <div style={s.row2}>
                <div>
                  <label style={s.label}>Min Order ($)</label>
                  <input style={s.input} type="number" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: Number(e.target.value) }))} placeholder="100" />
                </div>
                <div>
                  <label style={s.label}>Max Uses</label>
                  <input style={s.input} type="number" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: Number(e.target.value) }))} placeholder="∞ unlimited" />
                </div>
              </div>
              <div>
                <label style={s.label}>Expiry Date</label>
                <input style={s.input} type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                <label htmlFor="isActive" style={{ fontSize: '0.85rem', color: '#555', cursor: 'pointer' }}>Active immediately</label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: '1px solid #e8e4df', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Cancel</button>
              <button onClick={handleCreate} disabled={saving} style={{ ...s.btn, opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Creating…' : '✓ Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
