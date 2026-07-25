'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
}

const destinations = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    description: { en: 'Lowest point in Africa', fr: 'Point le plus bas d\'Afrique' },
    tours: 8,
  },
  { 
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    description: { en: 'Limestone chimneys', fr: 'Cheminées de calcaire' },
    tours: 6,
  },
  { 
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    description: { en: 'Whale shark paradise', fr: 'Paradis des requins-baleines' },
    tours: 5,
  },
  { 
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    description: { en: 'Unique biodiversity', fr: 'Biodiversité unique' },
    tours: 4,
  },
  { 
    name: { en: 'Moucha Island', fr: 'Île Moucha' },
    slug: { en: 'moucha-island', fr: 'ile-moucha' },
    description: { en: 'Pristine beaches', fr: 'Plages immaculées' },
    tours: 3,
  },
  { 
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    description: { en: 'Active volcano', fr: 'Volcan actif' },
    tours: 3,
  },
];

export function DestinationsGrid({ locale }: Props) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
            {locale === 'en' ? 'Destinations' : 'Destinations'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
            {locale === 'en' ? 'Explore Djibouti' : 'Explorez Djibouti'}
          </h2>
          <p className="text-nearblack/70 text-lg">
            {locale === 'en' 
              ? 'From salt lakes to volcanic landscapes, discover the wonders of Djibouti.' 
              : 'Des lacs salés aux paysages volcaniques, découvrez les merveilles de Djibouti.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.slug.en}
              href={`/${locale}/destinations/${dest.slug[locale]}`}
              className="group bg-cream hover:bg-white rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-cream hover:border-teal/20"
            >
              <div className="w-12 h-12 mx-auto mb-3 text-teal/30 group-hover:text-teal transition-colors">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
                </svg>
              </div>
              <h3 className="font-heading text-base text-nearblack group-hover:text-teal transition-colors">
                {dest.name[locale]}
              </h3>
              <p className="text-xs text-nearblack/50 mt-1">
                {dest.description[locale]}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-nearblack/40">
                <MapPinIcon className="w-3 h-3" />
                <span>{dest.tours} {locale === 'en' ? 'tours' : 'circuits'}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}