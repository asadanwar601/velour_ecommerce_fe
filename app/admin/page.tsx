'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  getAdminOrders,
  getLowStockAlerts,
  getAdminProducts,
  updateAdminOrderStatus,
  adjustInventoryStock,
} from '@/lib/api';
import { Order, LowStockItem, Product } from '@/lib/types';
import { CheckIcon } from '@/components/Icons';
import { AdminDashboardStatsCards } from '@/components/admin/dashboard/AdminDashboardStatsCards';
import { AdminDashboardRecentOrders } from '@/components/admin/dashboard/AdminDashboardRecentOrders';
import { AdminDashboardLowStockTable } from '@/components/admin/dashboard/AdminDashboardLowStockTable';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [ordersRes, lowStockRes, productsRes] = await Promise.all([
        getAdminOrders({ limit: 10 }),
        getLowStockAlerts(),
        getAdminProducts(),
      ]);
      setOrders(ordersRes.data || ordersRes as any);
      setLowStockItems(lowStockRes);
      setProducts(productsRes);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleQuickDispatch = async (orderId: string, orderNumber: string) => {
    try {
      setDispatchingId(orderId);
      await updateAdminOrderStatus(orderId, 'SHIPPED');
      showNotification(`Order ${orderNumber} has been dispatched!`);
      await loadData();
    } catch (err: any) {
      alert(`Failed to dispatch order: ${err.message}`);
    } finally {
      setDispatchingId(null);
    }
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => (o.status !== 'CANCELLED' ? sum + Number(o.total) : sum), 0);
  }, [orders]);

  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'PAID' || o.status === 'PENDING').length;
  }, [orders]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Executive Dashboard</h1>
        <p className="text-xs text-neutral-500">Real-time atelier performance, inventory health, and order fulfillment.</p>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 text-center text-xs text-neutral-500">
          Syncing atelier operational metrics...
        </div>
      ) : (
        <>
          <AdminDashboardStatsCards
            totalRevenue={totalRevenue}
            ordersCount={orders.length}
            pendingOrdersCount={pendingOrdersCount}
            lowStockCount={lowStockItems.length}
            productsCount={products.length}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminDashboardRecentOrders
              orders={orders}
              onQuickDispatch={handleQuickDispatch}
              dispatchingId={dispatchingId}
            />

            <AdminDashboardLowStockTable
              items={lowStockItems}
              onOpenRestock={async (item) => {
                await adjustInventoryStock({
                  productId: item.productId,
                  location: 'Atelier Central Warehouse',
                  quantity: 20,
                  type: 'RESTOCK',
                  reason: 'Dashboard Quick Restock',
                });
                showNotification(`Restocked 20 units of ${item.productName}.`);
                await loadData();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
