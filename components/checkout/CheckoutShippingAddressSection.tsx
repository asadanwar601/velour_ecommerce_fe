'use client';

import React from 'react';
import { UserProfile, SavedAddress } from '@/lib/types';
import { GoogleIcon, UserIcon, MapPinIcon } from '@/components/Icons';

interface CheckoutShippingAddressSectionProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  selectedSavedAddressId: string;
  onSelectSavedAddress: (addrId: string) => void;
  onOpenGoogleModal: () => void;
}

export function CheckoutShippingAddressSection({
  formData,
  onChange,
  user,
  isAuthenticated,
  selectedSavedAddressId,
  onSelectSavedAddress,
  onOpenGoogleModal,
}: CheckoutShippingAddressSectionProps) {
  return (
    <div className="space-y-6">
      {/* Auth State Banner */}
      {!isAuthenticated && (
        <div className="bg-sand-50 border border-sand-200 p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-sand-300 flex items-center justify-center text-neutral-600">
              <UserIcon size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">Sign in for luxury checkout privileges</p>
              <p className="text-xs text-neutral-500">Auto-fill addresses, track order timeline & manage returns.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenGoogleModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-800 text-xs uppercase tracking-wider font-semibold rounded-sm shadow-sm transition-all whitespace-nowrap"
          >
            <GoogleIcon size={16} />
            Continue with Google
          </button>
        </div>
      )}

      {/* Saved Addresses Picker */}
      {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
        <div>
          <label className="text-xs uppercase tracking-wider text-neutral-600 font-semibold mb-3 flex items-center gap-2">
            <MapPinIcon size={14} />
            Select Saved Atelier Address
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.addresses.map((address: SavedAddress) => (
              <div
                key={address.id}
                onClick={() => onSelectSavedAddress(address.id)}
                className={`p-4 border rounded-sm cursor-pointer transition-all ${
                  selectedSavedAddressId === address.id
                    ? 'border-neutral-900 bg-sand-50 ring-1 ring-neutral-900'
                    : 'border-sand-200 bg-white hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                    {address.label || 'Address'}
                  </span>
                  {address.isDefault && (
                    <span className="text-[10px] bg-neutral-900 text-white px-2 py-0.5 uppercase tracking-widest font-semibold rounded-sm">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-700 font-medium">{`${address.firstName || formData.firstName} ${address.lastName || formData.lastName}`.trim() || 'Client'}</p>
                <p className="text-xs text-neutral-500">{address.line1} {address.line2 || ''}</p>
                <p className="text-xs text-neutral-500">{address.city}, {address.state} {address.zip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shipping Address Inputs */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-900 border-b border-sand-200 pb-2">
          1. Shipping & Recipient Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Phone Number (For Courier) *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={onChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Street Address *</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={onChange}
            placeholder="Avenue / Street address"
            className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">City *</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">State / Region *</label>
            <input
              type="text"
              name="state"
              required
              value={formData.state}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Postal Code *</label>
            <input
              type="text"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={onChange}
              className="w-full px-3.5 py-2.5 bg-sand-50/50 border border-sand-300 focus:border-neutral-900 focus:bg-white text-sm text-neutral-900 rounded-sm outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
