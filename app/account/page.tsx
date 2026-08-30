'use client';

import React, { useState } from 'react';
import { useAuth, useOrders, useWishlist } from '@/lib/store';
import { Order } from '@/lib/types';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import { AccountOverviewMetrics } from '@/components/account/AccountOverviewMetrics';
import { AccountRecentOrdersList } from '@/components/account/AccountRecentOrdersList';

export default function AccountOverviewPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { wishlistCount } = useWishlist();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!user) return null;

  const activeShipmentsCount = orders.filter(
    (o) => o.status === 'PAID' || o.status === 'SHIPPED',
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Client Dashboard</span>
        <h1 className="font-serif text-3xl text-neutral-900 mt-1">
          Welcome back, {user.firstName || 'Client'}
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Summary of your atelier orders, deliveries, and saved settings.
        </p>
      </div>

      <AccountOverviewMetrics
        ordersCount={orders.length}
        activeShipmentsCount={activeShipmentsCount}
        addressesCount={(user.addresses || []).length}
        wishlistCount={wishlistCount}
      />

      <AccountRecentOrdersList
        orders={orders}
        onSelectOrder={setSelectedOrder}
      />

      <OrderTrackingModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
