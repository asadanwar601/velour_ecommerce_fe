import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getAboutPageContent } from '@/lib/api';

export const metadata: Metadata = {
  title: 'About The Atelier | VELOUR',
  description: 'The philosophy of quiet luxury, artisanal construction, and pure natural fabrics.',
};

export default async function AboutPage() {
  const content = await getAboutPageContent();

  return (
    <div className="container-narrow py-12 sm:py-16 space-y-12">
      {/* Hero Header */}
      <ScrollReveal>
        <div className="space-y-2">
          {content.heroSubtitle && (
            <span className="eyebrow block text-gold-600 dark:text-gold-400 font-semibold tracking-widest text-xs uppercase">
              {content.heroSubtitle}
            </span>
          )}
          <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 leading-tight">
            {content.heroTitle}
          </h1>
        </div>
      </ScrollReveal>

      {/* Banner Image */}
      {content.bannerImageUrl && (
        <div className="relative w-full h-[320px] sm:h-[440px] rounded-sm overflow-hidden border border-sand-200 shadow-md">
          <Image
            src={content.bannerImageUrl}
            alt={content.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            className="object-cover"
          />
        </div>
      )}

      {/* Story & Rich Text Content */}
      <div className="space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
        <div
          className="prose max-w-none text-neutral-900 space-y-5"
          dangerouslySetInnerHTML={{ __html: content.storyHtml }}
        />

        {/* Mission Statement Callout */}
        {content.missionText && (
          <div className="p-6 sm:p-8 bg-sand-50 border-l-2 border-gold-600 rounded-sm space-y-2 my-8 shadow-sm">
            <h3 className="font-serif text-xl text-neutral-900 font-medium">
              {content.missionTitle || 'Artisanal Materiality'}
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
              {content.missionText}
            </p>
          </div>
        )}

        {/* Milestones Timeline */}
        {content.milestonesJson && content.milestonesJson.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-sand-200">
            <h3 className="font-serif text-2xl text-neutral-900">Atelier Milestones</h3>
            <div className="space-y-4">
              {content.milestonesJson.map((m, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white border border-sand-200 rounded-sm shadow-sm">
                  <span className="font-mono font-bold text-xs text-gold-700 bg-sand-100 px-2.5 py-1 rounded-sm flex-shrink-0">
                    {m.year}
                  </span>
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-neutral-900 text-sm">{m.title}</h4>
                    <p className="text-neutral-600 text-xs leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="pt-8 border-t border-sand-200 flex items-center justify-between">
          <div>
            <h4 className="font-serif text-lg text-neutral-900">Explore the New Season</h4>
            <p className="text-xs text-neutral-500">Discover pure natural fibers and sculpted tailoring.</p>
          </div>
          <Link
            href="/women"
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
