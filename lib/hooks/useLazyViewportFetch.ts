'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseLazyViewportFetchOptions {
  /**
   * Margin around the root element. Defaults to '200px 0px' so fetching
   * begins smoothly 200px before scrolling into view.
   */
  rootMargin?: string;
  /**
   * Percentage of the target's visibility the observer's callback should be executed.
   */
  threshold?: number | number[];
  /**
   * Disconnect observer after the first intersection. Default: true.
   */
  triggerOnce?: boolean;
  /**
   * Disable the observer entirely.
   */
  disabled?: boolean;
  /**
   * Optional callback triggered when element intersects.
   */
  onIntersect?: () => void;
}

export interface UseLazyViewportFetchReturn<T extends HTMLElement = HTMLElement> {
  ref: (node: T | null) => void;
  isIntersecting: boolean;
  hasIntersected: boolean;
  reset: () => void;
}

export function useLazyViewportFetch<T extends HTMLElement = HTMLElement>(
  options: UseLazyViewportFetchOptions = {}
): UseLazyViewportFetchReturn<T> {
  const {
    rootMargin = '200px 0px',
    threshold = 0,
    triggerOnce = true,
    disabled = false,
    onIntersect,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const nodeRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const reset = useCallback(() => {
    setIsIntersecting(false);
    setHasIntersected(false);
  }, []);

  const ref = useCallback(
    (node: T | null) => {
      nodeRef.current = node;

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (disabled || !node) return;

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        setIsIntersecting(true);
        setHasIntersected(true);
        onIntersect?.();
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          const intersecting = entry.isIntersecting;
          setIsIntersecting(intersecting);

          if (intersecting) {
            setHasIntersected(true);
            onIntersect?.();

            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        },
        { rootMargin, threshold }
      );

      observerRef.current.observe(node);
    },
    [disabled, rootMargin, threshold, triggerOnce, onIntersect]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    ref,
    isIntersecting,
    hasIntersected,
    reset,
  };
}
