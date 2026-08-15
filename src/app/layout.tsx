import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Djibouti Explorer - Authentic Tours in Djibouti',
    template: '%s | Djibouti Explorer',
  },
  description: 'Djibouti Explorer offers authentic tours in Djibouti. Explore Lake Assal, swim with whale sharks, and discover the best of Djibouti with local experts.',
  
  // Add these for better SEO
  keywords: 'Djibouti Explorer, Djibouti tours, Lake Assal, whale sharks Djibouti, authentic Djibouti travel',
  
  // Add this for social sharing
  openGraph: {
    title: 'Djibouti Explorer - Authentic Tours in Djibouti',
    description: 'Discover the extraordinary side of Djibouti with local experts.',
    url: 'https://djiboutiexplorer.com',
    siteName: 'Djibouti Explorer',
    locale: 'en_US',
    type: 'website',
  },
  
  // Add this for Twitter cards
  twitter: {
    card: 'summary_large_image',
    title: 'Djibouti Explorer - Authentic Tours in Djibouti',
    description: 'Discover the extraordinary side of Djibouti with local experts.',
    images: ['/images/logo.jpg'],
  },

   icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1E3D47',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* ⭐ Add these lines */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}