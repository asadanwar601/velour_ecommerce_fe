'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  UserProfile,
  AuthResponse,
  LoginPayload,
  SignupPayload,
  GoogleAuthPayload,
  OtpRequestPayload,
  OtpVerifyPayload,
  SavedAddress,
} from '../types';
import * as authApi from '../api/authApi.service';
import * as accountApi from '../api/accountApi.service';
import {
  getStoredToken,
  setStoredToken,
  removeStoredToken,
  AUTH_UNAUTHORIZED_EVENT,
} from '../axios';
import { triggerGoogleSignIn } from '../google-auth';
import GoogleAuthModal from '@/components/GoogleAuthModal';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isGoogleModalOpen: boolean;
  openGoogleModal: (redirect?: string) => void;
  closeGoogleModal: () => void;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  signup: (payload: SignupPayload) => Promise<AuthResponse>;
  googleLogin: (payload?: Partial<GoogleAuthPayload>) => Promise<AuthResponse>;
  requestOtp: (payload: OtpRequestPayload) => Promise<{ message: string; channel: string }>;
  verifyOtp: (payload: OtpVerifyPayload) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<UserProfile | null>;
  saveAddress: (address: Omit<SavedAddress, 'id'> & { id?: string }) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleRedirect, setGoogleRedirect] = useState<string | undefined>();

  const openGoogleModal = useCallback((redirectUrl?: string) => {
    setGoogleRedirect(redirectUrl);
    setIsGoogleModalOpen(true);
  }, []);

  const closeGoogleModal = useCallback(() => {
    setIsGoogleModalOpen(false);
    setGoogleRedirect(undefined);
  }, []);

  const refreshUser = useCallback(async (): Promise<UserProfile | null> => {
    const currentToken = getStoredToken();
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setIsLoadingAuth(false);
      return null;
    }
    try {
      const userProfile = await authApi.getMe();
      setUser(userProfile);
      setToken(currentToken);
      return userProfile;
    } catch {
      removeStoredToken();
      setUser(null);
      setToken(null);
      return null;
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    const handleUnauthorized = () => {
      removeStoredToken();
      setUser(null);
      setToken(null);
    };
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [refreshUser]);

  const login = useCallback(async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await authApi.login(payload);
    if (response.accessToken) {
      setStoredToken(response.accessToken);
      setToken(response.accessToken);
      if (response.user) setUser(response.user);
    }
    return response;
  }, []);

  const signup = useCallback(async (payload: SignupPayload): Promise<AuthResponse> => {
    const response = await authApi.signup(payload);
    if (response.accessToken) {
      setStoredToken(response.accessToken);
      setToken(response.accessToken);
      if (response.user) setUser(response.user);
    }
    return response;
  }, []);

  const googleLogin = useCallback(async (payload?: Partial<GoogleAuthPayload>): Promise<AuthResponse> => {
    let response: AuthResponse;
    if (payload?.idToken || payload?.credential || payload?.accessToken || payload?.email) {
      response = await authApi.googleLogin(payload as GoogleAuthPayload);
    } else {
      response = await triggerGoogleSignIn();
    }
    if (response.accessToken) {
      setStoredToken(response.accessToken);
      setToken(response.accessToken);
    }
    if (response.user) {
      setUser(response.user);
    }
    closeGoogleModal();
    return response;
  }, [closeGoogleModal]);

  const requestOtp = useCallback(async (payload: OtpRequestPayload) => {
    const response = await authApi.requestOtp(payload);
    return { message: response.message, channel: payload.channel };
  }, []);

  const verifyOtp = useCallback(async (payload: OtpVerifyPayload): Promise<AuthResponse> => {
    const response = await authApi.verifyOtp(payload);
    if (response.accessToken) {
      setStoredToken(response.accessToken);
      setToken(response.accessToken);
    }
    if (response.user) {
      setUser(response.user);
    }
    return response;
  }, []);

  const logout = useCallback(() => {
    authApi.logout().catch(() => {});
    removeStoredToken();
    setUser(null);
    setToken(null);
  }, []);

  const saveAddress = useCallback((address: Omit<SavedAddress, 'id'> & { id?: string }) => {
    if (address.id) {
      accountApi.updateSavedAddress(address.id, address).then((updated) => {
        setUser((prev) => {
          if (!prev) return null;
          const updatedAddresses = (prev.addresses || []).map((a) => (a.id === updated.id ? updated : a));
          return { ...prev, addresses: updatedAddresses };
        });
      });
    } else {
      accountApi.createSavedAddress(address).then((created) => {
        setUser((prev) => {
          if (!prev) return null;
          return { ...prev, addresses: [...(prev.addresses || []), created] };
        });
      });
    }
  }, []);

  const deleteAddress = useCallback((addressId: string) => {
    accountApi.deleteSavedAddress(addressId).then(() => {
      setUser((prev) => {
        if (!prev) return null;
        return { ...prev, addresses: (prev.addresses || []).filter((a) => a.id !== addressId) };
      });
    });
  }, []);

  const setDefaultAddress = useCallback((addressId: string) => {
    accountApi.setDefaultSavedAddress(addressId).then(() => {
      setUser((prev) => {
        if (!prev) return null;
        const updated = (prev.addresses || []).map((a) => ({ ...a, isDefault: a.id === addressId }));
        return { ...prev, addresses: updated };
      });
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoadingAuth,
        isGoogleModalOpen,
        openGoogleModal,
        closeGoogleModal,
        login,
        signup,
        googleLogin,
        requestOtp,
        verifyOtp,
        logout,
        refreshUser,
        saveAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={closeGoogleModal}
        redirectTo={googleRedirect}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
