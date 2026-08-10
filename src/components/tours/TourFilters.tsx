'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { 
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
  destinations: string[];
  categories: string[];
  durations: number[];
  currentFilters: {
    destination?: string;
    duration?: string;
    price?: string;
    category?: string;
  };
}

export function TourFilters({ 
  locale, 
  destinations = [], 
  categories = [], 
  durations = [], 
  currentFilters = {}
}: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string[]>(['destination', 'duration', 'price', 'category']);

  const toggleExpand = (section: string) => {
    setExpanded(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/${locale}/tours?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(`/${locale}/tours`);
  };

  const content = {
    en: {
      filters: 'Filters',
      destination: 'Destination',
      duration: 'Duration',
      price: 'Price',
      category: 'Category',
      clearAll: 'Clear All',
      days: 'days',
      all: 'All',
    },
    fr: {
      filters: 'Filtres',
      destination: 'Destination',
      duration: 'Durée',
      price: 'Prix',
      category: 'Catégorie',
      clearAll: 'Tout Effacer',
      days: 'jours',
      all: 'Tous',
    },
  };

  const t = content[locale];

  const priceRanges = [
    { label: `$0 - $100`, value: '0-100' },
    { label: `$100 - $200`, value: '100-200' },
    { label: `$200 - $300`, value: '200-300' },
    { label: `$300+`, value: '300-0' },
  ];

  const isActive = (key: string, value: string) => {
    return currentFilters[key as keyof typeof currentFilters] === value;
  };

  const FilterSection = ({ 
    title, 
    id, 
    children 
  }: { 
    title: string; 
    id: string; 
    children: React.ReactNode;
  }) => {
    const isExpanded = expanded.includes(id);
    return (
      <div className="border-b border-cream pb-4 mb-4 last:border-0 last:mb-0">
        <button
          onClick={() => toggleExpand(id)}
          className="w-full flex items-center justify-between text-left font-medium text-nearblack hover:text-teal transition-colors"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  // If no filters available, show a message
  if (destinations.length === 0 && categories.length === 0 && durations.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-cream">
        <h3 className="font-heading text-xl text-teal mb-4">{t.filters}</h3>
        <p className="text-sm text-nearblack/50">No filters available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-cream">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-cream">
        <h3 className="font-heading text-xl text-teal">{t.filters}</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-terracotta hover:text-terracotta/80 font-medium transition-colors"
        >
          {t.clearAll}
        </button>
      </div>

      {/* Destination Filter */}
      {destinations.length > 0 && (
        <FilterSection title={t.destination} id="destination">
          <button
            onClick={() => updateFilter('destination', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentFilters.destination 
                ? 'bg-teal text-white' 
                : 'hover:bg-cream'
            }`}
          >
            {t.all}
          </button>
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => updateFilter('destination', dest)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive('destination', dest)
                  ? 'bg-teal text-white'
                  : 'hover:bg-cream'
              }`}
            >
              {dest}
            </button>
          ))}
        </FilterSection>
      )}

      {/* Duration Filter */}
      {durations.length > 0 && (
        <FilterSection title={t.duration} id="duration">
          <button
            onClick={() => updateFilter('duration', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentFilters.duration 
                ? 'bg-teal text-white' 
                : 'hover:bg-cream'
            }`}
          >
            {t.all}
          </button>
          {durations.map((dur) => (
            <button
              key={dur}
              onClick={() => updateFilter('duration', String(dur))}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive('duration', String(dur))
                  ? 'bg-teal text-white'
                  : 'hover:bg-cream'
              }`}
            >
              {dur} {t.days}
            </button>
          ))}
        </FilterSection>
      )}

      {/* Price Filter */}
      <FilterSection title={t.price} id="price">
        <button
          onClick={() => updateFilter('price', '')}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            !currentFilters.price 
              ? 'bg-teal text-white' 
              : 'hover:bg-cream'
          }`}
        >
          {t.all}
        </button>
        {priceRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => updateFilter('price', range.value)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive('price', range.value)
                ? 'bg-teal text-white'
                : 'hover:bg-cream'
            }`}
          >
            {range.label}
          </button>
        ))}
      </FilterSection>

      {/* Category Filter */}
      {categories.length > 0 && (
        <FilterSection title={t.category} id="category">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !currentFilters.category 
                ? 'bg-teal text-white' 
                : 'hover:bg-cream'
            }`}
          >
            {t.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter('category', cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive('category', cat)
                  ? 'bg-teal text-white'
                  : 'hover:bg-cream'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </FilterSection>
      )}
    </div>
  );
}