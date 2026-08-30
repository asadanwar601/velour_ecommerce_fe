import apiClient from '../axios';
import { Coupon } from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function getAllCouponsAdmin(): Promise<Coupon[]> {
  try {
    const response = await apiClient.get('/coupons');
    return unwrapApiResponse<Coupon[]>(response);
  } catch {
    return [];
  }
}

export async function createCoupon(payload: any): Promise<Coupon> {
  const response = await apiClient.post('/coupons', payload);
  return unwrapApiResponse<Coupon>(response);
}

export async function deleteCoupon(couponId: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete(`/coupons/${couponId}`);
  return unwrapApiResponse<{ success: boolean }>(response);
}

export async function updateCoupon(couponId: string, payload: any): Promise<Coupon> {
  const response = await apiClient.patch(`/coupons/${couponId}`, payload);
  return unwrapApiResponse<Coupon>(response);
}
