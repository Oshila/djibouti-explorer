'use client';

import { useState } from 'react';
import { use } from 'react';
import { Locale } from '@/types';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon,
  MountainIcon,
  WavesIcon,
  TreesIcon,
  CompassIcon,
  BuildingIcon,
  SunriseIcon,
  LandPlotIcon
} from 'lucide-react';

interface Props {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

// Destination data
const destinationsData = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    icon: MountainIcon,
    iconColor: 'text-teal',
    image: '/images/destinations/lake-assal.jpg',
    description: { 
      en: 'Lowest point in Africa and the saltiest lake on Earth.', 
      fr: 'Point le plus bas d\'Afrique et le lac le plus salé de la Terre.' 
    },
    longDescription: {
      en: 'Lake Assal is a crater lake in central-western Djibouti, located at the southern end of the Danakil Depression. It is the lowest point in Africa at 155 meters below sea level, and the saltiest lake outside Antarctica.',
      fr: 'Le Lac Assal est un lac de cratère dans le centre-ouest de Djibouti, situé à l\'extrémité sud de la dépression de Danakil. C\'est le point le plus bas d\'Afrique à 155 mètres sous le niveau de la mer, et le lac le plus salé en dehors de l\'Antarctique.'
    },
    location: { en: 'Danakil Depression, Central Djibouti', fr: 'Dépression de Danakil, Centre de Djibouti' },
    bestTime: { en: 'November to February', fr: 'Novembre à Février' },
    tours: 8,
    coordinates: '11.65°N, 42.42°E',
    highlights: {
      en: ['Lowest point in Africa', 'Saltiest lake on Earth', 'Stunning white salt flats', 'Volcanic landscape'],
      fr: ['Point le plus bas d\'Afrique', 'Lac le plus salé de la Terre', 'Plaines de sel blanc', 'Paysage volcanique']
    }
  },
  { 
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    icon: SunriseIcon,
    iconColor: 'text-ochre',
    image: '/images/destinations/lac-abbe.jpg',
    description: { 
      en: 'Otherworldly limestone chimneys in the desert.', 
      fr: 'Cheminées de calcaire d\'un autre monde dans le désert.' 
    },
    longDescription: {
      en: 'Lac Abbé is a salt lake located on the border between Djibouti and Ethiopia. It is famous for its otherworldly landscape of limestone chimneys that rise from the desert floor.',
      fr: 'Le Lac Abbé est un lac salé situé à la frontière entre Djibouti et l\'Éthiopie. Il est célèbre pour son paysage d\'un autre monde de cheminées de calcaire qui s\'élèvent du désert.'
    },
    location: { en: 'Ethiopia-Djibouti Border', fr: 'Frontière Éthiopie-Djibouti' },
    bestTime: { en: 'November to March', fr: 'Novembre à Mars' },
    tours: 6,
    coordinates: '11.52°N, 41.79°E',
    highlights: {
      en: ['Limestone chimneys', 'Salt lake', 'Bird watching', 'Sunset views'],
      fr: ['Cheminées de calcaire', 'Lac salé', 'Observation des oiseaux', 'Vues au coucher du soleil']
    }
  },
  { 
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    icon: WavesIcon,
    iconColor: 'text-blue-500',
    image: '/images/destinations/tadjoura-gulf.jpg',
    description: { 
      en: 'Whale shark paradise in crystal-clear waters.', 
      fr: 'Paradis des requins-baleines dans des eaux cristallines.' 
    },
    longDescription: {
      en: 'The Gulf of Tadjoura is a gulf of the Indian Ocean located in the Horn of Africa. It is known for its crystal-clear waters, coral reefs, and abundant marine life.',
      fr: 'Le Golfe de Tadjoura est un golfe de l\'océan Indien situé dans la Corne de l\'Afrique. Il est connu pour ses eaux cristallines, ses récifs coralliens et sa vie marine abondante.'
    },
    location: { en: 'Gulf of Tadjoura, Northern Djibouti', fr: 'Golfe de Tadjoura, Nord de Djibouti' },
    bestTime: { en: 'October to February', fr: 'Octobre à Février' },
    tours: 5,
    coordinates: '11.78°N, 42.88°E',
    highlights: {
      en: ['Whale shark encounters', 'Coral reefs', 'Snorkeling', 'Marine life'],
      fr: ['Rencontres avec les requins-baleines', 'Récifs coralliens', 'Snorkeling', 'Vie marine']
    }
  },
  { 
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    icon: TreesIcon,
    iconColor: 'text-olive',
    image: '/images/destinations/day-forest.jpg',
    description: { 
      en: 'Unique biodiversity hotspot in the mountains.', 
      fr: 'Hotspot de biodiversité unique dans les montagnes.' 
    },
    longDescription: {
      en: 'Day Forest is a national park located in the mountains of Djibouti. It is a biodiversity hotspot, home to many endemic plant and bird species.',
      fr: 'La Forêt du Day est un parc national situé dans les montagnes de Djibouti. C\'est un hotspot de biodiversité, abritant de nombreuses espèces de plantes et d\'oiseaux endémiques.'
    },
    location: { en: 'Day Mountains, Southern Djibouti', fr: 'Montagnes du Day, Sud de Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 4,
    coordinates: '11.53°N, 42.55°E',
    highlights: {
      en: ['Endemic bird species', 'Juniper forest', 'Mountain views', 'Hiking trails'],
      fr: ['Espèces d\'oiseaux endémiques', 'Forêt de genévriers', 'Vues sur les montagnes', 'Sentiers de randonnée']
    }
  },
  { 
    name: { en: 'Moucha Islands', fr: 'Îles Moucha' },
    slug: { en: 'moucha-islands', fr: 'iles-moucha' },
    icon: SunriseIcon,
    iconColor: 'text-cyan-500',
    image: '/images/destinations/moucha-islands.jpg',
    description: { 
      en: 'Pristine islands with white sand beaches and excellent snorkeling.', 
      fr: 'Îles préservées avec des plages de sable blanc et un excellent snorkeling.' 
    },
    longDescription: {
      en: 'Moucha Islands are a group of pristine islands in the Gulf of Tadjoura. Known for their white sand beaches, crystal-clear turquoise waters, and excellent snorkeling opportunities.',
      fr: 'Les Îles Moucha sont un groupe d\'îles préservées dans le Golfe de Tadjoura. Connues pour leurs plages de sable blanc, leurs eaux turquoise cristallines et leurs excellentes opportunités de snorkeling.'
    },
    location: { en: 'Gulf of Tadjoura, Djibouti', fr: 'Golfe de Tadjoura, Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 4,
    coordinates: '11.72°N, 43.20°E',
    highlights: {
      en: ['White sand beaches', 'Turquoise water', 'Snorkeling', 'Island escape'],
      fr: ['Plages de sable blanc', 'Eau turquoise', 'Snorkeling', 'Escapade insulaire']
    }
  },
  { 
    name: { en: 'Maskali Islands', fr: 'Îles Maskali' },
    slug: { en: 'maskali-islands', fr: 'iles-maskali' },
    icon: SunriseIcon,
    iconColor: 'text-blue-400',
    image: '/images/destinations/maskali-islands.jpg',
    description: { 
      en: 'Neighboring islands to Moucha, known for calm waters and marine life.', 
      fr: 'Îles voisines de Moucha, connues pour leurs eaux calmes et leur vie marine.' 
    },
    longDescription: {
      en: 'Maskali Islands are located near Moucha Islands in the Gulf of Tadjoura. They are known for their calm waters, abundant marine life, and peaceful atmosphere.',
      fr: 'Les Îles Maskali sont situées près des Îles Moucha dans le Golfe de Tadjoura. Elles sont connues pour leurs eaux calmes, leur vie marine abondante et leur atmosphère paisible.'
    },
    location: { en: 'Gulf of Tadjoura, Djibouti', fr: 'Golfe de Tadjoura, Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 3,
    coordinates: '11.70°N, 43.18°E',
    highlights: {
      en: ['Calm waters', 'Snorkeling', 'Tropical fish', 'Peaceful atmosphere'],
      fr: ['Eaux calmes', 'Snorkeling', 'Poissons tropicaux', 'Atmosphère paisible']
    }
  },
  { 
    name: { en: 'Seven Brothers Islands', fr: 'Îles des Sept Frères' },
    slug: { en: 'seven-brothers-islands', fr: 'iles-sept-freres' },
    icon: CompassIcon,
    iconColor: 'text-indigo-500',
    image: '/images/destinations/seven-brothers.jpg',
    description: { 
      en: 'Remote archipelago with seabird colonies and untouched beaches.', 
      fr: 'Archipel isolé avec des colonies d\'oiseaux marins et des plages préservées.' 
    },
    longDescription: {
      en: 'The Seven Brothers Islands are a remote archipelago in the Gulf of Tadjoura. This hidden gem is home to thousands of seabirds, pristine beaches, and some of the best snorkeling in the Red Sea.',
      fr: 'Les Îles des Sept Frères sont un archipel isolé dans le Golfe de Tadjoura. Ce joyau caché abrite des milliers d\'oiseaux marins, des plages immaculées et certains des meilleurs spots de snorkeling de la Mer Rouge.'
    },
    location: { en: 'Gulf of Tadjoura, Djibouti', fr: 'Golfe de Tadjoura, Djibouti' },
    bestTime: { en: 'November to March', fr: 'Novembre à Mars' },
    tours: 2,
    coordinates: '11.80°N, 43.30°E',
    highlights: {
      en: ['Seabird colonies', 'Remote beaches', 'Photography', 'Snorkeling'],
      fr: ['Colonies d\'oiseaux marins', 'Plages isolées', 'Photographie', 'Snorkeling']
    }
  },
  { 
    name: { en: 'Dittilou', fr: 'Dittilou' },
    slug: { en: 'dittilou', fr: 'dittilou' },
    icon: MountainIcon,
    iconColor: 'text-emerald-500',
    image: '/images/destinations/dittilou.jpg',
    description: { 
      en: 'Mountain camp with waterfalls and green monkeys in the Goda Mountains.', 
      fr: 'Camp de montagne avec cascades et singes verts dans les Monts Goda.' 
    },
    longDescription: {
      en: 'Dittilou is a mountain camp located in the Goda Mountains at over 600 meters altitude. The camp was established in 1988 and is surrounded by lush vegetation and abundant wildlife. The area is known for its spectacular waterfall, green monkeys, and cooler mountain climate. It is a popular base for hiking and exploring the Goda Mountains.',
      fr: 'Dittilou est un camp de montagne situé dans les Monts Goda à plus de 600 mètres d\'altitude. Le camp a été créé en 1988 et est entouré d\'une végétation luxuriante et d\'une faune abondante. La région est connue pour sa cascade spectaculaire, ses singes verts et son climat montagnard plus frais. C\'est une base populaire pour la randonnée et l\'exploration des Monts Goda.'
    },
    location: { en: 'Goda Mountains, Djibouti', fr: 'Monts Goda, Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 1,
    coordinates: '11.53°N, 42.55°E',
    highlights: {
      en: ['Waterfall hike', 'Green monkey sightings', 'Mountain views', 'Traditional toukoul huts'],
      fr: ['Randonnée à la cascade', 'Observation des singes verts', 'Vues sur les montagnes', 'Huttes traditionnelles toukoul']
    }
  },
  { 
    name: { en: 'Allols', fr: 'Allols' },
    slug: { en: 'allols', fr: 'allols' },
    icon: WavesIcon,
    iconColor: 'text-teal-500',
    image: '/images/destinations/allols.jpg',
    description: { 
      en: 'Hidden coastal gem with pristine beaches and crystal-clear waters.', 
      fr: 'Joyau côtier caché avec des plages immaculées et des eaux cristallines.' 
    },
    longDescription: {
      en: 'Allols is a hidden coastal paradise in Djibouti. With its pristine beaches, crystal-clear waters, and peaceful atmosphere, it\'s the perfect escape for those seeking tranquility.',
      fr: 'Allols est un paradis côtier caché à Djibouti. Avec ses plages immaculées, ses eaux cristallines et son atmosphère paisible, c\'est l\'escapade parfaite pour ceux qui recherchent la tranquillité.'
    },
    location: { en: 'Coastal Djibouti', fr: 'Côte de Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 2,
    coordinates: '11.70°N, 43.10°E',
    highlights: {
      en: ['Pristine beaches', 'Crystal-clear water', 'Peaceful atmosphere', 'Swimming'],
      fr: ['Plages immaculées', 'Eaux cristallines', 'Atmosphère paisible', 'Baignade']
    }
  },
  { 
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    icon: BuildingIcon,
    iconColor: 'text-teal',
    image: '/images/destinations/djibouti-city.jpg',
    description: { 
      en: 'Vibrant capital with rich culture and history.', 
      fr: 'Capitale vibrante avec une riche culture et histoire.' 
    },
    longDescription: {
      en: 'Djibouti City is the capital and largest city of Djibouti. It is a vibrant and multicultural city with a rich history, featuring French colonial architecture, bustling markets, and a beautiful waterfront.',
      fr: 'Djibouti Ville est la capitale et la plus grande ville de Djibouti. C\'est une ville vibrante et multiculturelle avec une riche histoire, présentant une architecture coloniale française, des marchés animés et un beau front de mer.'
    },
    location: { en: 'Djibouti City, Djibouti', fr: 'Djibouti Ville, Djibouti' },
    bestTime: { en: 'All year round', fr: 'Toute l\'année' },
    tours: 2,
    coordinates: '11.59°N, 43.15°E',
    highlights: {
      en: ['French colonial architecture', 'Central Market', 'National Museum', 'Waterfront'],
      fr: ['Architecture coloniale française', 'Marché central', 'Musée national', 'Front de mer']
    }
  },
];

function getDestinationBySlug(slug: string, locale: Locale) {
  return destinationsData.find(d => d.slug[locale] === slug) || null;
}

function getToursForDestination(destinationName: string, locale: Locale) {
  if (!destinationName) return [];
  
  // Dittilou specific tour
  if (destinationName.toLowerCase() === 'dittilou') {
    return [{
      id: 'dittilou-mountain-day-trip',
      title: {
        en: 'Dittilou Mountain Day Trip',
        fr: 'Excursion d\'une Journée à Dittilou'
      },
      price: 160,
      duration: 1
    }];
  }
  
  // Other tours
  const allTours = [
    { id: '1', title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' }, price: 150, duration: 1 },
    { id: '2', title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' }, price: 250, duration: 1 },
    { id: '3', title: { en: 'Lac Abbé & Ardoukoba', fr: 'Lac Abbé & Ardoukoba' }, price: 350, duration: 2 },
  ];
  
  const searchTerm = destinationName.toLowerCase();
  
  return allTours.filter(tour => {
    const titleEn = tour.title.en?.toLowerCase() || '';
    const titleFr = tour.title.fr?.toLowerCase() || '';
    return titleEn.includes(searchTerm) || titleFr.includes(searchTerm);
  });
}

export default function DestinationDetailPage({ params }: Props) {
  const { locale, slug } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const [imageError, setImageError] = useState(false);
  
  const destination = getDestinationBySlug(slug, validLocale);
  
  if (!destination) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-2xl font-heading text-teal mb-4">Destination Not Found</h1>
        <p className="text-nearblack/70">The destination you're looking for doesn't exist.</p>
        <Link href={`/${validLocale}/destinations`} className="text-terracotta hover:text-terracotta/80 transition-colors mt-4 inline-block">
          ← Back to Destinations
        </Link>
      </div>
    );
  }

  const relatedTours = getToursForDestination(destination.name[validLocale], validLocale);

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-nearblack/50 mb-6">
          <Link href={`/${validLocale}`} className="hover:text-teal transition-colors">
            {validLocale === 'en' ? 'Home' : 'Accueil'}
          </Link>
          <span>/</span>
          <Link href={`/${validLocale}/destinations`} className="hover:text-teal transition-colors">
            {validLocale === 'en' ? 'Destinations' : 'Destinations'}
          </Link>
          <span>/</span>
          <span className="text-nearblack">{destination.name[validLocale]}</span>
        </nav>

        {/* Back Button */}
        <Link
          href={`/${validLocale}/destinations`}
          className="inline-flex items-center gap-2 text-teal hover:text-terracotta transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {validLocale === 'en' ? 'Back to Destinations' : 'Retour aux Destinations'}
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-8">
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-teal/10 to-cream flex items-center justify-center overflow-hidden">
            {destination.image && !imageError ? (
              <img
                src={destination.image}
                alt={destination.name[validLocale]}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-5xl font-heading">{destination.name[validLocale]}</h1>
              <p className="text-white/80 mt-2 max-w-2xl">{destination.description[validLocale]}</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-heading text-teal mb-4">
                {validLocale === 'en' ? 'About' : 'À Propos'}
              </h2>
              <p className="text-nearblack/80 leading-relaxed">
                {destination.longDescription[validLocale]}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-heading text-teal mb-4">
                {validLocale === 'en' ? 'Highlights' : 'Points Forts'}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.highlights[validLocale].map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2 text-nearblack/80">
                    <span className="text-ochre text-lg">✦</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Tours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-heading text-teal mb-4">
                {validLocale === 'en' ? 'Tours Available' : 'Circuits Disponibles'}
              </h2>
              {relatedTours.length > 0 ? (
                <div className="space-y-3">
                  {relatedTours.map((tour) => {
                    const slugMap: Record<string, string> = {
                      '1': 'lake-assal-discovery',
                      '2': 'whale-shark-adventure',
                      '3': 'lac-abbe-ardoukoba',
                      'dittilou-mountain-day-trip': 'dittilou-mountain-day-trip'
                    };
                    const tourSlug = slugMap[tour.id] || 'lake-assal-discovery';
                    
                    return (
                      <Link
                        key={tour.id}
                        href={`/${validLocale}/tours/${tourSlug}`}
                        className="flex items-center justify-between p-4 bg-cream rounded-xl hover:bg-teal/5 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-teal">{tour.title[validLocale]}</div>
                          <div className="text-sm text-nearblack/50">{tour.duration} {validLocale === 'en' ? 'day' : 'jour'}</div>
                        </div>
                        <div className="text-lg font-bold text-teal">${tour.price}</div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-nearblack/60">
                  {validLocale === 'en' ? 'No tours available for this destination yet.' : 'Aucun circuit disponible pour cette destination pour le moment.'}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading text-lg text-teal mb-4">
                {validLocale === 'en' ? 'Information' : 'Informations'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-teal mt-0.5" />
                  <div>
                    <div className="text-xs text-nearblack/50">
                      {validLocale === 'en' ? 'Location' : 'Emplacement'}
                    </div>
                    <div className="text-sm text-nearblack">{destination.location[validLocale]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-teal mt-0.5" />
                  <div>
                    <div className="text-xs text-nearblack/50">
                      {validLocale === 'en' ? 'Best Time to Visit' : 'Meilleure Période pour Visiter'}
                    </div>
                    <div className="text-sm text-nearblack">{destination.bestTime[validLocale]}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-teal mt-0.5" />
                  <div>
                    <div className="text-xs text-nearblack/50">
                      {validLocale === 'en' ? 'Tours Available' : 'Circuits Disponibles'}
                    </div>
                    <div className="text-sm text-nearblack">{destination.tours} tours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-teal text-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading text-lg mb-2">
                {validLocale === 'en' ? 'Ready to Explore?' : 'Prêt à Explorer ?'}
              </h3>
              <p className="text-cream/80 text-sm mb-4">
                {validLocale === 'en' 
                  ? `Book a tour to ${destination.name[validLocale]} today.` 
                  : `Réservez un circuit pour ${destination.name[validLocale]} dès aujourd'hui.`}
              </p>
              <Link
                href={`/${validLocale}/tours`}
                className="block text-center bg-ochre text-nearblack hover:bg-ochre/90 px-4 py-3 rounded-lg font-medium transition"
              >
                {validLocale === 'en' ? 'View Tours' : 'Voir les Circuits'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}