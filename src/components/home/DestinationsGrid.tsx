'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

const destinations = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    emoji: '🏞️'
  },
  { 
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    emoji: '🌋'
  },
  { 
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    emoji: '🐋'
  },
  { 
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    emoji: '🌳'
  },
  { 
    name: { en: 'Moucha Island', fr: 'Île Moucha' },
    slug: { en: 'moucha-island', fr: 'ile-moucha' },
    emoji: '🏝️'
  },
  { 
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    emoji: '⛰️'
  },
];

export function DestinationsGrid({ locale }: Props) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-teal mb-4">
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
              className="group bg-cream hover:bg-teal/5 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-cream hover:border-teal/20"
            >
              <div className="text-4xl mb-3">{dest.emoji}</div>
              <h3 className="font-medium text-nearblack group-hover:text-teal transition-colors text-sm">
                {dest.name[locale]}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}