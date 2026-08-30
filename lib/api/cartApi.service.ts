import apiClient from '../axios';
import { CartResponse, Coupon } from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function getCart(couponCode?: string): Promise<CartResponse> {
  const response = await apiClient.get('/cart', { params: { coupon: couponCode } });
  return unwrapApiResponse<CartResponse>(response);
}

export async function addCartItem(payload: { productId: string; size: string; quantity?: number; deviceId?: string }): Promise<CartResponse> {
  const response = await apiClient.post('/cart/items', payload);
  return unwrapApiResponse<CartResponse>(response);
}

export async function updateCartItem(itemId: string, payload: { quantity: number }): Promise<CartResponse> {
  const response = await apiClient.patch(`/cart/items/${itemId}`, payload);
  return unwrapApiResponse<CartResponse>(response);
}

export async function removeCartItem(itemId: string): Promise<CartResponse> {
  const response = await apiClient.delete(`/cart/items/${itemId}`);
  return unwrapApiResponse<CartResponse>(response);
}

export async function clearCart(): Promise<CartResponse> {
  const response = await apiClient.delete('/cart');
  return unwrapApiResponse<CartResponse>(response);
}

export async function validateCoupon(couponCode: string): Promise<Coupon> {
  const response = await apiClient.post('/coupons/validate', { code: couponCode });
  return unwrapApiResponse<Coupon>(response);
}
