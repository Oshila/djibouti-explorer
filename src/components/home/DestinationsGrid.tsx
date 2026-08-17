'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';
import { Locale } from '@/types';

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  description: { en: string; fr: string };
  image: string;
  featured: boolean;
  tourCount: number;
}

// ⭐ FALLBACK DESTINATIONS (used if Firestore is empty)
const fallbackDestinations: Omit<Destination, 'tourCount'>[] = [
  {
    id: 'lake-assal',
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    description: { 
      en: 'Lowest point in Africa and the saltiest lake on Earth.', 
      fr: 'Point le plus bas d\'Afrique et le lac le plus salé de la Terre.' 
    },
    image: '/images/destinations/lake-assal.jpg',
    featured: true,
  },
  {
    id: 'lac-abbe',
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    description: { 
      en: 'Otherworldly limestone chimneys in the desert.', 
      fr: 'Cheminées de calcaire d\'un autre monde dans le désert.' 
    },
    image: '/images/destinations/lac-abbe.jpeg',
    featured: true,
  },
  {
    id: 'tadjoura-gulf',
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    description: { 
      en: 'Whale shark paradise in crystal-clear waters.', 
      fr: 'Paradis des requins-baleines dans des eaux cristallines.' 
    },
    image: '/images/destinations/tadjoura-gulf.jpg',
    featured: true,
  },
  {
    id: 'day-forest',
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    description: { 
      en: 'Unique biodiversity hotspot in the mountains.', 
      fr: 'Hotspot de biodiversité unique dans les montagnes.' 
    },
    image: '/images/destinations/day-forest.jpg',
    featured: false,
  },
  {
    id: 'ardoukoba',
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    description: { 
      en: 'Active volcano in the Great Rift Valley.', 
      fr: 'Volcan actif dans la Vallée du Grand Rift.' 
    },
    image: '/images/destinations/ardoukoba.jpg',
    featured: false,
  },
  {
    id: 'djibouti-city',
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    description: { 
      en: 'Vibrant capital with rich culture and history.', 
      fr: 'Capitale vibrante avec une riche culture et histoire.' 
    },
    image: '/images/destinations/djibouti-city.jpeg',
    featured: false,
  },
];

// Fallback images by destination name
const fallbackImages: Record<string, string> = {
  'Lake Assal': '/images/destinations/lake-assal.jpg',
  'Lac Assal': '/images/destinations/lake-assal.jpg',
  'Lac Abbé': '/images/destinations/lac-abbe.jpeg',
  'Lac Abbe': '/images/destinations/lac-abbe.jpeg',
  'Tadjoura Gulf': '/images/destinations/tadjoura-gulf.jpg',
  'Day Forest': '/images/destinations/day-forest.jpg',
  'Ardoukoba': '/images/destinations/ardoukoba.jpg',
  'Djibouti City': '/images/destinations/djibouti-city.jpeg',
  'Moucha Islands': '/images/destinations/moucha-islands.jpeg',
  'Maskali Islands': '/images/destinations/maskali-islands.jpeg',
  'Seven Brothers Islands': '/images/destinations/seven-brothers.jpg',
  'Dittilou': '/images/destinations/dittilou.jpg',
  'Allols': '/images/destinations/allols.jpg',
};

interface Props {
  locale: Locale;
}

