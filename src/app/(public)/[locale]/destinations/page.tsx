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
  MapPinIcon
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

const destinations = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    icon: MountainIcon,
    color: 'from-teal/30 to-teal/10',
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
    description: { 
      en: 'Unique biodiversity hotspot in the mountains.', 
      fr: 'Hotspot de biodiversité unique dans les montagnes.' 
    },
    tours: 4,
  },
  { 
    name: { en: 'Moucha Island', fr: 'Île Moucha' },
    slug: { en: 'moucha-island', fr: 'ile-moucha' },
    icon: SaladIcon,
    color: 'from-cyan-400/30 to-cyan-400/10',
    description: { 
      en: 'Pristine beaches and excellent snorkeling.', 
      fr: 'Plages immaculées et excellent snorkeling.' 
    },
    tours: 3,
  },
  { 
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    icon: CompassIcon,
    color: 'from-terracotta/30 to-terracotta/10',
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
    description: { 
      en: 'Vibrant capital with rich culture and history.', 
      fr: 'Capitale vibrante avec une riche culture et histoire.' 
    },
    tours: 2,
  },
];

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params;
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
              <div className={`h-48 bg-gradient-to-br ${dest.color} flex items-center justify-center`}>
                <Icon className="w-16 h-16 text-teal/40 group-hover:text-teal transition-colors" />
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