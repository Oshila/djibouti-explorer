'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { TourCard } from '../TourCard';
import { TourFilters } from '../TourFilters';
import { TourSearch } from '../TourSearch';
import { TourGrid } from '../TourGrid';
import { 
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
  filters: {
    search?: string;
    destination?: string;
    duration?: string;
    price?: string;
    category?: string;
  };
}

// Mock data - will be replaced with Firebase
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
    maxGroupSize: 8,
    rating: 4.9,
    reviewCount: 42,
    categories: ['nature', 'adventure'],
    destinations: ['Lake Assal'],
    images: { primary: '/images/lake-assal.jpg' },
    featured: true,
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
    maxGroupSize: 10,
    rating: 4.8,
    reviewCount: 38,
    categories: ['wildlife', 'adventure'],
    destinations: ['Tadjoura Gulf'],
    images: { primary: '/images/whale-shark.jpg' },
    featured: true,
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
    maxGroupSize: 6,
    rating: 4.7,
    reviewCount: 29,
    categories: ['adventure', 'culture'],
    destinations: ['Lac Abbé', 'Ardoukoba'],
    images: { primary: '/images/lac-abbe.jpg' },
    featured: true,
  },
  {
    id: '4',
    title: { en: 'Day Forest Trek', fr: 'Randonnée Forêt du Day' },
    slug: { en: 'day-forest-trek', fr: 'randonnee-foret-day' },
    shortDescription: { 
      en: 'Trek through the lush Day Forest, home to unique flora and bird species.',
      fr: 'Randonnez à travers la luxuriante Forêt du Day, abritant une flore et des espèces d\'oiseaux uniques.'
    },
    price: 180,
    currency: 'USD',
    duration: 1,
    maxGroupSize: 12,
    rating: 4.6,
    reviewCount: 21,
    categories: ['nature', 'hiking'],
    destinations: ['Day Forest'],
    images: { primary: '/images/day-forest.jpg' },
    featured: false,
  },
  {
    id: '5',
    title: { en: 'Moucha & Maskali Islands', fr: 'Îles Moucha & Maskali' },
    slug: { en: 'moucha-maskali-islands', fr: 'iles-moucha-maskali' },
    shortDescription: { 
      en: 'Escape to paradise on these stunning islands with pristine beaches and snorkeling.',
      fr: 'Évadez-vous vers le paradis sur ces îles magnifiques avec des plages immaculées et du snorkeling.'
    },
    price: 220,
    currency: 'USD',
    duration: 1,
    maxGroupSize: 15,
    rating: 4.9,
    reviewCount: 34,
    categories: ['beach', 'relaxation'],
    destinations: ['Moucha Island', 'Maskali Island'],
    images: { primary: '/images/moucha-island.jpg' },
    featured: false,
  },
  {
    id: '6',
    title: { en: 'Djibouti City Culture Tour', fr: 'Circuit Culturel Djibouti Ville' },
    slug: { en: 'djibouti-city-culture-tour', fr: 'circuit-culturel-djibouti-ville' },
    shortDescription: { 
      en: 'Explore the vibrant markets, French colonial architecture, and rich history of the capital.',
      fr: 'Explorez les marchés vibrants, l\'architecture coloniale française et la riche histoire de la capitale.'
    },
    price: 120,
    currency: 'USD',
    duration: 1,
    maxGroupSize: 20,
    rating: 4.5,
    reviewCount: 18,
    categories: ['culture', 'city'],
    destinations: ['Djibouti City'],
    images: { primary: '/images/djibouti-city.jpg' },
    featured: false,
  },
  {
    id: '7',
    title: { en: 'Ardoukoba Volcano Hike', fr: 'Randonnée Volcan Ardoukoba' },
    slug: { en: 'ardoukoba-volcano-hike', fr: 'randonnee-volcan-ardoukoba' },
    shortDescription: { 
      en: 'Hike the active Ardoukoba volcano and witness the dramatic landscapes of the Great Rift Valley.',
      fr: 'Randonnez sur le volcan actif Ardoukoba et découvrez les paysages spectaculaires de la Vallée du Grand Rift.'
    },
    price: 280,
    currency: 'USD',
    duration: 2,
    maxGroupSize: 8,
    rating: 4.8,
    reviewCount: 25,
    categories: ['adventure', 'hiking'],
    destinations: ['Ardoukoba'],
    images: { primary: '/images/ardoukoba.jpg' },
    featured: false,
  },
  {
    id: '8',
    title: { en: 'Gulf of Tadjoura Boat Tour', fr: 'Tour en Bateau Golfe de Tadjoura' },
    slug: { en: 'gulf-tadjoura-boat-tour', fr: 'tour-bateau-golfe-tadjoura' },
    shortDescription: { 
      en: 'Explore the stunning coastline and marine life of the Gulf of Tadjoura by boat.',
      fr: 'Explorez la magnifique côte et la vie marine du Golfe de Tadjoura en bateau.'
    },
    price: 190,
    currency: 'USD',
    duration: 1,
    maxGroupSize: 12,
    rating: 4.7,
    reviewCount: 19,
    categories: ['beach', 'wildlife'],
    destinations: ['Tadjoura Gulf'],
    images: { primary: '/images/tadjoura-boat.jpg' },
    featured: false,
  },
];

