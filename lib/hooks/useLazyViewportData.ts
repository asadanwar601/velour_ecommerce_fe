'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLazyViewportFetch, UseLazyViewportFetchOptions } from './useLazyViewportFetch';

export interface UseLazyViewportDataOptions<T> extends UseLazyViewportFetchOptions {
  initialData?: T;
  enabled?: boolean;
}

export interface UseLazyViewportDataReturn<T, E extends HTMLElement = HTMLElement> {
  ref: (node: E | null) => void;
  data: T | null;
  isLoading: boolean;
  isFetched: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  hasIntersected: boolean;
}

export function useLazyViewportData<T, E extends HTMLElement = HTMLElement>(
  fetcher: () => Promise<T>,
  options: UseLazyViewportDataOptions<T> = {}
): UseLazyViewportDataReturn<T, E> {
  const { initialData = null, enabled = true, ...observerOptions } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { ref, hasIntersected } = useLazyViewportFetch<E>(observerOptions);

  const executeFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
      setIsFetched(true);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (hasIntersected && enabled && !isFetched && !isLoading) {
      executeFetch();
    }
  }, [hasIntersected, enabled, isFetched, isLoading, executeFetch]);

  return {
    ref,
    data,
    isLoading,
    isFetched,
    error,
    refetch: executeFetch,
    hasIntersected,
  };
}
