'use client';

import React, { useState, useEffect } from 'react';
import {
  getBrandSettings,
  updateBrandSettings,
  deleteBrandLogo,
  deleteAppIcon,
} from '@/lib/api';
import { BrandSettings } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/config';
import { CheckIcon } from '@/components/Icons';
import { AdminBrandIdentitySettings } from '@/components/admin/settings/AdminBrandIdentitySettings';
import { AdminBrandLogoUploadSection } from '@/components/admin/settings/AdminBrandLogoUploadSection';

export default function AdminSettingsPage() {
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
    description: SITE_CONFIG.description,
    logoUrl: SITE_CONFIG.defaultLogoUrl,
    iconUrl: SITE_CONFIG.defaultIconUrl,
    supportEmail: SITE_CONFIG.supportEmail,
    supportPhone: SITE_CONFIG.supportPhone,
    instagramUrl: SITE_CONFIG.instagramUrl,
    currency: SITE_CONFIG.defaultCurrency,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingBrand, setIsSavingBrand] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadAllSettings = async () => {
    try {
      setIsLoading(true);
      const brand = await getBrandSettings();
      setBrandSettings(brand);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllSettings();
  }, []);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSavingBrand(true);
      const updated = await updateBrandSettings(brandSettings);
      setBrandSettings(updated);
      showNotification('Maison Brand Settings updated successfully.');
    } catch (err: any) {
      alert(err.message || 'Failed to save settings.');
    } finally {
      setIsSavingBrand(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Brand Dossier & Social Identity</h1>
        <p className="text-xs text-neutral-500">Configure global maison identity, concierge channels, and social presence.</p>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">
          Loading atelier settings...
        </div>
      ) : (
        <div className="space-y-6">
          <AdminBrandIdentitySettings
            settings={brandSettings}
            onChange={(f, v) => setBrandSettings((prev) => ({ ...prev, [f]: v }))}
            isSaving={isSavingBrand}
            onSave={handleSaveBrand}
          />

          <AdminBrandLogoUploadSection
            logoUrl={brandSettings.logoUrl}
            iconUrl={brandSettings.iconUrl}
            onLogoUpload={async () => {
              showNotification('Logo asset updated.');
            }}
            onIconUpload={async () => {
              showNotification('Icon asset updated.');
            }}
            onDeleteLogo={async () => {
              await deleteBrandLogo();
              setBrandSettings((prev) => ({ ...prev, logoUrl: '' }));
              showNotification('Reset logo to default.');
            }}
            onDeleteIcon={async () => {
              await deleteAppIcon();
              setBrandSettings((prev) => ({ ...prev, iconUrl: '' }));
              showNotification('Reset icon to default.');
            }}
          />
        </div>
      )}
    </div>
  );
}
