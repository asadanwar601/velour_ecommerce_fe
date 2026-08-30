import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { getContactPageContent } from '@/lib/api';
import { MapPinIcon, ClockIcon, PhoneIcon, MailIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Client Concierge & Atelier Contact | VELOUR',
  description: 'Connect with the Velour Client Concierge for styling, sizing, bespoke fitting, and order inquiries.',
};

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <div className="container-narrow py-12 sm:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        {content.subtitle && (
          <span className="eyebrow block text-gold-600 dark:text-gold-400 font-semibold tracking-widest text-xs uppercase">
            {content.subtitle}
          </span>
        )}
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 leading-tight">
          {content.title}
        </h1>
        {content.description && (
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl pt-2">
            {content.description}
          </p>
        )}
      </div>

      {/* Concierge Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Email & Phone */}
        <div className="p-5 bg-white border border-sand-200 rounded-sm shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-gold-700">
            <MailIcon size={18} />
            <h4 className="font-serif text-base text-neutral-900 font-medium">Direct Concierge</h4>
          </div>
          <div className="text-xs space-y-1 text-neutral-600">
            <p className="font-medium text-neutral-900">{content.supportEmail || 'concierge@velour.com'}</p>
            <p>{content.supportPhone || '+1 (800) 555-0198'}</p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="p-5 bg-white border border-sand-200 rounded-sm shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-gold-700">
            <ClockIcon size={18} />
            <h4 className="font-serif text-base text-neutral-900 font-medium">Service Hours</h4>
          </div>
          <div className="text-xs text-neutral-600">
            <p className="leading-relaxed">{content.workingHours || 'Monday – Friday: 9:00 AM – 6:00 PM EST'}</p>
            <p className="text-[11px] text-neutral-400 mt-1">Weekend concierge available for VIP patrons.</p>
          </div>
        </div>

        {/* Flagship Location */}
        <div className="p-5 bg-white border border-sand-200 rounded-sm shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-gold-700">
            <MapPinIcon size={18} />
            <h4 className="font-serif text-base text-neutral-900 font-medium">Flagship Atelier</h4>
          </div>
          <div className="text-xs text-neutral-600">
            <p className="font-medium text-neutral-900">{content.addressLine1 || '482 Mercer Street'}</p>
            <p>{content.addressLine2 || 'SoHo, New York, NY 10013'}</p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Inquiry Process */}
      {content.contactStepsJson && content.contactStepsJson.length > 0 && (
        <div className="p-6 sm:p-8 bg-sand-50 border border-sand-200 rounded-sm space-y-4 shadow-sm">
          <div>
            <h3 className="font-serif text-xl text-neutral-900">How We Assist You</h3>
            <p className="text-xs text-neutral-500">Our structured protocol ensures fast, bespoke attention to every inquiry.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {content.contactStepsJson.map((step, idx) => (
              <div key={idx} className="p-4 bg-white border border-sand-200 rounded-sm space-y-2">
                <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                  {step.stepNumber}
                </div>
                <h4 className="font-semibold text-neutral-900 text-xs">{step.title}</h4>
                <p className="text-neutral-600 text-[11px] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Map */}
      {content.mapEmbedUrl && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-neutral-900">Atelier Location Map</h3>
            <span className="text-xs text-neutral-500">{content.addressLine1}, {content.addressLine2}</span>
          </div>
          <div className="w-full h-80 sm:h-96 rounded-sm overflow-hidden border border-sand-200 shadow-sm bg-sand-100">
            <iframe
              src={content.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Velour Flagship Location"
            />
          </div>
        </div>
      )}

      {/* Direct Inquiry Form */}
      <div className="p-6 sm:p-8 bg-white border border-sand-200 rounded-sm shadow-sm space-y-4">
        <h3 className="font-serif text-xl text-neutral-900">Send a Direct Inquiry</h3>
        <p className="text-xs text-neutral-500">
          Fill out the form below and our bespoke concierge will contact you within 24 hours.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
