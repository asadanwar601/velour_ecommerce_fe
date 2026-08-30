'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '../types';
import { STORAGE_KEYS } from '../config';

interface WishlistContextType {
  wishlistItems: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(STORAGE_KEYS.wishlist);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch {
      // Ignore local storage parse error
    }
  }, []);

  const saveWishlist = (items: Product[]) => {
    setWishlistItems(items);
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(items));
    } catch {}
  };

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const next = [product, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) => {
      const next = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlistItems.some((p) => p.id === productId),
    [wishlistItems],
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist],
  );

  const clearWishlist = useCallback(() => {
    saveWishlist([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
