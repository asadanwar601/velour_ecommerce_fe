'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const RECENTLY_VIEWED_KEY = 'velour_recently_viewed_v1';

interface RecentlyViewedContextType {
  recentlyViewedIds: string[];
  addRecentlyViewed: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedIds = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (storedIds) {
        setRecentlyViewedIds(JSON.parse(storedIds));
      }
    } catch {}
  }, []);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewedIds((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, 12);
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewedIds, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
