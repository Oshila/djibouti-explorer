import { Locale } from '@/types';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;  // ⭐ Use string instead of Locale
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  // Validate and cast the locale
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  return (
    <>
      {children}
    </>
  );
}

// If you have generateMetadata, update it too:
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const baseUrl = 'https://djiboutiexplorer.com';
  
  return {
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}