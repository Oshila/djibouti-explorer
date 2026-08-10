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
  // Get the image path - handles both formats
  const getImagePath = (path: string) => {
    if (!path) return null;
    // If path already starts with /, use it as is
    if (path.startsWith('/')) return path;
    // Otherwise, assume it's in the tours folder
    return `/images/tours/${path}`;
  };

  const primaryImage = tour.images?.primary 
    ? getImagePath(tour.images.primary) 
    : null;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug[locale]}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-teal/20 to-terracotta/20 overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={tour.title?.[locale] || tour.title?.en || 'Tour'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              // If image fails, show fallback
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = parent.querySelector('.fallback-icon');
                if (fallback) fallback.classList.remove('hidden');
              }
            }}
          />
        ) : null}
        
        {/* Fallback SVG icon */}
        <div className={`fallback-icon ${primaryImage ? 'hidden' : ''} absolute inset-0 flex items-center justify-center`}>
          <svg className="w-16 h-16 text-teal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
          </svg>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        
        {/* Categories */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {tour.categories?.slice(0, 2).map((cat: string) => (
            <span key={cat} className="bg-white/90 backdrop-blur-sm text-teal text-xs font-medium px-3 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
        
        {/* Rating */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <StarSolidIcon className="w-4 h-4 text-ochre" />
          <span className="text-sm font-medium text-nearblack">{tour.rating || 0}</span>
          <span className="text-xs text-nearblack/50">({tour.reviewCount || 0})</span>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          <ClockIcon className="w-4 h-4" />
          <span>{tour.duration || 1} {locale === 'en' ? 'day' : 'jour'}</span>
        </div>

        {/* Featured Badge */}
        {tour.featured && (
          <div className="absolute bottom-4 right-4 z-20 bg-ochre text-nearblack text-xs font-medium px-3 py-1 rounded-full">
            {locale === 'en' ? 'Featured' : 'Vedette'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-heading text-teal mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
          {tour.title?.[locale] || tour.title?.en || 'Tour'}
        </h3>
        <p className="text-nearblack/70 text-sm mb-4 line-clamp-2 flex-1">
          {tour.shortDescription?.[locale] || tour.shortDescription?.en || ''}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-cream mt-auto">
          <div>
            <span className="text-xl font-bold text-teal">${tour.price || 0}</span>
            <span className="text-nearblack/50 text-sm ml-1">/ {locale === 'en' ? 'person' : 'personne'}</span>
          </div>
          <div className="flex items-center gap-1 text-nearblack/50 text-sm">
            <UserGroupIcon className="w-4 h-4" />
            <span>Max {tour.maxGroupSize || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}