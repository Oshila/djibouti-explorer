import { Locale } from '@/types';
import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://djiboutiexplorer.com';
  
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  return (
    <>
      {children}
    </>
  );
}