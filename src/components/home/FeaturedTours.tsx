'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { 
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
  tours: any[];
}

export function FeaturedTours({ locale, tours }: Props) {
  const featuredTours = tours.filter(t => t.featured).slice(0, 3);

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
              {locale === 'en' ? 'Explore Our Tours' : 'Explorez Nos Circuits'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
              {locale === 'en' ? 'Featured Experiences' : 'Expériences Vedettes'}
            </h2>
            <p className="text-nearblack/70 text-lg">
              {locale === 'en' 
                ? 'Discover our most popular tours, handpicked by local experts.' 
                : 'Découvrez nos circuits les plus populaires, sélectionnés par des experts locaux.'}
            </p>
          </div>
          <Link
            href={`/${locale}/tours`}
            className="group flex items-center gap-2 text-teal hover:text-terracotta font-medium transition-colors mt-4 md:mt-0"
          >
            <span>{locale === 'en' ? 'View All Tours' : 'Voir Tous les Circuits'}</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredTours.map((tour) => (
            <Link
              key={tour.id}
              href={`/${locale}/tours/${tour.slug[locale]}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 bg-teal/10 overflow-hidden">
                {tour.images?.primary ? (
                  <img
                    src={tour.images.primary}
                    alt={tour.title[locale]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-teal/20 to-terracotta/20">
                    🏔️
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  {tour.categories?.slice(0, 2).map((cat: string) => (
                    <span key={cat} className="bg-white/90 backdrop-blur-sm text-teal text-xs font-medium px-3 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <StarSolidIcon className="w-4 h-4 text-ochre" />
                  <span className="text-sm font-medium text-nearblack">{tour.rating || 4.9}</span>
                  <span className="text-xs text-nearblack/50">({tour.reviewCount || 0})</span>
                </div>
                
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  <ClockIcon className="w-4 h-4" />
                  <span>{tour.duration} {locale === 'en' ? 'day' : 'jour'}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading text-teal mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
                  {tour.title[locale]}
                </h3>
                <p className="text-nearblack/70 text-sm mb-4 line-clamp-2">
                  {tour.shortDescription[locale]}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-cream">
                  <div>
                    <span className="text-2xl font-bold text-teal">${tour.price}</span>
                    <span className="text-nearblack/50 text-sm ml-1">/ {locale === 'en' ? 'person' : 'personne'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-nearblack/50 text-sm">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>Max {tour.maxGroupSize}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}