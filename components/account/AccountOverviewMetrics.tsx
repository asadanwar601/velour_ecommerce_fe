'use client';

import React from 'react';
import Link from 'next/link';
import { PackageIcon, TruckIcon, MapPinIcon, HeartIcon, ArrowRightIcon } from '@/components/Icons';

interface AccountOverviewMetricsProps {
  ordersCount: number;
  activeShipmentsCount: number;
  addressesCount: number;
  wishlistCount: number;
}

export function AccountOverviewMetrics({
  ordersCount,
  activeShipmentsCount,
  addressesCount,
  wishlistCount,
}: AccountOverviewMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-2">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Total Orders</span>
          <PackageIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{ordersCount}</p>
        <Link href="/orders" className="text-xs text-gold-700 hover:underline flex items-center gap-1 font-medium">
          <span>View Orders</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-2">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">In Transit</span>
          <TruckIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{activeShipmentsCount}</p>
        <Link href="/orders" className="text-xs text-gold-700 hover:underline flex items-center gap-1 font-medium">
          <span>Track Packages</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-2">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Saved Addresses</span>
          <MapPinIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{addressesCount}</p>
        <Link href="/account/addresses" className="text-xs text-gold-700 hover:underline flex items-center gap-1 font-medium">
          <span>Manage</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>

      <div className="bg-white border border-sand-200 p-5 rounded-sm shadow-sm space-y-2">
        <div className="flex items-center justify-between text-neutral-500">
          <span className="text-xs uppercase tracking-wider font-semibold">Atelier Wishlist</span>
          <HeartIcon size={18} />
        </div>
        <p className="font-mono text-2xl font-bold text-neutral-900">{wishlistCount}</p>
        <Link href="/wishlist" className="text-xs text-gold-700 hover:underline flex items-center gap-1 font-medium">
          <span>View Wishlist</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>
    </div>
  );
}
