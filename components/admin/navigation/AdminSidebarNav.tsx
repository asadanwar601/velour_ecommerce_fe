'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayersIcon,
  PackageIcon,
  SlidersIcon,
  ShoppingBagIcon,
  UserIcon,
  SparklesIcon,
  TagIcon,
  RotateCcwIcon,
  ExternalLinkIcon,
} from '@/components/Icons';

interface AdminSidebarNavProps {
  pathname: string;
}

export function AdminSidebarNav({ pathname }: AdminSidebarNavProps) {
  const navItems = [
    { href: '/admin', label: 'Executive Overview', icon: LayersIcon, exact: true },
    { href: '/admin/products', label: 'Product Catalogue', icon: ShoppingBagIcon },
    { href: '/admin/categories', label: 'Categories & Taxonomy', icon: LayersIcon },
    { href: '/admin/orders', label: 'Orders & Dispatching', icon: PackageIcon },
    { href: '/admin/returns', label: 'Returns & Refunds', icon: RotateCcwIcon },
    { href: '/admin/coupons', label: 'Coupons & Promo Codes', icon: TagIcon },
    { href: '/admin/inventory', label: 'Multi-Location Inventory', icon: SlidersIcon },
    { href: '/admin/users', label: 'Users & Customers', icon: UserIcon },
    { href: '/admin/cms', label: 'Pages & Content CMS', icon: SparklesIcon },
    { href: '/admin/settings', label: 'Brand & Settings', icon: SlidersIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-sand-200 p-6 flex flex-col justify-between flex-shrink-0 text-xs text-neutral-800">
      <div className="space-y-6">
        <div className="border-b border-sand-200 pb-4">
          <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block">Administration</span>
          <h2 className="font-serif text-lg font-bold text-neutral-900">VELOUR Maison</h2>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-sm transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                    : 'text-neutral-600 hover:bg-sand-50 hover:text-neutral-900'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-sand-200">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 text-[11px] uppercase tracking-wider font-semibold"
        >
          <ExternalLinkIcon size={14} />
          <span>Exit to Boutique</span>
        </Link>
      </div>
    </aside>
  );
}
