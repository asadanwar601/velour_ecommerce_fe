'use client';

import React, { ReactNode } from 'react';
import { ToastProvider, useToast } from './stores/ToastContext';
import { AuthProvider, useAuth } from './stores/AuthContext';
import { CartProvider as DomainCartProvider, useCart } from './stores/CartContext';
import { WishlistProvider, useWishlist } from './stores/WishlistContext';
import { RecentlyViewedProvider, useRecentlyViewed } from './stores/RecentlyViewedContext';
import { OrdersProvider, useOrders } from './stores/OrdersContext';
import { ThemeProvider, useTheme } from './stores/ThemeContext';

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DomainCartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <OrdersProvider>{children}</OrdersProvider>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </DomainCartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export {
  useToast,
  useAuth,
  useCart,
  useWishlist,
  useRecentlyViewed,
  useOrders,
  useTheme,
};
