'use client';

import { use, useState, useEffect } from 'react';
import { Locale } from '@/types';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';
import { 
  MountainIcon, 
  WavesIcon, 
  TreesIcon, 
  SaladIcon, 
  CompassIcon, 
  BuildingIcon,
  SunriseIcon,
  ShipIcon,
  TurtleIcon
} from 'lucide-react';

interface Props {
  params: Promise<{
    locale: Locale;
  }>;
}

// Define destination type with dynamic tour count
interface Destination {
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  icon: any;
  color: string;
  image: string;
  description: { en: string; fr: string };
  tourCount: number; // ⭐ Dynamic, will be calculated
}

// Base destinations without tour counts
const destinationBase = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    icon: MountainIcon,
    color: 'from-teal/30 to-teal/10',
    image: '/images/destinations/lake-assal.jpg',
    description: { 
      en: 'Lowest point in Africa and the saltiest lake on Earth.', 
      fr: 'Point le plus bas d\'Afrique et le lac le plus salé de la Terre.' 
    },
  },
  { 
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    icon: SunriseIcon,
    color: 'from-ochre/30 to-ochre/10',
    image: '/images/destinations/lac-abbe.jpeg',
    description: { 
      en: 'Otherworldly limestone chimneys in the desert.', 
      fr: 'Cheminées de calcaire d\'un autre monde dans le désert.' 
    },
  },
  { 
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    icon: WavesIcon,
    color: 'from-blue-400/30 to-blue-400/10',
    image: '/images/destinations/tadjoura-gulf.jpg',
    description: { 
      en: 'Whale shark paradise in crystal-clear waters.', 
      fr: 'Paradis des requins-baleines dans des eaux cristallines.' 
    },
  },
  { 
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    icon: TreesIcon,
    color: 'from-olive/30 to-olive/10',
    image: '/images/destinations/day-forest.jpg',
    description: { 
      en: 'Unique biodiversity hotspot in the mountains.', 
      fr: 'Hotspot de biodiversité unique dans les montagnes.' 
    },
  },
  { 
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    icon: CompassIcon,
    color: 'from-terracotta/30 to-terracotta/10',
    image: '/images/destinations/ardoukoba.jpg',
    description: { 
      en: 'Active volcano in the Great Rift Valley.', 
      fr: 'Volcan actif dans la Vallée du Grand Rift.' 
    },
  },
  { 
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    icon: BuildingIcon,
    color: 'from-teal/30 to-teal/10',
    image: '/images/destinations/djibouti-city.jpeg',
    description: { 
      en: 'Vibrant capital with rich culture and history.', 
      fr: 'Capitale vibrante avec une riche culture et histoire.' 
    },
  },
  { 
    name: { en: 'Moucha Islands', fr: 'Îles Moucha' },
    slug: { en: 'moucha-islands', fr: 'iles-moucha' },
    icon: SaladIcon,
    color: 'from-cyan-400/30 to-cyan-400/10',
    image: '/images/destinations/moucha-islands.jpeg',
    description: { 
      en: 'Pristine islands with white sand beaches and excellent snorkeling.', 
      fr: 'Îles préservées avec des plages de sable blanc et un excellent snorkeling.' 
    },
  },
  { 
    name: { en: 'Maskali Islands', fr: 'Îles Maskali' },
    slug: { en: 'maskali-islands', fr: 'iles-maskali' },
    icon: SaladIcon,
    color: 'from-blue-300/30 to-blue-300/10',
    image: '/images/destinations/maskali-islands.jpeg',
    description: { 
      en: 'Neighboring islands to Moucha, known for calm waters and marine life.', 
      fr: 'Îles voisines de Moucha, connues pour leurs eaux calmes et leur vie marine.' 
    },
  },
  { 
    name: { en: 'Seven Brothers Islands', fr: 'Îles des Sept Frères' },
    slug: { en: 'seven-brothers-islands', fr: 'iles-sept-freres' },
    icon: ShipIcon,
    color: 'from-indigo-400/30 to-indigo-400/10',
    image: '/images/destinations/seven-brothers.jpg',
    description: { 
      en: 'Remote archipelago with seabird colonies and untouched beaches.', 
      fr: 'Archipel isolé avec des colonies d\'oiseaux marins et des plages préservées.' 
    },
  },
  { 
    name: { en: 'Dittilou', fr: 'Dittilou' },
    slug: { en: 'dittilou', fr: 'dittilou' },
    icon: TurtleIcon,
    color: 'from-emerald-400/30 to-emerald-400/10',
    image: '/images/destinations/dittilou.jpg',
    description: { 
      en: 'Small island with calm waters, sea turtles, and colorful coral gardens.', 
      fr: 'Petite île avec des eaux calmes, des tortues marines et des jardins de corail colorés.' 
    },
  },
  { 
    name: { en: 'Allols', fr: 'Allols' },
    slug: { en: 'allols', fr: 'allols' },
    icon: WavesIcon,
    color: 'from-teal-400/30 to-teal-400/10',
    image: '/images/destinations/allols.jpg',
    description: { 
      en: 'Hidden coastal gem with pristine beaches and crystal-clear waters.', 
      fr: 'Joyau côtier caché avec des plages immaculées et des eaux cristallines.' 
    },
  },
];

