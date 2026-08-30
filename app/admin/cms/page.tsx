'use client';

import React, { useState, useEffect } from 'react';
import {
  getAboutPageContent,
  updateAboutPageContent,
  getContactPageContent,
  updateContactPageContent,
} from '@/lib/api';
import { AboutPageContent, ContactPageContent } from '@/lib/types';
import { CheckIcon, SparklesIcon, MapPinIcon } from '@/components/Icons';
import { AdminAboutCmsForm } from '@/components/admin/cms/AdminAboutCmsForm';
import { AdminContactCmsForm } from '@/components/admin/cms/AdminContactCmsForm';

type CmsTab = 'about' | 'contact';

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<CmsTab>('about');
  const [aboutContent, setAboutContent] = useState<AboutPageContent | null>(null);
  const [contactContent, setContactContent] = useState<ContactPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [about, contact] = await Promise.all([
        getAboutPageContent(),
        getContactPageContent(),
      ]);
      setAboutContent(about);
      setContactContent(contact);
    } catch (err) {
      console.error('Failed to load CMS data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutContent) return;
    try {
      setIsSaving(true);
      const updated = await updateAboutPageContent(aboutContent);
      setAboutContent(updated);
      showNotification('About Us page content published successfully.');
    } catch (err: any) {
      alert(err.message || 'Failed to update About Us page.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactContent) return;
    try {
      setIsSaving(true);
      const updated = await updateContactPageContent(contactContent);
      setContactContent(updated);
      showNotification('Contact Us page content published successfully.');
    } catch (err: any) {
      alert(err.message || 'Failed to update Contact Us page.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-neutral-900">Pages & Content CMS</h1>
        <p className="text-xs text-neutral-500">
          Dynamically control and format the editorial narrative, rich text stories, and concierge contact features.
        </p>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckIcon size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-sand-200 gap-4 text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'about'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <SparklesIcon size={16} />
          <span>About Us Editorial</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <MapPinIcon size={16} />
          <span>Contact Us & Map</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-neutral-500">
          Loading editorial page content...
        </div>
      ) : activeTab === 'about' && aboutContent ? (
        <AdminAboutCmsForm
          content={aboutContent}
          onChange={(field, val) => setAboutContent((prev) => prev ? { ...prev, [field]: val } : null)}
          isSaving={isSaving}
          onSave={handleSaveAbout}
        />
      ) : activeTab === 'contact' && contactContent ? (
        <AdminContactCmsForm
          content={contactContent}
          onChange={(field, val) => setContactContent((prev) => prev ? { ...prev, [field]: val } : null)}
          isSaving={isSaving}
          onSave={handleSaveContact}
        />
      ) : null}
    </div>
  );
}
