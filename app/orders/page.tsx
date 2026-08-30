'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useOrders, useCart, useAuth } from '@/lib/store';
import { Order } from '@/lib/types';
import { PackageIcon } from '@/components/Icons';
import OrderTrackingModal from '@/components/OrderTrackingModal';
import { OrdersGuestGateView } from '@/components/orders/OrdersGuestGateView';
import { CustomerOrderCard } from '@/components/orders/CustomerOrderCard';
import { OrdersFilterTabs, OrderFilterTab } from '@/components/orders/OrdersFilterTabs';

export default function OrdersPage() {
  const { orders, isLoadingOrders } = useOrders();
  const { user, isAuthenticated, isLoadingAuth, openGoogleModal } = useAuth();
  const { addItem, openCartDrawer } = useCart();

  const [activeTab, setActiveTab] = useState<OrderFilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === 'active' && (order.status === 'CANCELLED' || order.status === 'DELIVERED')) return false;
      if (activeTab === 'delivered' && order.status !== 'DELIVERED') return false;
      if (activeTab === 'cancelled' && order.status !== 'CANCELLED' && !order.returnRecord) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesNumber = order.orderNumber.toLowerCase().includes(q);
        const matchesItem = order.items.some(
          (it) => it.product?.name.toLowerCase().includes(q) || it.productId.toLowerCase().includes(q),
        );
        return matchesNumber || matchesItem;
      }
      return true;
    });
  }, [orders, activeTab, searchQuery]);

  const ordersCounts = useMemo(() => ({
    all: orders.length,
    active: orders.filter((o) => o.status !== 'CANCELLED' && o.status !== 'DELIVERED').length,
    delivered: orders.filter((o) => o.status === 'DELIVERED').length,
    cancelled: orders.filter((o) => o.status === 'CANCELLED' || o.returnRecord).length,
  }), [orders]);

  const handleReorder = async (order: Order) => {
    for (const item of order.items) {
      if (item.product) {
        await addItem(item.product, item.size, item.quantity);
      }
    }
    openCartDrawer();
  };

  if (isLoadingAuth) {
    return (
      <div className="py-24 text-center text-xs text-neutral-500">
        Authenticating client credentials...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[80vh] bg-sand-50/50 py-16 px-4 flex items-center justify-center">
        <OrdersGuestGateView onOpenGoogleModal={() => openGoogleModal('/orders')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Client Dossier</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 mt-1">Orders & Returns</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage delivery tracking, returns, and invoices.</p>
        </div>

        <OrdersFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          ordersCounts={ordersCounts}
        />

        {isLoadingOrders ? (
          <div className="py-16 text-center text-xs text-neutral-500">
            Retrieving order history from Atelier database...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white border border-sand-200 p-12 text-center rounded-sm space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-neutral-400">
              <PackageIcon size={24} />
            </div>
            <div>
              <h3 className="font-serif text-lg text-neutral-900">No Orders Found</h3>
              <p className="text-xs text-neutral-500 mt-1">There are no orders matching your selected criteria.</p>
            </div>
            <Link
              href="/women"
              className="inline-block px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-neutral-800 transition-all"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <CustomerOrderCard
                key={order.id}
                order={order}
                onSelectOrder={setSelectedOrder}
                onReorder={handleReorder}
              />
            ))}
          </div>
        )}

        <OrderTrackingModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </div>
    </div>
  );
}
