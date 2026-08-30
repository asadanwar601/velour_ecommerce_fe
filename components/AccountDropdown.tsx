'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useWishlist, useOrders } from '@/lib/store';
import { UserIcon } from './Icons';
import { UnauthenticatedDropdownView } from './account/UnauthenticatedDropdownView';
import { AuthenticatedDropdownView } from './account/AuthenticatedDropdownView';

export default function AccountDropdown() {
  const router = useRouter();
  const { user, isAuthenticated, logout, openGoogleModal } = useAuth();
  const { wishlistCount } = useWishlist();
  const { orders } = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsOpen(false);
    logout();
    router.push('/');
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="nav-icon-btn relative bg-transparent border-none cursor-pointer p-0"
        aria-label={isAuthenticated ? `Client Menu (${user?.firstName || 'Account'})` : 'Sign In / Account'}
        aria-expanded={isOpen}
      >
        <UserIcon size={20} />
        {isAuthenticated && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] right-[-10px] w-[290px] bg-white border border-[#e8e4df] rounded-sm shadow-xl z-[1050] text-[#16130f] overflow-hidden animate-fade-in">
          {isAuthenticated && user ? (
            <AuthenticatedDropdownView
              user={user}
              ordersCount={orders.length}
              wishlistCount={wishlistCount}
              onClose={() => setIsOpen(false)}
              onLogout={handleLogout}
            />
          ) : (
            <UnauthenticatedDropdownView
              onClose={() => setIsOpen(false)}
              onOpenGoogleModal={() => openGoogleModal()}
            />
          )}
        </div>
      )}
    </div>
  );
}
