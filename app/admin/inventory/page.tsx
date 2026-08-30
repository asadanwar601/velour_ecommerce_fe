'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, getAdminInventory, adjustInventoryStock } from '@/lib/api';
import { Product, ProductInventoryBreakdown, InventoryAdjustDto } from '@/lib/types';
import { SearchIcon, CheckIcon } from '@/components/Icons';
import { AdminInventoryMetricCards } from '@/components/admin/inventory/AdminInventoryMetricCards';
import { AdminStockAdjustmentModal } from '@/components/admin/inventory/AdminStockAdjustmentModal';
import { AdminInventoryTable } from '@/components/admin/inventory/AdminInventoryTable';

const LOCATIONS = [
  'Atelier Central Warehouse',
  'Milan Distribution Hub',
  'New York Boutique & Hub',
];

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryMap, setInventoryMap] = useState<Record<string, ProductInventoryBreakdown>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'lowStock'>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [adjustLocation, setAdjustLocation] = useState(LOCATIONS[0]);
  const [adjustType, setAdjustType] = useState<NonNullable<InventoryAdjustDto['type']>>('RESTOCK');
  const [adjustQuantity, setAdjustQuantity] = useState<number>(10);
  const [adjustReason, setAdjustReason] = useState<string>('Artisanal workshop restock');
  const [isAdjusting, setIsAdjusting] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const prods = await getProducts({ limit: 100 });
      setProducts(prods);

      const invList = await getAdminInventory();
      const map: Record<string, ProductInventoryBreakdown> = {};
      invList.forEach((inv) => {
        map[inv.productId] = inv;
      });
      setInventoryMap(map);
    } catch (err) {
      console.error('Failed to load inventory data:', err);
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

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;

    try {
      setIsAdjusting(true);
      const qtyDelta = adjustType === 'DISPATCH' ? -Math.abs(adjustQuantity) : Math.abs(adjustQuantity);

      const result = await adjustInventoryStock({
        productId: adjustingProduct.id,
        location: adjustLocation,
        quantity: qtyDelta,
        type: adjustType,
        reason: adjustReason,
      });

      showNotification(`Stock updated for ${adjustingProduct.name}. New total: ${result.newStock} units.`);
      setAdjustingProduct(null);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to adjust stock.');
    } finally {
      setIsAdjusting(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const stock = inventoryMap[p.id]?.totalStock ?? 20;
      if (filterMode === 'lowStock' && stock >= 15) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, inventoryMap, filterMode, searchQuery]);

  const totalUnits = useMemo(() => Object.values(inventoryMap).reduce((acc, inv) => acc + inv.totalStock, 0), [inventoryMap]);
  const lowStockCount = useMemo(() => products.filter((p) => (inventoryMap[p.id]?.totalStock ?? 20) < 15).length, [products, inventoryMap]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-neutral-900">Inventory & Logistics</h1>
          <p className="text-xs text-neutral-500">Multi-warehouse stock allocation and live inventory auditing.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search SKU or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-sand-300 focus:border-neutral-900 text-xs rounded-sm outline-none"
          />
          <div className="absolute left-3 top-2.5 text-neutral-400">
            <SearchIcon size={14} />
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      <AdminInventoryMetricCards
        totalUnits={totalUnits}
        totalSkus={products.length}
        lowStockSkus={lowStockCount}
        filterMode={filterMode}
        onFilterChange={setFilterMode}
      />

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">
          Syncing warehouse inventory logs...
        </div>
      ) : (
        <AdminInventoryTable
          products={filteredProducts}
          inventoryMap={inventoryMap}
          onOpenAdjustModal={(prod, loc) => {
            setAdjustingProduct(prod);
            if (loc) setAdjustLocation(loc);
          }}
        />
      )}

      <AdminStockAdjustmentModal
        product={adjustingProduct}
        locations={LOCATIONS}
        location={adjustLocation}
        onLocationChange={setAdjustLocation}
        adjustType={adjustType}
        onTypeChange={(t) => setAdjustType(t || 'RESTOCK')}
        quantity={adjustQuantity}
        onQuantityChange={setAdjustQuantity}
        reason={adjustReason}
        onReasonChange={setAdjustReason}
        isAdjusting={isAdjusting}
        onSubmit={handleAdjustSubmit}
        onClose={() => setAdjustingProduct(null)}
      />
    </div>
  );
}
