'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ToastMessage } from '../types';

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [activeToasts, setActiveToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((toastId: string) => {
    setActiveToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback(
    (toastInput: Omit<ToastMessage, 'id'>) => {
      const generatedToastId = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { ...toastInput, id: generatedToastId };
      setActiveToasts((prevToasts) => [...prevToasts, newToast]);

      const toastDuration = toastInput.duration || 4000;
      setTimeout(() => {
        dismissToast(generatedToastId);
      }, toastDuration);
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ toasts: activeToasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
