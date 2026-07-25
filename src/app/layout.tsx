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
    default: 'Djibouti Explorer | Discover Authentic Djibouti Tours',
    template: '%s | Djibouti Explorer',
  },
  description: 'Book authentic tours in Djibouti. Explore Lake Assal, whale sharks, and the best of Djibouti with local experts.',
  keywords: 'Djibouti tours, Lake Assal, whale sharks, Djibouti travel, African tours, adventure travel',
  authors: [{ name: 'Djibouti Explorer' }],
  creator: 'Djibouti Explorer',
  publisher: 'Djibouti Explorer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://djiboutiexplorer.com',
    title: 'Djibouti Explorer | Discover Authentic Djibouti Tours',
    description: 'Book authentic tours in Djibouti. Explore Lake Assal, whale sharks, and the best of Djibouti with local experts.',
    siteName: 'Djibouti Explorer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djibouti Explorer | Discover Authentic Djibouti Tours',
    description: 'Book authentic tours in Djibouti. Explore Lake Assal, whale sharks, and the best of Djibouti with local experts.',
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}