'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getAvailableSizes,
  getAvailableTags,
} from '@/lib/api';
import { Product, CategoryConfig } from '@/lib/types';
import { CheckIcon } from '@/components/Icons';
import { AdminProductFilterBar } from '@/components/admin/products/AdminProductFilterBar';
import { AdminProductFormModal } from '@/components/admin/products/AdminProductFormModal';
import { AdminProductTable } from '@/components/admin/products/AdminProductTable';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryConfig[]>([]);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Velour Atelier',
    category: 'women',
    subcategory: 'Outerwear',
    price: 340,
    compareAtPrice: undefined as number | undefined,
    description: '',
    sizes: ['S', 'M', 'L'],
    images: [] as string[],
    featured: false,
    isNew: true,
    trending: false,
    tags: [] as string[],
    initialStock: 25,
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [prods, cats, sizes, tags] = await Promise.all([
        getProducts({ limit: 100 }),
        getCategories(),
        getAvailableSizes(),
        getAvailableTags(),
      ]);
      setProducts(prods);
      setCategoriesList(cats);
      setAvailableSizes(sizes);
      setAvailableTags(tags);
    } catch (err) {
      console.error('Failed to load products data:', err);
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

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: 'Velour Atelier',
      category: categoriesList[0]?.id || 'women',
      subcategory: categoriesList[0]?.subcategories[0] || 'Outerwear',
      price: 350,
      compareAtPrice: undefined,
      description: '',
      sizes: ['S', 'M', 'L'],
      images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'],
      featured: false,
      isNew: true,
      trending: false,
      tags: [],
      initialStock: 20,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      brand: p.brand || 'Velour Atelier',
      category: p.category,
      subcategory: p.subcategory,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      description: p.description,
      sizes: p.sizes || ['S', 'M', 'L'],
      images: p.images || [],
      featured: !!p.featured,
      isNew: !!p.isNew,
      trending: !!p.trending,
      tags: p.tags || [],
      initialStock: (p as any).inStock || (p as any).stock || 15,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, formData as any);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showNotification(`Garment "${updated.name}" updated.`);
      } else {
        const created = await createProduct(formData as any);
        setProducts((prev) => [created, ...prev]);
        showNotification(`New piece "${created.name}" introduced.`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Permanently remove "${product.name}" from catalog?`)) return;
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      showNotification(`"${product.name}" removed from catalogue.`);
    } catch (err: any) {
      alert(err.message || 'Failed to delete garment.');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Garments & Catalogue</h1>
        <p className="text-xs text-neutral-500">Manage bespoke collections, pricing, size runs, and product images.</p>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      <AdminProductFilterBar
        categories={categoriesList}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={handleOpenCreate}
      />

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">
          Loading catalog pieces...
        </div>
      ) : (
        <AdminProductTable
          products={filteredProducts}
          onEditProduct={handleOpenEdit}
          onDeleteProduct={handleDelete}
        />
      )}

      <AdminProductFormModal
        isOpen={isModalOpen}
        isEditing={!!editingProduct}
        categories={categoriesList}
        availableSizes={availableSizes}
        availableTags={availableTags}
        formData={formData}
        onChange={(field, val) => setFormData((prev) => ({ ...prev, [field]: val }))}
        onToggleSize={(size) =>
          setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
              ? prev.sizes.filter((s) => s !== size)
              : [...prev.sizes, size],
          }))
        }
        onToggleTag={(tag) =>
          setFormData((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
              ? prev.tags.filter((t) => t !== tag)
              : [...prev.tags, tag],
          }))
        }
        onAddImage={(url) => setFormData((prev) => ({ ...prev, images: [...prev.images, url] }))}
        onRemoveImage={(idx) => setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
