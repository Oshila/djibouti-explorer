'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { 
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface Props {
  tour: any;
  locale: Locale;
}

export function TourCard({ tour, locale }: Props) {
  const [imageError, setImageError] = useState(false);
  
  const getImagePath = (path: string) => {
    if (!path) return null;
    if (path.startsWith('/')) return path;
    return `/images/tours/${path}`;
  };

  const primaryImage = tour.images?.primary 
    ? getImagePath(tour.images.primary) 
    : null;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug?.[locale] || tour.slug?.en}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col border border-cream/50 hover:border-teal/20"
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-teal/5 to-terracotta/5 overflow-hidden">
        {primaryImage && !imageError ? (
          <img
            src={primaryImage}
            alt={tour.title?.[locale] || tour.title?.en || 'Tour'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal/10 to-terracotta/10">
            <svg className="w-20 h-20 text-teal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
            </svg>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick View Button - Appears on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="bg-white/90 backdrop-blur-sm text-teal font-medium px-6 py-3 rounded-full shadow-lg hover:bg-white transition-colors">
            {locale === 'en' ? 'View Details' : 'Voir les Détails'}
          </span>
        </div>

        {/* Featured Badge */}
        {tour.featured && (
          <div className="absolute top-4 left-4 z-10 bg-ochre text-nearblack text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
            <StarSolidIcon className="w-3.5 h-3.5" />
            {locale === 'en' ? 'Featured' : 'Vedette'}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
          <StarSolidIcon className="w-4 h-4 text-ochre" />
          <span className="text-sm font-bold text-nearblack">{tour.rating || 0}</span>
          <span className="text-xs text-nearblack/50">({tour.reviewCount || 0})</span>
        </div>

        {/* Price Tag - Bottom Left Overlay */}
        <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white px-4 py-1.5 rounded-full">
          <span className="text-lg font-bold">${tour.price || 0}</span>
          <span className="text-xs text-white/70 ml-1">/ {locale === 'en' ? 'person' : 'personne'}</span>
        </div>

        {/* Duration Badge - Bottom Right Overlay */}
        <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm">
          <ClockIcon className="w-4 h-4" />
          <span>{tour.duration || 1} {locale === 'en' ? 'day' : 'jour'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tour.categories?.slice(0, 2).map((cat: string) => (
            <span key={cat} className="text-[10px] font-medium uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading text-teal group-hover:text-terracotta transition-colors line-clamp-2 mb-2">
          {tour.title?.[locale] || tour.title?.en || 'Tour'}
        </h3>

        {/* Description */}
        <p className="text-nearblack/70 text-sm line-clamp-2 flex-1 mb-3">
          {tour.shortDescription?.[locale] || tour.shortDescription?.en || ''}
        </p>

        {/* Key Info Icons */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-nearblack/50 mb-4">
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>Max {tour.maxGroupSize || 0}</span>
          </div>
          {tour.destinations?.length > 0 && (
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{tour.destinations[0]}</span>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-cream/60">
          <span className="flex items-center gap-1 text-xs text-olive">
            <CheckCircleIcon className="w-4 h-4" />
            {locale === 'en' ? 'Best Price' : 'Meilleur Prix'}
          </span>
          <span className="flex items-center gap-1 text-xs text-olive">
            <CheckCircleIcon className="w-4 h-4" />
            {locale === 'en' ? 'Free Cancellation' : 'Annulation Gratuite'}
          </span>
        </div>

        {/* Book Now Button */}
        <div className="mt-4 pt-4 border-t border-cream/60">
          <span className="block w-full bg-terracotta hover:bg-terracotta/90 text-white text-center font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95">
            {locale === 'en' ? 'Book Now' : 'Réserver'}
          </span>
        </div>
      </div>
    </Link>
  );
}