'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Locale } from '@/types';

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  description: { en: string; fr: string };
  image: string;
  featured: boolean;
  tourCount: number; // ⭐ Dynamic count
}

interface Props {
  locale: Locale;
}

export function DestinationsGrid({ locale }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinationsWithCounts() {
      try {
        // Fetch all destinations
        const destSnapshot = await getDocs(collection(db, 'destinations'));
        const destData = destSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch all tours
        const toursSnapshot = await getDocs(collection(db, 'tours'));
        const tours = toursSnapshot.docs.map(doc => doc.data());

        // Count tours per destination
        const destinationsWithCounts = destData.map((dest: any) => {
          // Count tours that include this destination
          const tourCount = tours.filter((tour: any) => {
            // Check if tour has destinations array
            if (tour.destinations && Array.isArray(tour.destinations)) {
              return tour.destinations.includes(dest.id) || 
                     tour.destinations.includes(dest.name?.en) ||
                     tour.destinations.includes(dest.slug?.en);
            }
            // Check if tour has a destination field
            if (tour.destination) {
              return tour.destination === dest.id || 
                     tour.destination === dest.name?.en;
            }
            return false;
          }).length;

          return {
            ...dest,
            tourCount: tourCount,
          };
        });

        setDestinations(destinationsWithCounts);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinationsWithCounts();
  }, []);

  const content = {
    en: {
      title: 'Explore Our Destinations',
      subtitle: 'Discover the extraordinary landscapes of Djibouti',
      viewAll: 'View All Destinations',
      tours: 'tours',
    },
    fr: {
      title: 'Explorez Nos Destinations',
      subtitle: 'Découvrez les paysages extraordinaires de Djibouti',
      viewAll: 'Voir Toutes les Destinations',
      tours: 'circuits',
    },
  };

  const t = content[locale];

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-nearblack/60">Loading destinations...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-nearblack mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-nearblack/70 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/${locale}/destinations/${dest.slug[locale]}`}
              className="group relative overflow-hidden rounded-2xl bg-cream hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {dest.image ? (
                  <Image
                    src={dest.image}
                    alt={dest.name[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-teal/10 flex items-center justify-center">
                    <span className="text-4xl">🏝️</span>
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-nearblack/60 via-nearblack/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-heading mb-1">
                  {dest.name[locale]}
                </h3>
                <p className="text-sm text-white/80 mb-2 line-clamp-2">
                  {dest.description[locale]}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {dest.tourCount || 0} {t.tours}
                  </span>
                  <span className="text-sm text-white/60">
                    {locale === 'en' ? 'Explore →' : 'Explorer →'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/destinations`}
            className="inline-flex items-center gap-2 text-teal hover:text-terracotta font-medium transition-colors"
          >
            {t.viewAll}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}