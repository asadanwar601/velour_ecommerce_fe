import apiClient from '../axios';
import { BrandSettings } from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function getBrandSettings(): Promise<BrandSettings> {
  try {
    const response = await apiClient.get('/settings/brand');
    return unwrapApiResponse<BrandSettings>(response);
  } catch {
    return {
      brandName: 'VELOUR',
      tagline: 'Timeless luxury essentials.',
      logoUrl: null,
      appIconUrl: null,
    };
  }
}

export async function updateBrandSettings(payload: Partial<BrandSettings>): Promise<BrandSettings> {
  // Strip non-DTO metadata fields that the backend forbids via forbidNonWhitelisted ValidationPipe
  const {
    id: _id,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    appIconUrl: _appIconUrl,
    description: _description,
    ...cleanPayload
  } = payload as any;

  const response = await apiClient.patch('/settings/brand', cleanPayload);
  return unwrapApiResponse<BrandSettings>(response);
}

export async function deleteBrandLogo(): Promise<BrandSettings> {
  const response = await apiClient.delete('/settings/brand/logo');
  return unwrapApiResponse<BrandSettings>(response);
}

export async function deleteAppIcon(): Promise<BrandSettings> {
  const response = await apiClient.delete('/settings/brand/app-icon');
  return unwrapApiResponse<BrandSettings>(response);
}

export async function getAvailableSizes(): Promise<string[]> {
  try {
    const response = await apiClient.get('/settings/sizes');
    return unwrapApiResponse<string[]>(response);
  } catch {
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42', '44'];
  }
}

export async function addCustomSize(size: string): Promise<string[]> {
  const response = await apiClient.post('/settings/sizes', { size });
  return unwrapApiResponse<string[]>(response);
}

export async function deleteCustomSize(size: string): Promise<string[]> {
  const response = await apiClient.delete(`/settings/sizes/${encodeURIComponent(size)}`);
  return unwrapApiResponse<string[]>(response);
}

export async function getAvailableTags(): Promise<string[]> {
  try {
    const response = await apiClient.get('/settings/tags');
    return unwrapApiResponse<string[]>(response);
  } catch {
    return ['Cashmere', 'Silk', 'Evening', 'Outerwear', 'Tailored', 'Bespoke', 'Sustainable'];
  }
}

export async function addCustomTag(tag: string): Promise<string[]> {
  const response = await apiClient.post('/settings/tags', { tag });
  return unwrapApiResponse<string[]>(response);
}

export async function deleteCustomTag(tag: string): Promise<string[]> {
  const response = await apiClient.delete(`/settings/tags/${encodeURIComponent(tag)}`);
  return unwrapApiResponse<string[]>(response);
}
