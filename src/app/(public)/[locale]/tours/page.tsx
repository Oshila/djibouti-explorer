import { Locale } from '@/types';
import { TourListing } from '@/components/tours/TourListing';

interface Props {
  params: {
    locale: Locale;
  };
  searchParams: {
    search?: string;
    destination?: string;
    duration?: string;
    price?: string;
    category?: string;
  };
}

export default async function ToursPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const filters = await searchParams;

  return (
    <div className="container-custom section-padding">
      <TourListing locale={validLocale} filters={filters} />
    </div>
  );
}