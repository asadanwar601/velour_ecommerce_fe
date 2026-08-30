'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { Product, CartItem, CartProductLine, Coupon, GiftOptions, ToastMessage } from '../types';
import * as cartApi from '../api/cartApi.service';
import { STORAGE_KEYS } from '../config';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  coupon: Coupon | null;
  giftOptions: GiftOptions;
  isCartDrawerOpen: boolean;
  addItem: (product: Product, size: string, quantity?: number) => Promise<void>;
  removeItem: (productIdOrItemId: string, size?: string) => Promise<void>;
  updateQuantity: (productIdOrItemId: string, sizeOrQuantity: string | number, quantity?: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<Coupon>;
  removeCoupon: () => void;
  setGiftOptions: (options: GiftOptions) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  isHydrated: boolean;
  isLoadingCart: boolean;
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function normalizeBackendItems(backendItems: CartProductLine[]): CartItem[] {
  return backendItems.map((item) => ({
    id: item.id,
    productId: item.productId,
    product: item.product,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    lineTotal: item.lineTotal,
  }));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { toasts, showToast, dismissToast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [giftOptions, setGiftOptions] = useState<GiftOptions>({ isGift: false });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.cart);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
      } catch {}
    }
  }, [items, isHydrated]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + (i.price ?? i.product.price) * i.quantity, 0), [items]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0;
    if (coupon.discountType === 'percentage') return Math.round((subtotal * coupon.value) / 100);
    if (coupon.discountType === 'fixed') return Math.min(subtotal, coupon.value);
    return coupon.discountType === 'free_shipping' ? 15 : 0;
  }, [coupon, subtotal]);

  const addItem = useCallback(
    async (product: Product, size: string, quantity = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.product.id === product.id && i.size === size);
        if (idx > -1) {
          const next = [...prev];
          const qty = next[idx].quantity + quantity;
          next[idx] = { ...next[idx], quantity: qty, lineTotal: (next[idx].price ?? product.price) * qty };
          return next;
        }
        return [...prev, { id: `local-${Date.now()}`, productId: product.id, product, size, quantity, price: product.price, lineTotal: product.price * quantity }];
      });
      showToast({ title: 'Added to Bag', message: `${product.name} (${size})`, image: product.images[0], type: 'success' });
      setIsCartDrawerOpen(true);
      try { await cartApi.addCartItem({ productId: product.id, size, quantity }); } catch {}
    },
    [showToast],
  );

  const removeItem = useCallback(async (id: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id || (i.productId === id && (!size || i.size === size)))));
    try { await cartApi.removeCartItem(id); } catch {}
  }, []);

  const updateQuantity = useCallback(
    async (id: string, sizeOrQty: string | number, explicitQty?: number) => {
      const size = typeof sizeOrQty === 'string' ? sizeOrQty : undefined;
      const qty = typeof sizeOrQty === 'number' ? sizeOrQty : explicitQty ?? 1;
      if (qty <= 0) return removeItem(id, size);
      setItems((prev) => prev.map((i) => ((i.id === id || (i.productId === id && (!size || i.size === size))) ? { ...i, quantity: qty, lineTotal: (i.price ?? i.product.price) * qty } : i)));
      try { await cartApi.updateCartItem(id, { quantity: qty }); } catch {}
    },
    [removeItem],
  );

  const clearCart = useCallback(async () => {
    setItems([]);
    setCoupon(null);
    try { await cartApi.clearCart(); } catch {}
  }, []);

  const syncCart = useCallback(async () => {
    try {
      setIsLoadingCart(true);
      const res = await cartApi.getCart(coupon?.code);
      if (res?.items) setItems(normalizeBackendItems(res.items));
    } catch {} finally { setIsLoadingCart(false); }
  }, [coupon]);

  const applyCoupon = useCallback(async (code: string) => {
    const valid = await cartApi.validateCoupon(code);
    setCoupon(valid);
    return valid;
  }, []);

  return (
    <CartContext.Provider
      value={{
        items, itemCount, subtotal, discountAmount, coupon, giftOptions, isCartDrawerOpen,
        addItem, removeItem, updateQuantity, clearCart, syncCart, applyCoupon,
        removeCoupon: () => setCoupon(null), setGiftOptions,
        openCartDrawer: () => setIsCartDrawerOpen(true), closeCartDrawer: () => setIsCartDrawerOpen(false),
        isHydrated, isLoadingCart, toasts, showToast, dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