export default function DestinationsPage({ params }: Props) {
  const { locale } = use(params);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';

  useEffect(() => {
    async function fetchDestinationsWithTourCounts() {
      try {
        // Fetch all tours from Firestore
        const toursSnapshot = await getDocs(collection(db, 'tours'));
        const tours = toursSnapshot.docs.map(doc => doc.data());

        // For each destination, count how many tours include it
        const destinationsWithCounts = destinationBase.map((dest) => {
          // Count tours that include this destination
          const tourCount = tours.filter((tour: any) => {
            // Check if tour has destinations array
            if (tour.destinations && Array.isArray(tour.destinations)) {
              // Check if any destination matches by ID, name (EN or FR), or slug
              return tour.destinations.some((d: string) => {
                return d === dest.slug.en ||
                       d === dest.slug.fr ||
                       d === dest.name.en ||
                       d === dest.name.fr ||
                       d.toLowerCase().includes(dest.slug.en.toLowerCase()) ||
                       d.toLowerCase().includes(dest.name.en.toLowerCase());
              });
            }
            // Check if tour has a single destination field
            if (tour.destination) {
              return tour.destination === dest.slug.en ||
                     tour.destination === dest.slug.fr ||
                     tour.destination === dest.name.en ||
                     tour.destination === dest.name.fr;
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
        console.error('Error fetching destinations with tour counts:', error);
        // If error, set tourCount to 0 for all destinations
        const destinationsWithZero = destinationBase.map((dest) => ({
          ...dest,
          tourCount: 0,
        }));
        setDestinations(destinationsWithZero);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinationsWithTourCounts();
  }, []);

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">
            {validLocale === 'en' ? 'Loading destinations...' : 'Chargement des destinations...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-heading text-teal mb-4">
          {validLocale === 'en' ? 'Explore Djibouti' : 'Explorez Djibouti'}
        </h1>
        <p className="text-nearblack/70 text-lg">
          {validLocale === 'en' 
            ? 'Discover the diverse landscapes and unique destinations of Djibouti.' 
            : 'Découvrez les paysages diversifiés et les destinations uniques de Djibouti.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => {
          const Icon = dest.icon;
          return (
            <Link
              key={dest.slug.en}
              href={`/${validLocale}/destinations/${dest.slug[validLocale]}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with fallback */}
              <div className="relative h-48 bg-gradient-to-br from-teal/10 to-cream overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name[validLocale]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // If image fails, show icon
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const iconDiv = parent.querySelector('.icon-fallback');
                      if (iconDiv) iconDiv.classList.remove('hidden');
                    }
                  }}
                />
                {/* Fallback icon */}
                <div className="icon-fallback hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal/10 to-cream">
                  <Icon className="w-16 h-16 text-teal/40 group-hover:text-teal transition-colors" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-heading text-teal group-hover:text-terracotta transition-colors">
                  {dest.name[validLocale]}
                </h2>
                <p className="text-nearblack/70 text-sm mt-2">
                  {dest.description[validLocale]}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-nearblack/50">
                    {dest.tourCount} {validLocale === 'en' ? 'tours available' : 'circuits disponibles'}
                  </span>
                  <span className="text-terracotta group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {validLocale === 'en' ? 'Explore' : 'Explorer'} →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}