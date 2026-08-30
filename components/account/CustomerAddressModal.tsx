'use client';

import React from 'react';
import { SavedAddress } from '@/lib/types';
import { CloseIcon, MapPinIcon } from '@/components/Icons';

interface CustomerAddressModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: Omit<SavedAddress, 'id'>;
  onChange: (field: keyof Omit<SavedAddress, 'id'>, val: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export function CustomerAddressModal({
  isOpen,
  isEditing,
  formData,
  onChange,
  onSubmit,
  onClose,
}: CustomerAddressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl p-6 sm:p-8 space-y-5 text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <MapPinIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">
              {isEditing ? 'Edit Shipping Destination' : 'Add New Saved Address'}
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Address Label</label>
            <input
              type="text"
              required
              value={formData.label || ''}
              onChange={(e) => onChange('label', e.target.value)}
              placeholder="e.g. Manhattan Residence, Milan Flat"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName || ''}
                onChange={(e) => onChange('firstName', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName || ''}
                onChange={(e) => onChange('lastName', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Street Address</label>
            <input
              type="text"
              required
              value={formData.line1}
              onChange={(e) => onChange('line1', e.target.value)}
              placeholder="123 Fifth Avenue"
              className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => onChange('city', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">State</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => onChange('state', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">Zip Code</label>
              <input
                type="text"
                required
                value={formData.zip}
                onChange={(e) => onChange('zip', e.target.value)}
                className="w-full p-2.5 bg-sand-50 border border-sand-300 rounded-sm outline-none font-mono"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={!!formData.isDefault}
              onChange={(e) => onChange('isDefault', e.target.checked)}
              className="accent-neutral-900 w-4 h-4"
            />
            <span className="text-neutral-700">Set as default shipping address</span>
          </label>

          <div className="flex gap-2 pt-3 border-t border-sand-200">
            <button
              type="submit"
              className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white uppercase tracking-widest font-semibold rounded-sm transition-all"
            >
              {isEditing ? 'Save Address Changes' : 'Save New Address'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