export function TourListing({ locale, filters }: Props) {
  const [filteredTours, setFilteredTours] = useState(mockTours);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique destinations for filter
  const destinations = [...new Set(mockTours.flatMap(t => t.destinations))];
  const categories = [...new Set(mockTours.flatMap(t => t.categories))];
  const durations = [1, 2, 3, 4, 5, 7];

  // Apply filters
  useEffect(() => {
    let result = [...mockTours];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(tour => 
        tour.title[locale].toLowerCase().includes(searchLower) ||
        tour.shortDescription[locale].toLowerCase().includes(searchLower)
      );
    }

    // Destination filter
    if (filters.destination) {
      result = result.filter(tour => 
        tour.destinations.some(d => d.toLowerCase() === filters.destination?.toLowerCase())
      );
    }

    // Duration filter
    if (filters.duration) {
      const duration = parseInt(filters.duration);
      result = result.filter(tour => tour.duration === duration);
    }

    // Category filter
    if (filters.category) {
      result = result.filter(tour => 
        tour.categories.some(c => c.toLowerCase() === filters.category?.toLowerCase())
      );
    }

    // Price filter
    if (filters.price) {
      const [minStr, maxStr] = filters.price.split('-');
      const min = Number(minStr);
      const max = Number(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        result = result.filter(tour => tour.price >= min && tour.price <= max);
      } else if (!isNaN(min)) {
        result = result.filter(tour => tour.price >= min);
      }
    }

    setFilteredTours(result);
  }, [filters, locale]);

  const totalTours = filteredTours.length;
  const content = {
    en: {
      title: 'All Tours',
      subtitle: 'Discover the best experiences Djibouti has to offer.',
      noResults: 'No tours found matching your criteria.',
      clearFilters: 'Clear Filters',
      showing: 'Showing',
      tours: 'tours',
    },
    fr: {
      title: 'Tous les Circuits',
      subtitle: 'Découvrez les meilleures expériences que Djibouti a à offrir.',
      noResults: 'Aucun circuit trouvé correspondant à vos critères.',
      clearFilters: 'Effacer les Filtres',
      showing: 'Affichage de',
      tours: 'circuits',
    },
  };

  const t = content[locale];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading text-teal mb-2">
          {t.title}
        </h1>
        <p className="text-nearblack/70">{t.subtitle}</p>
        <p className="text-sm text-nearblack/50 mt-2">
          {t.showing} {totalTours} {t.tours}
        </p>
      </div>

      {/* Search Bar */}
      <TourSearch locale={locale} initialSearch={filters.search} />

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-cream rounded-xl py-3 text-teal font-medium hover:bg-cream transition-colors"
        >
          <FunnelIcon className="w-5 h-5" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters + Results */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="lg:sticky lg:top-24">
            <TourFilters 
              locale={locale} 
              destinations={destinations}
              categories={categories}
              durations={durations}
              currentFilters={filters}
            />
          </div>
        </div>

        {/* Tour Grid */}
        <div className="flex-1">
          {totalTours > 0 ? (
            <TourGrid tours={filteredTours} locale={locale} />
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-nearblack/70">{t.noResults}</p>
              <button
                onClick={() => window.location.href = `/${locale}/tours`}
                className="mt-4 text-terracotta hover:text-terracotta/80 font-medium transition-colors"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}