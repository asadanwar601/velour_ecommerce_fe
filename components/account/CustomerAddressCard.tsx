'use client';

import React from 'react';
import { SavedAddress } from '@/lib/types';
import { MapPinIcon, EditIcon, TrashIcon, CheckIcon } from '@/components/Icons';

interface CustomerAddressCardProps {
  address: SavedAddress;
  onEdit: (addr: SavedAddress) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function CustomerAddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: CustomerAddressCardProps) {
  return (
    <div
      className={`bg-white border rounded-sm p-5 shadow-sm flex flex-col justify-between space-y-4 ${
        address.isDefault ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-sand-200'
      }`}
    >
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
            <MapPinIcon size={14} />
            {address.label || 'Home'}
          </span>
          {address.isDefault ? (
            <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] uppercase font-bold rounded-sm">
              Default Address
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onSetDefault(address.id)}
              className="text-[11px] text-neutral-500 hover:text-neutral-900 underline"
            >
              Set as default
            </button>
          )}
        </div>

        <p className="font-semibold text-neutral-900">
          {`${address.firstName || ''} ${address.lastName || ''}`.trim() || 'Client'}
        </p>
        <p className="text-neutral-600">{address.line1} {address.line2 ? `• ${address.line2}` : ''}</p>
        <p className="text-neutral-600">{address.city}, {address.state} {address.zip}</p>
        {address.phone && <p className="text-neutral-400 font-mono text-[11px]">{address.phone}</p>}
      </div>

      <div className="pt-3 border-t border-sand-200 flex items-center justify-end gap-3 text-xs">
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="text-neutral-600 hover:text-neutral-900 font-medium flex items-center gap-1"
        >
          <EditIcon size={12} />
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(address.id)}
          className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
        >
          <TrashIcon size={12} />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
