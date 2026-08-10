'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
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

export function TourListing({ locale, filters }: Props) {
  const [allTours, setAllTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch tours from Firebase
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

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(tour => 
        tour.title?.[locale]?.toLowerCase().includes(searchLower) ||
        tour.shortDescription?.[locale]?.toLowerCase().includes(searchLower)
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

    // Category filter
    if (filters.category) {
      result = result.filter(tour => 
        tour.categories?.some((c: string) => c.toLowerCase() === filters.category?.toLowerCase())
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
  }, [filters, allTours, locale]);

  // Get unique values for filters
  const destinations = [...new Set(allTours.flatMap(t => t.destinations || []))];
  const categories = [...new Set(allTours.flatMap(t => t.categories || []))];
  const durations = [...new Set(allTours.map(t => t.duration || 1))].sort();

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