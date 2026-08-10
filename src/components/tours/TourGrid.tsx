'use client';

import { Locale } from '@/types';
import { TourCard } from '@/components/tours/TourCard';

interface Props {
  tours: any[];
  locale: Locale;
}

export function TourGrid({ tours, locale }: Props) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-nearblack/50">No tours found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} locale={locale} />
      ))}
    </div>
  );
}