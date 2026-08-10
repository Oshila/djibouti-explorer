'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
}

// In production, this would come from Firebase
const destinations = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    image: '/images/destinations/lake-assal.jpg',
    description: { en: 'Lowest point in Africa', fr: 'Point le plus bas d\'Afrique' },
    tours: 8,
  },
  { 
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    image: '/images/destinations/lac-abbe.jpg',
    description: { en: 'Limestone chimneys', fr: 'Cheminées de calcaire' },
    tours: 6,
  },
  { 
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    image: '/images/destinations/tadjoura-gulf.jpg',
    description: { en: 'Whale shark paradise', fr: 'Paradis des requins-baleines' },
    tours: 5,
  },
  { 
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    image: '/images/destinations/day-forest.jpg',
    description: { en: 'Unique biodiversity', fr: 'Biodiversité unique' },
    tours: 4,
  },

  { 
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    image: '/images/destinations/ardoukoba.jpg',
    description: { en: 'Active volcano', fr: 'Volcan actif' },
    tours: 3,
  },
  // NEW DESTINATIONS
  { 
    name: { en: 'Moucha Islands', fr: 'Îles Moucha' },
    slug: { en: 'moucha-islands', fr: 'iles-moucha' },
    image: '/images/destinations/moucha-islands.jpg',
    description: { en: 'White sand beaches', fr: 'Plages de sable blanc' },
    tours: 4,
  },
  { 
    name: { en: 'Maskali Islands', fr: 'Îles Maskali' },
    slug: { en: 'maskali-islands', fr: 'iles-maskali' },
    image: '/images/destinations/maskali-islands.jpg',
    description: { en: 'Calm waters', fr: 'Eaux calmes' },
    tours: 3,
  },
  { 
    name: { en: 'Seven Brothers Islands', fr: 'Îles des Sept Frères' },
    slug: { en: 'seven-brothers-islands', fr: 'iles-sept-freres' },
    image: '/images/destinations/seven-brothers.jpg',
    description: { en: 'Seabird colonies', fr: 'Colonies d\'oiseaux marins' },
    tours: 2,
  },
  { 
    name: { en: 'Dittilou', fr: 'Dittilou' },
    slug: { en: 'dittilou', fr: 'dittilou' },
    image: '/images/destinations/dittilou.jpg',
    description: { en: 'Sea turtles & coral', fr: 'Tortues & corail' },
    tours: 2,
  },
  { 
    name: { en: 'Allols', fr: 'Allols' },
    slug: { en: 'allols', fr: 'allols' },
    image: '/images/destinations/allols.jpg',
    description: { en: 'Hidden coastal gem', fr: 'Joyau côtier caché' },
    tours: 2,
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
              className="group bg-cream hover:bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-cream hover:border-teal/20"
            >
              {/* Image */}
              <div className="relative h-32 bg-gradient-to-br from-teal/10 to-terracotta/10 overflow-hidden">
                {dest.image ? (
                  <img
                    src={dest.image}
                    alt={dest.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🏝️
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="font-heading text-sm text-nearblack group-hover:text-teal transition-colors">
                  {dest.name[locale]}
                </h3>
                <p className="text-xs text-nearblack/50 mt-1">
                  {dest.description[locale]}
                </p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-nearblack/40">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{dest.tours} {locale === 'en' ? 'tours' : 'circuits'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}