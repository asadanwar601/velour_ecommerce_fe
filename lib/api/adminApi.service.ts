import apiClient from '../axios';
import {
  AdminDashboardStats,
  AdminOrderFilterParams,
  AdminUser,
  AdminUserFilterParams,
  CreateProductDto,
  ImageUploadResult,
  InventoryAdjustDto,
  InventoryAdjustmentResult,
  LowStockItem,
  Order,
  Product,
  ProductInventoryBreakdown,
  UpdateAdminUserDto,
  UpdateProductDto,
} from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const response = await apiClient.get('/admin/stats');
  return unwrapApiResponse<AdminDashboardStats>(response);
}

export async function getAdminProducts(): Promise<Product[]> {
  const response = await apiClient.get('/products', { params: { limit: 100 } });
  return unwrapApiResponse<Product[]>(response);
}

export async function createAdminProduct(payload: CreateProductDto): Promise<Product> {
  const response = await apiClient.post('/products', payload);
  return unwrapApiResponse<Product>(response);
}

export async function updateAdminProduct(productId: string, payload: UpdateProductDto): Promise<Product> {
  const response = await apiClient.patch(`/products/${productId}`, payload);
  return unwrapApiResponse<Product>(response);
}

export async function deleteAdminProduct(productId: string): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.delete(`/products/${productId}`);
  return unwrapApiResponse<{ success: boolean; message: string }>(response);
}

export async function uploadProductImage(file: File): Promise<ImageUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return unwrapApiResponse<ImageUploadResult>(response);
}

export async function getAdminOrders(params: AdminOrderFilterParams = {}): Promise<{ data: Order[]; meta: any }> {
  const response = await apiClient.get('/orders', { params });
  return unwrapApiResponse<{ data: Order[]; meta: any }>(response);
}

export async function updateAdminOrderStatus(orderId: string, status: string): Promise<Order> {
  const response = await apiClient.patch(`/orders/${orderId}/status`, { status });
  return unwrapApiResponse<Order>(response);
}

export async function getAdminInventory(): Promise<ProductInventoryBreakdown[]> {
  const response = await apiClient.get('/inventory');
  return unwrapApiResponse<ProductInventoryBreakdown[]>(response);
}

export async function getLowStockAlerts(): Promise<LowStockItem[]> {
  const response = await apiClient.get('/inventory/low-stock');
  return unwrapApiResponse<LowStockItem[]>(response);
}

export async function adjustInventoryStock(payload: InventoryAdjustDto): Promise<InventoryAdjustmentResult> {
  const response = await apiClient.post('/inventory/adjust', payload);
  return unwrapApiResponse<InventoryAdjustmentResult>(response);
}

export async function getAdminUsers(params: AdminUserFilterParams = {}): Promise<{ data: AdminUser[]; meta: any }> {
  const queryParams: Record<string, any> = {};
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.query) queryParams.search = params.query;
  if (params.role && params.role !== 'ALL') queryParams.role = params.role;
  if (params.status && params.status !== 'ALL') queryParams.status = params.status;

  const response = await apiClient.get('/admin/users', { params: queryParams });
  return unwrapApiResponse<{ data: AdminUser[]; meta: any }>(response);
}

export async function updateAdminUser(userId: string, payload: UpdateAdminUserDto): Promise<AdminUser> {
  const response = await apiClient.patch(`/admin/users/${userId}`, payload);
  return unwrapApiResponse<AdminUser>(response);
}

export async function archiveAdminUser(userId: string): Promise<AdminUser> {
  const response = await apiClient.post(`/admin/users/${userId}/archive`);
  return unwrapApiResponse<AdminUser>(response);
}

export async function deleteAdminUser(userId: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete(`/admin/users/${userId}`);
  return unwrapApiResponse<{ success: boolean }>(response);
}

export async function inviteAdminUser(payload: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}): Promise<{ message: string; user: AdminUser }> {
  const response = await apiClient.post('/admin/users/invite-admin', payload);
  return unwrapApiResponse<{ message: string; user: AdminUser }>(response);
}

export const createProduct = createAdminProduct;
export const updateProduct = updateAdminProduct;
export const deleteProduct = deleteAdminProduct;

