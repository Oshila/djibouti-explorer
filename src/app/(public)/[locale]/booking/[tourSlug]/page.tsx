import { Locale } from '@/types';
import BookingFlow from '@/components/booking/BookingFlow';

interface Props {
  params: {
    locale: Locale;
    tourSlug: string;
  };
}

// Mock function to get tour by slug
function getTourBySlug(slug: string, locale: Locale) {
  const mockTours = [
    {
      id: '1',
      title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' },
      slug: { en: 'lake-assal-discovery', fr: 'decouverte-lac-assal' },
      price: 150,
      depositAmount: 30,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 8,
      images: { primary: '/images/lake-assal.jpg' },
      rating: 4.9,
      reviewCount: 42,
    },
    {
      id: '2',
      title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' },
      slug: { en: 'whale-shark-adventure', fr: 'aventure-requin-baleine' },
      price: 250,
      depositAmount: 50,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 10,
      images: { primary: '/images/whale-shark.jpg' },
      rating: 4.8,
      reviewCount: 38,
    },
  ];

  return mockTours.find(tour => tour.slug[locale] === slug) || null;
}

export default async function BookingPage({ params }: Props) {
  const { locale, tourSlug } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const tour = getTourBySlug(tourSlug, validLocale);
  
  if (!tour) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-2xl font-heading text-teal mb-4">Tour Not Found</h1>
        <p className="text-nearblack/70">The tour you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <BookingFlow tour={tour} locale={validLocale} />;
}