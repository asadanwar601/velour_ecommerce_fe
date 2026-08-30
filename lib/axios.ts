import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_CONFIG, STORAGE_KEYS } from './config';

// ─── CONFIGURATION CONSTANTS ────────────────────────────────────────────────
export const API_BASE_URL = API_CONFIG.baseUrl;
export const AUTH_TOKEN_KEY = STORAGE_KEYS.authToken;
export const DEVICE_ID_KEY = STORAGE_KEYS.deviceId;
export const AUTH_UNAUTHORIZED_EVENT = 'velour:unauthorized';

// ─── STRUCTURED API ERROR CLASS ─────────────────────────────────────────────
export class ApiError extends Error {
  statusCode: number;
  errorName: string;
  validationErrors?: string[];
  timestamp?: string;
  path?: string;
  originalError?: unknown;

  constructor(params: {
    message: string;
    statusCode?: number;
    errorName?: string;
    validationErrors?: string[];
    timestamp?: string;
    path?: string;
    originalError?: unknown;
  }) {
    super(params.message);
    this.name = 'ApiError';
    this.statusCode = params.statusCode || 500;
    this.errorName = params.errorName || 'InternalError';
    this.validationErrors = params.validationErrors;
    this.timestamp = params.timestamp || new Date().toISOString();
    this.path = params.path;
    this.originalError = params.originalError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// ─── AUTH & DEVICE STORAGE UTILITIES ────────────────────────────────────────

/**
 * Generates or retrieves a persistent guest device UUID from localStorage.
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') {
    return 'server-device-id';
  }

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `device-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

// ─── AXIOS INSTANCE FACTORY ─────────────────────────────────────────────────

/**
 * Factory to construct configurable Axios clients with predefined interceptors.
 */
export function createApiClient(config: AxiosRequestConfig = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 12000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    },
    ...config,
  });

  // 1. REQUEST INTERCEPTOR: Automatic Auth & Device ID Injection
  instance.interceptors.request.use(
    (reqConfig: InternalAxiosRequestConfig) => {
      if (typeof window !== 'undefined') {
        const token = getStoredToken();
        if (token && !reqConfig.headers.has('Authorization')) {
          reqConfig.headers.set('Authorization', `Bearer ${token}`);
        }

        const deviceId = getOrCreateDeviceId();
        if (deviceId && !reqConfig.headers.has('x-device-id')) {
          reqConfig.headers.set('x-device-id', deviceId);
        }
      }
      return reqConfig;
    },
    (error: AxiosError) => {
      return Promise.reject(
        new ApiError({
          message: error.message || 'Request setup failed',
          statusCode: 400,
          originalError: error,
        })
      );
    }
  );

  // 2. RESPONSE INTERCEPTOR: Envelope Unwrapping, 401 Auto-Handling & Error Normalization
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<any>) => {
      let statusCode = error.response?.status || 500;
      let message = 'An unexpected server error occurred';
      let errorName = 'ApiError';
      let validationErrors: string[] | undefined;
      let timestamp = new Date().toISOString();
      let path = error.config?.url;

      if (error.response?.data) {
        const responseBody = error.response.data;
        statusCode = responseBody.statusCode || statusCode;
        errorName = responseBody.error || errorName;
        timestamp = responseBody.timestamp || timestamp;
        path = responseBody.path || path;

        if (typeof responseBody.message === 'string') {
          message = responseBody.message;
        } else if (Array.isArray(responseBody.message)) {
          validationErrors = responseBody.message;
          message = responseBody.message.join(', ');
        }
      } else if (error.code === 'ECONNABORTED') {
        statusCode = 408;
        errorName = 'TimeoutError';
        message = 'The server took too long to respond. Please check your connection.';
      } else if (error.message === 'Network Error' || !error.response) {
        statusCode = 0;
        errorName = 'NetworkError';
        message = 'Unable to connect to the Velour API server. Please ensure the backend is running.';
      }

      // Automatic 401 Unauthorized handling
      if (statusCode === 401) {
        if (typeof window !== 'undefined') {
          removeStoredToken();
          window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
        }
      }

      const structuredError = new ApiError({
        message,
        statusCode,
        errorName,
        validationErrors,
        timestamp,
        path,
        originalError: error,
      });

      return Promise.reject(structuredError);
    }
  );

  return instance;
}

/**
 * Primary preconfigured Axios instance for application-wide API requests.
 */
export const apiClient = createApiClient();

/**
 * Public Axios instance (does not enforce or send auth token headers)
 */
export const publicApiClient = createApiClient();

export default apiClient;