export function DestinationsGrid({ locale }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchDestinationsWithCounts() {
      try {
        // Fetch all destinations from Firestore
        const destSnapshot = await getDocs(collection(db, 'destinations'));
        
        // If Firestore has data, use it
        if (!destSnapshot.empty) {
          const destData = destSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Fetch all tours to count
          const toursSnapshot = await getDocs(collection(db, 'tours'));
          const tours = toursSnapshot.docs.map(doc => doc.data());

          // Count tours per destination
          const destinationsWithCounts = destData.map((dest: any) => {
            const tourCount = tours.filter((tour: any) => {
              if (tour.destinations && Array.isArray(tour.destinations)) {
                return tour.destinations.some((d: string) => {
                  const dLower = d.toLowerCase();
                  return dLower === dest.id ||
                         dLower === dest.slug?.en ||
                         dLower === dest.slug?.fr ||
                         dLower === dest.name?.en.toLowerCase() ||
                         dLower === dest.name?.fr.toLowerCase();
                });
              }
              if (tour.destination) {
                const dLower = tour.destination.toLowerCase();
                return dLower === dest.id ||
                       dLower === dest.slug?.en ||
                       dLower === dest.slug?.fr ||
                       dLower === dest.name?.en.toLowerCase() ||
                       dLower === dest.name?.fr.toLowerCase();
              }
              return false;
            }).length;

            // Use provided image or fallback by name
            let image = dest.image || '';
            if (!image && dest.name?.en) {
              image = fallbackImages[dest.name.en] || '';
            }

            return {
              ...dest,
              tourCount: tourCount,
              image: image,
            };
          });

          setDestinations(destinationsWithCounts);
          setUsingFallback(false);
        } else {
          // ⭐ Firestore is empty - use fallback data
          console.log('No destinations in Firestore, using fallback data');
          
          // Count tours from fallback (if any tours exist)
          const toursSnapshot = await getDocs(collection(db, 'tours'));
          const tours = toursSnapshot.docs.map(doc => doc.data());
          
          const fallbackWithCounts = fallbackDestinations.map((dest) => {
            const tourCount = tours.filter((tour: any) => {
              if (tour.destinations && Array.isArray(tour.destinations)) {
                return tour.destinations.some((d: string) => {
                  const dLower = d.toLowerCase();
                  return dLower === dest.id ||
                         dLower === dest.slug.en ||
                         dLower === dest.slug.fr ||
                         dLower === dest.name.en.toLowerCase() ||
                         dLower === dest.name.fr.toLowerCase();
                });
              }
              return false;
            }).length;

            return {
              ...dest,
              tourCount: tourCount,
            };
          });
          
          setDestinations(fallbackWithCounts);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        // ⭐ On error, use fallback data
        const fallbackWithCounts = fallbackDestinations.map((dest) => ({
          ...dest,
          tourCount: 0,
        }));
        setDestinations(fallbackWithCounts);
        setUsingFallback(true);
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
      noDestinations: 'No destinations found',
      usingFallback: 'Showing sample destinations. Add your own in the admin panel.',
    },
    fr: {
      title: 'Explorez Nos Destinations',
      subtitle: 'Découvrez les paysages extraordinaires de Djibouti',
      viewAll: 'Voir Toutes les Destinations',
      tours: 'circuits',
      noDestinations: 'Aucune destination trouvée',
      usingFallback: 'Affichage des destinations d\'exemple. Ajoutez les vôtres dans le panneau d\'administration.',
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

  // If no destinations even after fallback
  if (destinations.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-heading text-teal mb-4">{t.title}</h2>
            <p className="text-nearblack/60">{t.noDestinations}</p>
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
          {usingFallback && (
            <p className="text-sm text-ochre mt-2 bg-ochre/10 px-4 py-2 rounded-lg inline-block">
              {t.usingFallback}
            </p>
          )}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/${locale}/destinations/${dest.slug[locale]}`}
              className="group relative overflow-hidden rounded-2xl bg-cream hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-teal/10 to-cream">
                {dest.image ? (
                  <Image
                    src={dest.image}
                    alt={dest.name[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // If image fails, show fallback
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const fallback = parent.querySelector('.fallback-emoji');
                        if (fallback) fallback.classList.remove('hidden');
                      }
                    }}
                  />
                ) : null}
                
                {/* Fallback emoji when no image */}
                <div className={`fallback-emoji ${dest.image ? 'hidden' : ''} absolute inset-0 flex items-center justify-center text-6xl opacity-30`}>
                  🏝️
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-nearblack/70 via-nearblack/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-heading mb-1">
                  {dest.name[locale]}
                </h3>
                <p className="text-sm text-white/80 mb-2 line-clamp-2">
                  {dest.description?.[locale] || dest.description?.en || ''}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {dest.tourCount || 0} {t.tours}
                  </span>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal/90 transition-all hover:shadow-lg hover:scale-105 active:scale-95"
          >
            {t.viewAll}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}