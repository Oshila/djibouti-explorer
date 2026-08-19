import type { Metadata } from 'next';
import { Locale } from '@/types';

interface Props {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
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

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  
  return (
    <>
      {children}
    </>
  );
}