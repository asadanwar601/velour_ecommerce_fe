import apiClient from '../axios';
import { Product, FilterParams, ProductFacets, ProductSizeGuide } from '../types';
import { PRODUCTS } from '../data';
import { unwrapApiResponse } from './unwrap.util';

export async function getProducts(filterParams: FilterParams = {}): Promise<Product[]> {
  try {
    const queryParams: Record<string, string | number> = {};
    if (filterParams.category) queryParams.category = filterParams.category;
    if (filterParams.subcategory && filterParams.subcategory !== 'all') queryParams.subcategory = filterParams.subcategory;
    if (filterParams.size) queryParams.sizes = filterParams.size;
    if (filterParams.color) queryParams.colors = filterParams.color;
    if (filterParams.minPrice !== undefined) queryParams.minPrice = filterParams.minPrice;
    if (filterParams.maxPrice !== undefined) queryParams.maxPrice = filterParams.maxPrice;
    if (filterParams.sort) queryParams.sort = filterParams.sort;
    if (filterParams.query) queryParams.query = filterParams.query;
    if (filterParams.limit) queryParams.limit = filterParams.limit;
    if (filterParams.page) queryParams.page = filterParams.page;

    const response = await apiClient.get('/products', { params: queryParams });
    return unwrapApiResponse<Product[]>(response);
  } catch (error) {
    console.warn('[API] /products failed, falling back to local dataset:', (error as Error).message);
    let list = [...PRODUCTS];
    if (filterParams.category) {
      list = list.filter((p) => p.category === filterParams.category);
    }
    if (filterParams.subcategory && filterParams.subcategory !== 'all') {
      list = list.filter((p) => p.subcategory.toLowerCase() === filterParams.subcategory?.toLowerCase());
    }
    return list;
  }
}

export async function getProduct(productIdOrSlug: string): Promise<Product | null> {
  try {
    const response = await apiClient.get(`/products/${productIdOrSlug}`);
    return unwrapApiResponse<Product>(response);
  } catch (error) {
    console.warn(`[API] /products/${productIdOrSlug} failed, searching local dataset:`, (error as Error).message);
    const found = PRODUCTS.find((p) => p.id === productIdOrSlug || p.slug === productIdOrSlug);
    return found || null;
  }
}

export async function getProductFacets(categoryScope?: string): Promise<ProductFacets> {
  try {
    const response = await apiClient.get('/products/facets', { params: { category: categoryScope } });
    return unwrapApiResponse<ProductFacets>(response);
  } catch (error) {
    return {
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Camel', 'Ivory', 'Navy'],
      subcategories: [],
      priceRange: { min: 0, max: 1500 },
    };
  }
}

export async function getProductSizeGuide(productIdOrSlug: string): Promise<ProductSizeGuide | null> {
  try {
    const response = await apiClient.get(`/products/${productIdOrSlug}/size-guide`);
    return unwrapApiResponse<ProductSizeGuide>(response);
  } catch (error) {
    return null;
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const response = await apiClient.get('/products/featured', { params: { limit } });
    return unwrapApiResponse<Product[]>(response);
  } catch {
    return PRODUCTS.filter((p) => p.featured).slice(0, limit);
  }
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  try {
    const response = await apiClient.get('/products/new-arrivals', { params: { limit } });
    return unwrapApiResponse<Product[]>(response);
  } catch {
    return PRODUCTS.filter((p) => p.isNew).slice(0, limit);
  }
}

export async function getTrendingProducts(limit = 8): Promise<Product[]> {
  try {
    const response = await apiClient.get('/products/trending', { params: { limit } });
    return unwrapApiResponse<Product[]>(response);
  } catch {
    return PRODUCTS.filter((p) => p.trending).slice(0, limit);
  }
}

export async function getRelatedProducts(productIdOrSlug: string, limit = 4): Promise<Product[]> {
  try {
    const response = await apiClient.get(`/products/${productIdOrSlug}/related`, { params: { limit } });
    return unwrapApiResponse<Product[]>(response);
  } catch {
    return PRODUCTS.slice(0, limit);
  }
}

export async function searchProducts(queryText: string, limit = 8): Promise<Product[]> {
  try {
    const response = await apiClient.get('/search', { params: { q: queryText, limit } });
    return unwrapApiResponse<Product[]>(response);
  } catch {
    const q = queryText.toLowerCase();
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)).slice(0, limit);
  }
}

export async function getBatchProducts(productIdentifiers: string[]): Promise<Product[]> {
  try {
    const response = await apiClient.post('/products/batch', { ids: productIdentifiers });
    return unwrapApiResponse<Product[]>(response);
  } catch {
    return PRODUCTS.filter((p) => productIdentifiers.includes(p.id) || (p.slug && productIdentifiers.includes(p.slug)));
  }
}

export const getProductById = getProduct;
export const getFeatured = getFeaturedProducts;
export const getTrending = getTrendingProducts;
export const getRelated = getRelatedProducts;

