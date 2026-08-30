import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms | BAVEHA',
  description: 'Baveha Privacy Policy, data practices, and terms of service.',
};

export default function PrivacyPage() {
  return (
    <div className="container-narrow" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
      <span className="eyebrow">Legal & Compliance</span>
      <h1 style={{ marginTop: '0.5rem', marginBottom: '2rem', fontSize: '3rem' }}>
        Privacy Policy & Terms
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '0.95rem', lineHeight: '1.8' }}>
        <section>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            1. Overview
          </h3>
          <p>
            Baveha respects your privacy and is dedicated to safeguarding personal data collected through
            our website. This policy details our handling of contact details, shipping addresses, and
            browsing preferences.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            2. Data We Collect
          </h3>
          <p>
            We collect information provided directly when placing an order, including your name, email,
            shipping location, and telephone number. We never store raw payment card numbers; all
            transactions are tokenized through certified Level-1 PCI DSS compliance providers.
          </p>
        </section>

        <section id="terms">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            3. Terms of Service
          </h3>
          <p>
            All garments displayed on our website are subject to availability. We reserve the right to
            discontinue pieces at any time. Prices are quoted in USD and are subject to local taxes where
            applicable.
          </p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            4. Contact
          </h3>
          <p>
            For questions regarding our privacy practices or data access requests, contact{' '}
            <a href="mailto:privacy@baveha.com" style={{ textDecoration: 'underline' }}>
              privacy@baveha.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
