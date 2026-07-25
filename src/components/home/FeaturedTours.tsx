'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

// Temporary mock data - will be replaced with Firebase data later
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
    images: { primary: '/images/lake-assal.jpg' },
    rating: 4.9,
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
    images: { primary: '/images/whale-shark.jpg' },
    rating: 4.8,
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
    images: { primary: '/images/lac-abbe.jpg' },
    rating: 4.7,
  },
];

export function FeaturedTours({ locale }: Props) {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-teal mb-4">
            {locale === 'en' ? 'Featured Tours' : 'Circuits Vedettes'}
          </h2>
          <p className="text-nearblack/70 text-lg">
            {locale === 'en' 
              ? 'Discover our most popular experiences, handpicked by local experts.' 
              : 'Découvrez nos expériences les plus populaires, sélectionnées par des experts locaux.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockTours.map((tour) => (
            <Link
              key={tour.id}
              href={`/${locale}/tours/${tour.slug[locale]}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 bg-teal/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-teal">
                  {tour.rating} ★
                </div>
                <div className="w-full h-full flex items-center justify-center text-teal/30 text-4xl">
                  🏔️
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading text-teal mb-2 group-hover:text-terracotta transition-colors">
                  {tour.title[locale]}
                </h3>
                <p className="text-nearblack/70 text-sm mb-4 line-clamp-2">
                  {tour.shortDescription[locale]}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-teal">
                      ${tour.price}
                    </span>
                    <span className="text-nearblack/50 text-sm ml-1">
                      {tour.currency} / {locale === 'en' ? 'day' : 'jour'}
                    </span>
                  </div>
                  <div className="text-sm text-nearblack/50">
                    {tour.duration} {locale === 'en' ? 'days' : 'jours'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/tours`}
            className="btn-primary inline-block"
          >
            {locale === 'en' ? 'View All Tours' : 'Voir Tous les Circuits'}
          </Link>
        </div>
      </div>
    </section>
  );
}