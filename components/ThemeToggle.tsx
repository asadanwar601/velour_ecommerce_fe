'use client';

import React from 'react';
import { useTheme } from '@/lib/store';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`nav-icon-btn cursor-pointer inline-flex items-center justify-center transition-all ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <SunIcon size={19} className="text-amber-300 hover:text-amber-200 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <MoonIcon size={19} className="text-neutral-700 hover:text-neutral-900 transition-transform duration-300 hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="ml-2 text-xs uppercase tracking-wider font-medium">
          {isDark ? 'Light Theme' : 'Dark Theme'}
        </span>
      )}
    </button>
  );
}
