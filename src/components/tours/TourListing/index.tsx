'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { TourCard } from '../TourCard';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon
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

// Quick filter categories
const getCategories = (locale: Locale) => [
  { id: 'all', label: locale === 'en' ? 'All Tours' : 'Tous les Circuits' },
  { id: 'adventure', label: locale === 'en' ? 'Adventure' : 'Aventure' },
  { id: 'nature', label: locale === 'en' ? 'Nature' : 'Nature' },
  { id: 'beach', label: locale === 'en' ? 'Beach' : 'Plage' },
  { id: 'wildlife', label: locale === 'en' ? 'Wildlife' : 'Faune' },
  { id: 'culture', label: locale === 'en' ? 'Culture' : 'Culture' },
  { id: 'relaxation', label: locale === 'en' ? 'Relaxation' : 'Détente' },
];

export function TourListing({ locale, filters }: Props) {
  const [allTours, setAllTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch tours
  useEffect(() => {
    async function fetchTours() {
      try {
        const q = query(
          collection(db, 'tours'),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        const snapshot = await getDocs(q);
        const tourData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllTours(tourData);
        setFilteredTours(tourData);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  // Apply filters
  useEffect(() => {
    if (allTours.length === 0) return;

    let result = [...allTours];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(tour => 
        tour.categories?.some((c: string) => c.toLowerCase() === activeCategory)
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase().trim();
      result = result.filter(tour => 
        tour.title?.[locale]?.toLowerCase().includes(searchLower) ||
        tour.shortDescription?.[locale]?.toLowerCase().includes(searchLower) ||
        tour.destinations?.some((d: string) => d.toLowerCase().includes(searchLower))
      );
    }

    // Destination filter
    if (filters.destination) {
      result = result.filter(tour => 
        tour.destinations?.some((d: string) => d.toLowerCase() === filters.destination?.toLowerCase())
      );
    }

    // Duration filter
    if (filters.duration) {
      const duration = parseInt(filters.duration);
      result = result.filter(tour => tour.duration === duration);
    }

    // Price filter
    if (filters.price) {
      const [minStr, maxStr] = filters.price.split('-');
      const min = Number(minStr);
      const max = Number(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        result = result.filter(tour => tour.price >= min && tour.price <= max);
      }
    }

    setFilteredTours(result);
  }, [searchQuery, activeCategory, filters, allTours, locale]);

  const totalTours = filteredTours.length;
  const categories = getCategories(locale);

  const content = {
    en: {
      results: 'tours found',
      noResults: 'No tours found matching your criteria.',
      clearFilters: 'Clear all filters',
      showing: 'Showing',
    },
    fr: {
      results: 'circuits trouvés',
      noResults: 'Aucun circuit trouvé correspondant à vos critères.',
      clearFilters: 'Effacer tous les filtres',
      showing: 'Affichage de',
    },
  };

  const t = content[locale];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Search & Filter Section */}
      <div className="p-6 md:p-8 border-b border-cream">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-nearblack/40 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'en' ? 'Search tours...' : 'Rechercher des circuits...'}
              className="w-full pl-12 pr-4 py-3 bg-cream/50 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none text-nearblack placeholder:text-nearblack/40"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-2 bg-cream/50 px-4 py-3 rounded-xl border border-cream text-nearblack/60 font-medium"
          >
            <FunnelIcon className="w-5 h-5" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Results Count */}
          <div className="text-sm text-nearblack/50 whitespace-nowrap">
            {t.showing} <span className="font-medium text-teal">{totalTours}</span> {t.results}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-teal text-white shadow-md shadow-teal/20'
                  : 'bg-cream/50 text-nearblack/60 hover:bg-cream hover:text-nearblack'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Filters Display */}
        {(filters.destination || filters.duration || filters.price) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.destination && (
              <span className="inline-flex items-center gap-1 bg-teal/10 text-teal text-sm px-3 py-1 rounded-full">
                📍 {filters.destination}
                <button onClick={() => window.location.href = `/${locale}/tours`}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {filters.duration && (
              <span className="inline-flex items-center gap-1 bg-teal/10 text-teal text-sm px-3 py-1 rounded-full">
                ⏱ {filters.duration} days
                <button onClick={() => window.location.href = `/${locale}/tours`}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {filters.price && (
              <span className="inline-flex items-center gap-1 bg-teal/10 text-teal text-sm px-3 py-1 rounded-full">
                💰 ${filters.price.replace('-', ' - $')}
                <button onClick={() => window.location.href = `/${locale}/tours`}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tour Grid */}
      {totalTours > 0 ? (
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} locale={locale} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-nearblack/70 text-lg">{t.noResults}</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              window.location.href = `/${locale}/tours`;
            }}
            className="mt-4 text-terracotta hover:text-terracotta/80 font-medium transition-colors"
          >
            {t.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}