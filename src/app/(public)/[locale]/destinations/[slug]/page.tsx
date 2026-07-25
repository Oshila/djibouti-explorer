import { Locale } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon,
  MountainIcon,
  WavesIcon,
  TreesIcon,
  SaladIcon,
  CompassIcon,
  BuildingIcon,
  SunriseIcon
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

// Destination data with icons
const destinations = [
  { 
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    icon: MountainIcon,
    iconColor: 'text-teal',
    description: { 
      en: 'Lowest point in Africa and the saltiest lake on Earth.', 
      fr: 'Point le plus bas d\'Afrique et le lac le plus salé de la Terre.' 
    },
    longDescription: {
      en: 'Lake Assal is a crater lake in central-western Djibouti, located at the southern end of the Danakil Depression. It is the lowest point in Africa at 155 meters below sea level, and the saltiest lake outside Antarctica. The lake is surrounded by a white salt crust and black volcanic rocks, creating a surreal landscape that looks like another planet.',
      fr: 'Le Lac Assal est un lac de cratère dans le centre-ouest de Djibouti, situé à l\'extrémité sud de la dépression de Danakil. C\'est le point le plus bas d\'Afrique à 155 mètres sous le niveau de la mer, et le lac le plus salé en dehors de l\'Antarctique. Le lac est entouré d\'une croûte de sel blanche et de roches volcaniques noires, créant un paysage surréaliste qui ressemble à une autre planète.'
    },
    location: { en: 'Danakil Depression, Central Djibouti', fr: 'Dépression de Danakil, Centre de Djibouti' },
    bestTime: { en: 'November to February', fr: 'Novembre à Février' },
    tours: 8,
    image: '',
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
    description: { 
      en: 'Otherworldly limestone chimneys in the desert.', 
      fr: 'Cheminées de calcaire d\'un autre monde dans le désert.' 
    },
    longDescription: {
      en: 'Lac Abbé is a salt lake located on the border between Djibouti and Ethiopia. It is famous for its otherworldly landscape of limestone chimneys that rise from the desert floor. These chimney-like formations were created by volcanic activity and erosion over thousands of years. The lake is also home to flamingos and other bird species.',
      fr: 'Le Lac Abbé est un lac salé situé à la frontière entre Djibouti et l\'Éthiopie. Il est célèbre pour son paysage d\'un autre monde de cheminées de calcaire qui s\'élèvent du désert. Ces formations en forme de cheminée ont été créées par l\'activité volcanique et l\'érosion sur des milliers d\'années. Le lac abrite également des flamants roses et d\'autres espèces d\'oiseaux.'
    },
    location: { en: 'Ethiopia-Djibouti Border', fr: 'Frontière Éthiopie-Djibouti' },
    bestTime: { en: 'November to March', fr: 'Novembre à Mars' },
    tours: 6,
    image: '',
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
    description: { 
      en: 'Whale shark paradise in crystal-clear waters.', 
      fr: 'Paradis des requins-baleines dans des eaux cristallines.' 
    },
    longDescription: {
      en: 'The Gulf of Tadjoura is a gulf of the Indian Ocean located in the Horn of Africa. It is known for its crystal-clear waters, coral reefs, and abundant marine life. The gulf is one of the best places in the world to swim with whale sharks, which visit the area from October to February. The water temperature is warm year-round, making it perfect for snorkeling and diving.',
      fr: 'Le Golfe de Tadjoura est un golfe de l\'océan Indien situé dans la Corne de l\'Afrique. Il est connu pour ses eaux cristallines, ses récifs coralliens et sa vie marine abondante. Le golfe est l\'un des meilleurs endroits au monde pour nager avec les requins-baleines, qui visitent la région d\'octobre à février. La température de l\'eau est chaude toute l\'année, ce qui la rend parfaite pour le snorkeling et la plongée.'
    },
    location: { en: 'Gulf of Tadjoura, Northern Djibouti', fr: 'Golfe de Tadjoura, Nord de Djibouti' },
    bestTime: { en: 'October to February', fr: 'Octobre à Février' },
    tours: 5,
    image: '',
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
    description: { 
      en: 'Unique biodiversity hotspot in the mountains.', 
      fr: 'Hotspot de biodiversité unique dans les montagnes.' 
    },
    longDescription: {
      en: 'Day Forest is a national park located in the mountains of Djibouti. It is a biodiversity hotspot, home to many endemic plant and bird species. The forest is one of the few areas in Djibouti with significant vegetation, including juniper trees and acacia. It is a paradise for bird watchers and nature lovers.',
      fr: 'La Forêt du Day est un parc national situé dans les montagnes de Djibouti. C\'est un hotspot de biodiversité, abritant de nombreuses espèces de plantes et d\'oiseaux endémiques. La forêt est l\'une des rares zones de Djibouti avec une végétation significative, comprenant des genévriers et des acacias. C\'est un paradis pour les ornithologues et les amoureux de la nature.'
    },
    location: { en: 'Day Mountains, Southern Djibouti', fr: 'Montagnes du Day, Sud de Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 4,
    image: '',
    coordinates: '11.53°N, 42.55°E',
    highlights: {
      en: ['Endemic bird species', 'Juniper forest', 'Mountain views', 'Hiking trails'],
      fr: ['Espèces d\'oiseaux endémiques', 'Forêt de genévriers', 'Vues sur les montagnes', 'Sentiers de randonnée']
    }
  },
  { 
    name: { en: 'Moucha Island', fr: 'Île Moucha' },
    slug: { en: 'moucha-island', fr: 'ile-moucha' },
    icon: SaladIcon,
    iconColor: 'text-cyan-500',
    description: { 
      en: 'Pristine beaches and excellent snorkeling.', 
      fr: 'Plages immaculées et excellent snorkeling.' 
    },
    longDescription: {
      en: 'Moucha Island is a beautiful island located in the Gulf of Tadjoura. It is known for its pristine white sand beaches, crystal-clear turquoise waters, and excellent snorkeling opportunities. The island is uninhabited, making it a perfect escape from the city. Visitors can enjoy swimming, sunbathing, and exploring the coral reefs.',
      fr: 'L\'Île Moucha est une belle île située dans le Golfe de Tadjoura. Elle est connue pour ses plages de sable blanc immaculé, ses eaux turquoise cristallines et ses excellentes opportunités de snorkeling. L\'île est inhabitée, ce qui en fait une escapade parfaite loin de la ville. Les visiteurs peuvent profiter de la baignade, des bains de soleil et de l\'exploration des récifs coralliens.'
    },
    location: { en: 'Gulf of Tadjoura, Djibouti', fr: 'Golfe de Tadjoura, Djibouti' },
    bestTime: { en: 'November to April', fr: 'Novembre à Avril' },
    tours: 3,
    image: '',
    coordinates: '11.72°N, 43.20°E',
    highlights: {
      en: ['White sand beaches', 'Turquoise water', 'Snorkeling', 'Island escape'],
      fr: ['Plages de sable blanc', 'Eau turquoise', 'Snorkeling', 'Escapade insulaire']
    }
  },
  { 
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    icon: CompassIcon,
    iconColor: 'text-terracotta',
    description: { 
      en: 'Active volcano in the Great Rift Valley.', 
      fr: 'Volcan actif dans la Vallée du Grand Rift.' 
    },
    longDescription: {
      en: 'Ardoukoba is an active volcano located in the Great Rift Valley of Djibouti. It last erupted in 1978, creating a new landscape of lava flows and craters. The volcano offers spectacular views of the surrounding desert and the Rift Valley. Hiking to the top of Ardoukoba is a challenging but rewarding experience.',
      fr: 'Ardoukoba est un volcan actif situé dans la Vallée du Grand Rift de Djibouti. Il est entré en éruption pour la dernière fois en 1978, créant un nouveau paysage de coulées de lave et de cratères. Le volcan offre des vues spectaculaires sur le désert environnant et la Vallée du Rift. L\'ascension de l\'Ardoukoba est une expérience difficile mais gratifiante.'
    },
    location: { en: 'Great Rift Valley, Central Djibouti', fr: 'Vallée du Grand Rift, Centre de Djibouti' },
    bestTime: { en: 'November to March', fr: 'Novembre à Mars' },
    tours: 3,
    image: '',
    coordinates: '11.55°N, 42.05°E',
    highlights: {
      en: ['Active volcano', 'Lava fields', 'Rift Valley views', 'Hiking'],
      fr: ['Volcan actif', 'Champs de lave', 'Vues sur la Vallée du Rift', 'Randonnée']
    }
  },
  { 
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    icon: BuildingIcon,
    iconColor: 'text-teal',
    description: { 
      en: 'Vibrant capital with rich culture and history.', 
      fr: 'Capitale vibrante avec une riche culture et histoire.' 
    },
    longDescription: {
      en: 'Djibouti City is the capital and largest city of Djibouti. It is a vibrant and multicultural city with a rich history. The city features French colonial architecture, bustling markets, and a beautiful waterfront. Visitors can explore the national museum, visit the Central Market, and enjoy the city\'s diverse cuisine.',
      fr: 'Djibouti Ville est la capitale et la plus grande ville de Djibouti. C\'est une ville vibrante et multiculturelle avec une riche histoire. La ville présente une architecture coloniale française, des marchés animés et un beau front de mer. Les visiteurs peuvent explorer le musée national, visiter le marché central et profiter de la cuisine diversifiée de la ville.'
    },
    location: { en: 'Djibouti City, Djibouti', fr: 'Djibouti Ville, Djibouti' },
    bestTime: { en: 'All year round', fr: 'Toute l\'année' },
    tours: 2,
    image: '',
    coordinates: '11.59°N, 43.15°E',
    highlights: {
      en: ['French colonial architecture', 'Central Market', 'National Museum', 'Waterfront'],
      fr: ['Architecture coloniale française', 'Marché central', 'Musée national', 'Front de mer']
    }
  },
];

function getDestinationBySlug(slug: string, locale: Locale) {
  return destinations.find(d => d.slug[locale] === slug) || null;
}

function getToursForDestination(destinationName: string, locale: Locale) {
  const mockTours = [
    { id: '1', title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' }, price: 150, duration: 1 },
    { id: '2', title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' }, price: 250, duration: 1 },
    { id: '3', title: { en: 'Lac Abbé & Ardoukoba', fr: 'Lac Abbé & Ardoukoba' }, price: 350, duration: 2 },
  ];
  
  const searchTerm = destinationName.toLowerCase();
  const firstWord = searchTerm.split(' ')[0] || '';

  return mockTours.filter(tour => {
    const title = tour.title[locale].toLowerCase();
    return title.includes(searchTerm) || title.includes(firstWord);
  });
}

export default async function DestinationDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const destination = getDestinationBySlug(slug, validLocale);
  
  if (!destination) {
    notFound();
  }

  const relatedTours = getToursForDestination(destination.name[validLocale], validLocale);
  const Icon = destination.icon;

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
          <div className={`relative h-64 md:h-96 bg-gradient-to-br from-teal/10 to-cream flex items-center justify-center`}>
            <Icon className={`w-24 h-24 ${destination.iconColor} opacity-20`} />
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
                    <span className="text-ochre">✦</span>
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
                  {relatedTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/${validLocale}/tours/${tour.id === '1' ? 'lake-assal-discovery' : tour.id === '2' ? 'whale-shark-adventure' : 'lac-abbe-ardoukoba'}`}
                      className="flex items-center justify-between p-4 bg-cream rounded-xl hover:bg-teal/5 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-teal">{tour.title[validLocale]}</div>
                        <div className="text-sm text-nearblack/50">{tour.duration} {validLocale === 'en' ? 'day' : 'jour'}</div>
                      </div>
                      <div className="text-lg font-bold text-teal">${tour.price}</div>
                    </Link>
                  ))}
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