'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { 
  ClockIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  tour: any;
  locale: Locale;
}

export function TourCard({ tour, locale }: Props) {
  return (
    <Link
      href={`/${locale}/tours/${tour.slug[locale]}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-56 bg-gradient-to-br from-teal/20 to-terracotta/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        <div className="w-full h-full flex items-center justify-center text-teal/10">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
          </svg>
        </div>
        
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {tour.categories.slice(0, 2).map((cat: string) => (
            <span key={cat} className="bg-white/90 backdrop-blur-sm text-teal text-xs font-medium px-3 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
        
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <StarSolidIcon className="w-4 h-4 text-ochre" />
          <span className="text-sm font-medium text-nearblack">{tour.rating}</span>
          <span className="text-xs text-nearblack/50">({tour.reviewCount})</span>
        </div>
        
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          <ClockIcon className="w-4 h-4" />
          <span>{tour.duration} {locale === 'en' ? 'day' : 'jour'}</span>
        </div>

        {tour.featured && (
          <div className="absolute bottom-4 right-4 z-20 bg-ochre text-nearblack text-xs font-medium px-3 py-1 rounded-full">
            {locale === 'en' ? 'Featured' : 'Vedette'}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-heading text-teal mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
          {tour.title[locale]}
        </h3>
        <p className="text-nearblack/70 text-sm mb-4 line-clamp-2 flex-1">
          {tour.shortDescription[locale]}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-cream mt-auto">
          <div>
            <span className="text-xl font-bold text-teal">${tour.price}</span>
            <span className="text-nearblack/50 text-sm ml-1">/ {locale === 'en' ? 'person' : 'personne'}</span>
          </div>
          <div className="flex items-center gap-1 text-nearblack/50 text-sm">
            <UserGroupIcon className="w-4 h-4" />
            <span>Max {tour.maxGroupSize}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}