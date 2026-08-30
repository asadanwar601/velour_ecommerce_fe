'use client';

import React, { useState, useEffect } from 'react';
import { getAdminOrders, updateAdminOrderStatus } from '@/lib/api';
import { Order } from '@/lib/types';
import { CheckIcon } from '@/components/Icons';
import { AdminOrdersFilterTabs, FilterStatus } from '@/components/admin/orders/AdminOrdersFilterTabs';
import { AdminOrderStatusModal } from '@/components/admin/orders/AdminOrderStatusModal';
import { AdminOrdersTable } from '@/components/admin/orders/AdminOrdersTable';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusTab, setActiveStatusTab] = useState<FilterStatus>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('SHIPPED');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminOrders({
        status: activeStatusTab === 'ALL' ? undefined : activeStatusTab,
        query: searchQuery || undefined,
      });
      setOrders(res.data || res as any);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [activeStatusTab, searchQuery]);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleQuickDispatch = async (order: Order) => {
    try {
      setIsUpdating(true);
      await updateAdminOrderStatus(order.id, 'SHIPPED');
      showNotification(`Order ${order.orderNumber} successfully dispatched.`);
      await loadOrders();
    } catch (err: any) {
      alert(`Failed to dispatch order: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      setIsUpdating(true);
      await updateAdminOrderStatus(selectedOrder.id, newStatus);
      showNotification(`Order ${selectedOrder.orderNumber} updated to ${newStatus}.`);
      setSelectedOrder(null);
      await loadOrders();
    } catch (err: any) {
      alert(`Failed to update order status: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Orders & Fulfillment</h1>
        <p className="text-xs text-neutral-500">Monitor client orders, manage dispatching, and issue shipping tracking.</p>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      <AdminOrdersFilterTabs
        activeTab={activeStatusTab}
        onTabChange={setActiveStatusTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">
          Loading fulfillment pipeline...
        </div>
      ) : (
        <AdminOrdersTable
          orders={orders}
          onOpenStatusModal={(order, defaultStatus) => {
            setSelectedOrder(order);
            setNewStatus(defaultStatus);
          }}
          onQuickDispatch={handleQuickDispatch}
        />
      )}

      <AdminOrderStatusModal
        order={selectedOrder}
        newStatus={newStatus}
        onStatusChange={setNewStatus}
        trackingNumber={trackingNumber}
        onTrackingNumberChange={setTrackingNumber}
        isUpdating={isUpdating}
        onSubmit={handleStatusSubmit}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
