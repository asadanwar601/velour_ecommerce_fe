import apiClient from '../axios';
import { UserProfile, SavedAddress, SecuritySettings } from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function getProfile(): Promise<UserProfile> {
  const response = await apiClient.get('/account/profile');
  return unwrapApiResponse<UserProfile>(response);
}

export async function updateProfile(payload: Partial<UserProfile>): Promise<UserProfile> {
  const response = await apiClient.patch('/account/profile', payload);
  return unwrapApiResponse<UserProfile>(response);
}

export async function changePassword(payload: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
  const response = await apiClient.post('/account/change-password', payload);
  return unwrapApiResponse<{ message: string }>(response);
}

export async function getSecuritySettings(): Promise<SecuritySettings> {
  const response = await apiClient.get('/account/security');
  return unwrapApiResponse<SecuritySettings>(response);
}

export async function toggle2FA(): Promise<{ twoFactorEnabled: boolean; message: string }> {
  const response = await apiClient.post('/account/toggle-2fa');
  return unwrapApiResponse<{ twoFactorEnabled: boolean; message: string }>(response);
}

export async function logoutAllSessions(): Promise<{ message: string }> {
  const response = await apiClient.post('/account/logout-all');
  return unwrapApiResponse<{ message: string }>(response);
}

export async function getSavedAddresses(): Promise<SavedAddress[]> {
  const response = await apiClient.get('/account/addresses');
  return unwrapApiResponse<SavedAddress[]>(response);
}

export async function createSavedAddress(payload: Partial<SavedAddress>): Promise<SavedAddress> {
  const response = await apiClient.post('/account/addresses', payload);
  return unwrapApiResponse<SavedAddress>(response);
}

export async function updateSavedAddress(addressId: string, payload: Partial<SavedAddress>): Promise<SavedAddress> {
  const response = await apiClient.patch(`/account/addresses/${addressId}`, payload);
  return unwrapApiResponse<SavedAddress>(response);
}

export async function deleteSavedAddress(addressId: string): Promise<{ success: boolean }> {
  const response = await apiClient.delete(`/account/addresses/${addressId}`);
  return unwrapApiResponse<{ success: boolean }>(response);
}

export async function setDefaultSavedAddress(addressId: string): Promise<SavedAddress> {
  const response = await apiClient.post(`/account/addresses/${addressId}/set-default`);
  return unwrapApiResponse<SavedAddress>(response);
}
