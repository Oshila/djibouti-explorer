'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { 
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
}

const mockTours = [
  {
    id: '1',
    title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' },
    slug: { en: 'lake-assal-discovery', fr: 'decouverte-lac-assal' },
    shortDescription: { 
      en: 'Visit the lowest point in Africa and swim in the saltiest lake on Earth.',
      fr: 'Visitez le point le plus bas d\'Afrique et nagez dans le lac le plus salé de la Terre.'
    },
    price: 150,
    currency: 'USD',
    duration: 1,
    maxGroupSize: 8,
    rating: 4.9,
    reviewCount: 42,
    categories: ['nature', 'adventure'],
  },
  {
    id: '2',
    title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' },
    slug: { en: 'whale-shark-adventure', fr: 'aventure-requin-baleine' },
    shortDescription: { 
      en: 'Swim with gentle giants in the crystal-clear waters of the Gulf of Tadjoura.',
      fr: 'Nagez avec les géants des mers dans les eaux cristallines du Golfe de Tadjoura.'
    },
    price: 250,
    currency: 'USD',
    duration: 1,
    maxGroupSize: 10,
    rating: 4.8,
    reviewCount: 38,
    categories: ['wildlife', 'adventure'],
  },
  {
    id: '3',
    title: { en: 'Lac Abbé & Ardoukoba', fr: 'Lac Abbé & Ardoukoba' },
    slug: { en: 'lac-abbe-ardoukoba', fr: 'lac-abbe-ardoukoba' },
    shortDescription: { 
      en: 'Discover the otherworldly limestone chimneys and hike the Ardoukoba volcano.',
      fr: 'Découvrez les cheminées de calcaire d\'un autre monde et randonnez sur le volcan Ardoukoba.'
    },
    price: 350,
    currency: 'USD',
    duration: 2,
    maxGroupSize: 6,
    rating: 4.7,
    reviewCount: 29,
    categories: ['adventure', 'culture'],
  },
];

export function FeaturedTours({ locale }: Props) {
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
          {mockTours.map((tour) => (
            <Link
              key={tour.id}
              href={`/${locale}/tours/${tour.slug[locale]}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 bg-gradient-to-br from-teal/20 to-terracotta/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                <div className="w-full h-full flex items-center justify-center text-teal/10">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
                  </svg>
                </div>
                
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-teal text-xs font-medium px-3 py-1 rounded-full">
                    {tour.categories[0]}
                  </span>
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