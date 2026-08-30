import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/store';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'BAVEHA | Minimalist Luxury Apparel & Tailoring',
  description:
    'Discover Baveha — quiet luxury, sculpted tailoring, and timeless natural essentials for men and women. Free worldwide shipping over $75.',
  keywords: ['fashion', 'luxury apparel', 'minimalist fashion', 'tailoring', 'cashmere', 'outerwear'],
  authors: [{ name: 'Baveha Atelier' }],
  openGraph: {
    title: 'BAVEHA | Minimalist Luxury Apparel & Tailoring',
    description: 'Sculpted tailoring and pure natural fibers designed for effortless distinction.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
