'use client';

import React, { useState } from 'react';
import { useAuth, useToast } from '@/lib/store';
import { SavedAddress } from '@/lib/types';
import { PlusIcon, MapPinIcon } from '@/components/Icons';
import { CustomerAddressCard } from '@/components/account/CustomerAddressCard';
import { CustomerAddressModal } from '@/components/account/CustomerAddressModal';

export default function AccountAddressesPage() {
  const { user, saveAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<SavedAddress, 'id'>>({
    label: 'Home',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    line1: '',
    line2: '',
    city: '',
    state: 'NY',
    zip: '',
    country: 'US',
    isDefault: false,
  });

  if (!user) return null;
  const addresses = user.addresses || [];

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      label: 'Home',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      line1: '',
      line2: '',
      city: '',
      state: 'NY',
      zip: '',
      country: 'US',
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: SavedAddress) => {
    setEditingId(addr.id);
    setFormData({
      label: addr.label || 'Home',
      firstName: addr.firstName,
      lastName: addr.lastName,
      phone: addr.phone || '',
      line1: addr.line1,
      line2: addr.line2 || '',
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country || 'US',
      isDefault: addr.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.line1.trim() || !formData.city.trim() || !formData.zip.trim()) return;

    saveAddress({ ...formData, id: editingId || undefined });
    setIsModalOpen(false);
    showToast({
      title: editingId ? 'Address Updated' : 'Address Saved',
      message: `${formData.line1}, ${formData.city} saved.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-sand-200 pb-4">
        <div>
          <h1 className="font-serif text-2xl text-neutral-900">Saved Addresses</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage global delivery destinations for swift checkout.</p>
        </div>
        <button
          type="button"
          onClick={handleOpenNew}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 transition-all shadow-sm"
        >
          <PlusIcon size={14} />
          <span>New Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white border border-sand-200 p-12 text-center rounded-sm space-y-3 shadow-sm">
          <MapPinIcon size={24} className="mx-auto text-neutral-400" />
          <h3 className="font-serif text-lg text-neutral-900">No Addresses Saved</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Add your primary residence or international vacation villas for seamless courier delivery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <CustomerAddressCard
              key={address.id}
              address={address}
              onEdit={handleOpenEdit}
              onDelete={(id) => deleteAddress(id)}
              onSetDefault={(id) => setDefaultAddress(id)}
            />
          ))}
        </div>
      )}

      <CustomerAddressModal
        isOpen={isModalOpen}
        isEditing={!!editingId}
        formData={formData}
        onChange={(field, val) => setFormData((prev) => ({ ...prev, [field]: val }))}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
