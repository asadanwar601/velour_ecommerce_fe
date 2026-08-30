import apiClient from '../axios';
import { AboutPageContent, ContactPageContent } from '../types';
import { unwrapApiResponse } from './unwrap.util';

export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const response = await apiClient.get('/cms/about');
    return unwrapApiResponse<AboutPageContent>(response);
  } catch {
    return {
      heroTitle: 'Form, Texture, & Permanence',
      heroSubtitle: 'Our Philosophy',
      bannerImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      storyHtml: `<p>Founded on the principle of understated distinction, <strong>Velour</strong> reinterprets classical tailoring through a lens of contemporary architectural minimalism. We reject fast trends in favor of sculptural silhouettes, considered proportions, and enduring tactile quality.</p><h3>Artisanal Materiality</h3><p>Every fiber is selected with discerning intention. From double-faced virgin wool spun in northern Italy, to Grade-A unbleached Mongolian cashmere, to heavy shuttle-loomed Japanese selvedge denim, our textiles are chosen to age gracefully.</p><h3>Conscious Production</h3><p>We partner exclusively with family-owned mills and certified ethical ateliers in Portugal, Italy, and Japan. Small batch runs prevent overproduction and ensure every seam meets our exacting standards.</p>`,
      missionTitle: 'Artisanal Materiality',
      missionText: 'Every fiber is selected with discerning intention, chosen to age gracefully and develop personal character over decades of wear.',
      valuesJson: [
        { title: 'Pure Materiality', description: 'Rare natural virgin wools, organic silk, and unbleached cashmere.' },
        { title: 'Architectural Tailoring', description: 'Sculpted shoulders, clean seams, and enduring proportions.' },
        { title: 'Conscious Craft', description: 'Small ethical batches crafted in Portugal and Italy.' },
      ],
      milestonesJson: [
        { year: '2021', title: 'Atelier Inception', description: 'Founded in New York with a capsule collection of 12 bespoke coats.' },
        { year: '2023', title: 'European Mill Expansion', description: 'Partnered with heritage family-owned mills in Biella, Italy.' },
        { year: '2025', title: 'Global Flagship', description: 'Inaugurated our SoHo atelier and worldwide direct bespoke service.' },
      ],
    };
  }
}

export async function updateAboutPageContent(payload: Partial<AboutPageContent>): Promise<AboutPageContent> {
  const response = await apiClient.put('/cms/about', payload);
  return unwrapApiResponse<{ message: string; page: AboutPageContent }>(response).page || unwrapApiResponse<AboutPageContent>(response);
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  try {
    const response = await apiClient.get('/cms/contact');
    return unwrapApiResponse<ContactPageContent>(response);
  } catch {
    return {
      title: 'How May We Assist You?',
      subtitle: 'Client Care',
      description: 'Our concierge team is available Monday through Friday from 9:00 AM to 6:00 PM EST to assist with styling advice, garment measurements, and private appointments.',
      supportEmail: 'concierge@velour.com',
      supportPhone: '+1 (800) 555-0198',
      workingHours: 'Monday – Friday: 9:00 AM – 6:00 PM EST',
      addressLine1: '482 Mercer Street',
      addressLine2: 'SoHo, New York, NY 10013',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.633458129031!2d-73.99849262346747!3d40.72274497139191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598e98bc01d1%3A0xe54d580f4f9a0c64!2sMercer%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
      contactStepsJson: [
        { stepNumber: 1, title: 'Submit Your Inquiry', description: 'Complete the direct message form with your order number or styling questions.' },
        { stepNumber: 2, title: 'Atelier Concierge Review', description: 'Our bespoke garment specialists analyze your request within 24 business hours.' },
        { stepNumber: 3, title: 'Tailored Resolution', description: 'Receive private styling guidance, order adjustments, or fitting solutions directly.' },
      ],
    };
  }
}

export async function updateContactPageContent(payload: Partial<ContactPageContent>): Promise<ContactPageContent> {
  const response = await apiClient.put('/cms/contact', payload);
  return unwrapApiResponse<{ message: string; page: ContactPageContent }>(response).page || unwrapApiResponse<ContactPageContent>(response);
}
