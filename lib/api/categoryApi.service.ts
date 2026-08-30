import apiClient from '../axios';
import { CategoryConfig } from '../types';
import { CATEGORIES } from '../data';
import { unwrapApiResponse } from './unwrap.util';

export async function getCategories(): Promise<CategoryConfig[]> {
  try {
    const response = await apiClient.get('/categories');
    return unwrapApiResponse<CategoryConfig[]>(response);
  } catch {
    return CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.id,
      description: (c as any).description || '',
      subcategories: c.subcategories,
      isActive: true,
    }));
  }
}

export async function getCategoriesAdmin(): Promise<CategoryConfig[]> {
  return getCategories();
}

export const getAllCategories = getCategories;

export async function subcategoriesFor(categoryId: string): Promise<string[]> {
  const cats = await getCategories();
  const found = cats.find((c) => c.id.toLowerCase() === categoryId.toLowerCase() || c.slug.toLowerCase() === categoryId.toLowerCase());
  return found?.subcategories || [];
}

export async function createCategory(name: string, description?: string): Promise<CategoryConfig> {
  const response = await apiClient.post('/categories', { name, description });
  return unwrapApiResponse<CategoryConfig>(response);
}

export async function updateCategory(id: string, payload: { name?: string; slug?: string; description?: string }): Promise<CategoryConfig> {
  const response = await apiClient.patch(`/categories/${id}`, payload);
  return unwrapApiResponse<CategoryConfig>(response);
}

export async function deleteCategory(id: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete(`/categories/${id}`);
  return unwrapApiResponse<{ success: boolean }>(response);
}

export async function createSubcategory(categoryId: string, name: string): Promise<CategoryConfig> {
  const response = await apiClient.post(`/categories/${categoryId}/subcategories`, { name });
  return unwrapApiResponse<CategoryConfig>(response);
}

export async function deleteSubcategory(categoryId: string, subcategoryName: string): Promise<CategoryConfig> {
  const response = await apiClient.delete(`/categories/${categoryId}/subcategories/${encodeURIComponent(subcategoryName)}`);
  return unwrapApiResponse<CategoryConfig>(response);
}
