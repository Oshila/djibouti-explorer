'use client';

import { use } from 'react';
import { Locale } from '@/types';
import Link from 'next/link';
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

const destinations = [
  // ========== EXISTING DESTINATIONS ==========
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
    tours: 8,
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
    tours: 6,
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
    tours: 5,
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
    tours: 4,
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
    tours: 3,
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
    tours: 2,
  },

  // ========== NEW DESTINATIONS ==========
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
    tours: 4,
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
    tours: 3,
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
    tours: 2,
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
    tours: 2,
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
    tours: 2,
  },
];

export default function DestinationsPage({ params }: Props) {
  const { locale } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';

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
                    {dest.tours} {validLocale === 'en' ? 'tours available' : 'circuits disponibles'}
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