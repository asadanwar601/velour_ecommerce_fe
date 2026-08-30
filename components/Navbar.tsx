'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart, useAuth, useWishlist } from '@/lib/store';
import { getBrandSettings } from '@/lib/api';
import { BrandSettings } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/config';
import { ShoppingBagIcon, SearchIcon, MenuIcon, HeartIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import SearchOverlay from './SearchOverlay';
import AccountDropdown from './AccountDropdown';
import { MobileNavigationDrawer } from './navigation/MobileNavigationDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, isHydrated, openCartDrawer } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [brandSettings, setBrandSettings] = useState<BrandSettings | null>(null);

  useEffect(() => {
    getBrandSettings().then(setBrandSettings).catch(() => {});
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/women', label: 'Women' },
    { href: '/men', label: 'Men' },
  ];

  return (
    <>
      <header className="site-header sticky top-0 z-50 backdrop-blur-md border-b border-sand-200 shadow-sm">
        <div className="container">
          <div className="nav-inner">
            <button
              className="nav-icon-btn hamburger-btn cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={22} />
            </button>

            <nav className="nav-links-desktop" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link cursor-pointer ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link href="/" className="brand-logo inline-flex items-center cursor-pointer select-none" aria-label="Home">
              <span className="font-serif text-2xl font-medium tracking-[0.15em] text-neutral-900 uppercase">
                {brandSettings?.brandName || 'VELOUR'}
              </span>
            </Link>

            <div className="nav-actions flex items-center gap-2.5 sm:gap-3.5">
              <ThemeToggle />

              <button
                onClick={() => setIsSearchOpen(true)}
                className="nav-icon-btn cursor-pointer"
                aria-label="Search Catalog"
              >
                <SearchIcon size={20} />
              </button>

              <Link href="/wishlist" className="nav-icon-btn relative cursor-pointer" aria-label="Wishlist">
                <HeartIcon size={20} />
                {wishlistCount > 0 && (
                  <span className="cart-badge">{wishlistCount}</span>
                )}
              </Link>

              <AccountDropdown />

              <button
                onClick={openCartDrawer}
                className="nav-icon-btn relative cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBagIcon size={20} />
                {isHydrated && itemCount > 0 && (
                  <span className="cart-badge">{itemCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        pathname={pathname}
        navLinks={navLinks}
        isAuthenticated={isAuthenticated}
        user={user}
        wishlistCount={wishlistCount}
      />

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
