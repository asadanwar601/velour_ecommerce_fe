import apiClient from '../axios';
import {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  GoogleAuthPayload,
  OtpRequestPayload,
  OtpVerifyPayload,
  UserProfile,
} from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post('/auth/login', payload);
  return unwrapApiResponse<AuthResponse>(response);
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const response = await apiClient.post('/auth/signup', payload);
  return unwrapApiResponse<AuthResponse>(response);
}

export async function googleLogin(payload: GoogleAuthPayload): Promise<AuthResponse> {
  const response = await apiClient.post('/auth/google', payload);
  return unwrapApiResponse<AuthResponse>(response);
}

export async function requestOtp(payload: OtpRequestPayload): Promise<{ message: string }> {
  const response = await apiClient.post('/auth/otp/request', payload);
  return unwrapApiResponse<{ message: string }>(response);
}

export async function verifyOtp(payload: OtpVerifyPayload): Promise<AuthResponse> {
  const response = await apiClient.post('/auth/otp/verify', payload);
  return unwrapApiResponse<AuthResponse>(response);
}

export async function getMe(): Promise<UserProfile> {
  const response = await apiClient.get('/auth/me');
  return unwrapApiResponse<UserProfile>(response);
}

export async function refreshSessionToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; user: UserProfile }> {
  const response = await apiClient.post('/auth/refresh', { refreshToken });
  return unwrapApiResponse<{ accessToken: string; refreshToken: string; user: UserProfile }>(response);
}

export async function logout(): Promise<{ message: string }> {
  const response = await apiClient.post('/auth/logout');
  return unwrapApiResponse<{ message: string }>(response);
}
