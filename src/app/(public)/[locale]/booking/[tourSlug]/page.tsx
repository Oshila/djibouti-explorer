import type { Metadata } from 'next';
import { Locale } from '@/types';
import BookingClient from './BookingClient';

interface Props {
  params: Promise<{
    locale: Locale;
    tourSlug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tourSlug } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const baseUrl = 'https://djiboutiexplorer.com';

  return {
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${baseUrl}/${validLocale}/tours/${tourSlug}`,
    },
  };
}

export default async function BookingPage({ params }: Props) {
  const { locale, tourSlug } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  return <BookingClient locale={validLocale} tourSlug={tourSlug} />;
}