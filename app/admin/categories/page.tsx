'use client';

import React, { useState, useEffect } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  deleteSubcategory,
} from '@/lib/api';
import { CategoryConfig } from '@/lib/types';
import { PlusIcon, CheckIcon, LayersIcon, SlidersIcon, TagIcon } from '@/components/Icons';
import { AdminCategoryCard } from '@/components/admin/categories/AdminCategoryCard';
import { AdminCategoryModal } from '@/components/admin/categories/AdminCategoryModal';
import { AdminSizesTaxonomySection } from '@/components/admin/categories/AdminSizesTaxonomySection';
import { AdminTagsTaxonomySection } from '@/components/admin/categories/AdminTagsTaxonomySection';

type TaxonomyTab = 'categories' | 'sizes' | 'tags';

export default function AdminCategoriesPage() {
  const [activeTab, setActiveTab] = useState<TaxonomyTab>('categories');
  const [categories, setCategories] = useState<CategoryConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryConfig | null>(null);
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch {
      notify('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormName('');
    setFormSlug('');
    setFormDesc('');
    setShowModal(true);
  };

  const handleOpenEdit = (cat: CategoryConfig) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDesc(cat.description || '');
    setShowModal(true);
  };

  const handleSaveCategory = async () => {
    if (!formName.trim()) return notify('Category name is required');
    const slug = formSlug.trim() || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setIsSaving(true);
    try {
      if (editingCategory) {
        const updated = await updateCategory(editingCategory.id, {
          name: formName.trim(),
          slug,
          description: formDesc.trim(),
        });
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)));
        notify(`Category "${updated.name}" updated`);
      } else {
        const created = await createCategory(formName.trim(), formDesc.trim());
        setCategories((prev) => [...prev, created]);
        notify(`Category "${created.name}" created`);
      }
      setShowModal(false);
    } catch {
      notify('Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      notify('Category deleted');
    } catch {
      notify('Failed to delete category');
    }
  };

  const handleAddSubcategory = async (catId: string, name: string) => {
    try {
      const updated = await createSubcategory(catId, name);
      setCategories((prev) => prev.map((c) => (c.id === catId ? { ...c, ...updated } : c)));
      notify(`Subcategory "${name}" added`);
    } catch {
      notify('Failed to add subcategory');
    }
  };

  const handleDeleteSubcategory = async (catId: string, subName: string) => {
    try {
      const updated = await deleteSubcategory(catId, subName);
      setCategories((prev) => prev.map((c) => (c.id === catId ? { ...c, ...updated } : c)));
      notify('Subcategory removed');
    } catch {
      notify('Failed to remove subcategory');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-sand-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl text-neutral-900">Categories & Taxonomy Hub</h1>
          <p className="text-xs text-neutral-500">
            Centralized management of product hierarchies, sizing standards, and marketing tags.
          </p>
        </div>
        {activeTab === 'categories' && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <PlusIcon size={14} />
            <span>New Category</span>
          </button>
        )}
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-sand-200 gap-4 text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'categories'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <LayersIcon size={16} />
          <span>Categories & Hierarchy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sizes')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'sizes'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <SlidersIcon size={16} />
          <span>Garment Sizing Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tags')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'tags'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <TagIcon size={16} />
          <span>Marketing & Materiality Tags</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'categories' && (
        isLoading ? (
          <div className="py-12 text-center text-xs text-neutral-500">Loading taxonomy...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <AdminCategoryCard
                key={cat.id}
                category={cat}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteCategory}
                onAddSubcategory={handleAddSubcategory}
                onDeleteSubcategory={handleDeleteSubcategory}
              />
            ))}
          </div>
        )
      )}

      {activeTab === 'sizes' && <AdminSizesTaxonomySection />}
      {activeTab === 'tags' && <AdminTagsTaxonomySection />}

      <AdminCategoryModal
        isOpen={showModal}
        isEditing={!!editingCategory}
        name={formName}
        onNameChange={setFormName}
        slug={formSlug}
        onSlugChange={setFormSlug}
        description={formDesc}
        onDescriptionChange={setFormDesc}
        isSaving={isSaving}
        onSubmit={handleSaveCategory}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
