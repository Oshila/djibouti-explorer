'use client';

import { Locale } from '@/types';
import { TourCard } from '../tours/TourCard';

interface Props {
  tours: any[];
  locale: Locale;
}

export function TourGrid({ tours, locale }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} locale={locale} />
      ))}
    </div>
  );
}