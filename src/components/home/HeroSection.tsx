'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
}

export function HeroSection({ locale }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  const content = {
    en: {
      title: 'Discover the Extraordinary Side of Djibouti',
      subtitle: 'Explore salt lakes, volcanic landscapes, hidden islands, and unforgettable wildlife experiences with local experts.',
      ctaPrimary: 'Explore Tours',
      ctaSecondary: 'Plan Your Trip',
      searchPlaceholder: 'Search experiences...',
      destinations: 'All Destinations',
      search: 'Search',
    },
    fr: {
      title: 'Découvrez le Côté Extraordinaire de Djibouti',
      subtitle: 'Explorez les lacs salés, les paysages volcaniques, les îles cachées et des expériences fauniques inoubliables avec des experts locaux.',
      ctaPrimary: 'Explorer les Circuits',
      ctaSecondary: 'Planifier Votre Voyage',
      searchPlaceholder: 'Rechercher des expériences...',
      destinations: 'Toutes les Destinations',
      search: 'Rechercher',
    },
  };

  const t = content[locale];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedDestination) params.set('destination', selectedDestination);
    router.push(`/${locale}/tours?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-teal overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/90 to-teal/80" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(222, 162, 58, 0.1) 0%, transparent 50%)`,
      }} />
      
      <div className="absolute top-20 right-20 w-64 h-64 bg-ochre/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm text-cream px-4 py-2 rounded-full mb-6 border border-cream/20 animate-fade-in">
            <StarIcon className="w-4 h-4 text-ochre" />
            <span className="text-sm font-medium tracking-wide">
              {locale === 'en' ? 'Local Experts • Since 2020' : 'Experts Locaux • Depuis 2020'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white leading-[1.1] mb-6 animate-slide-up">
            {t.title}
          </h1>

          <p className="text-lg md:text-xl text-cream/90 mb-10 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t.subtitle}
          </p>

          {/* Search Bar - Now Functional */}
          <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md rounded-2xl p-2 md:p-3 mb-8 border border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 text-white placeholder:text-cream/60 rounded-xl border border-white/10 focus:border-ochre focus:ring-2 focus:ring-ochre/20 transition-all outline-none"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 min-w-[150px]">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/60 w-5 h-5" />
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 text-white rounded-xl border border-white/10 focus:border-ochre focus:ring-2 focus:ring-ochre/20 transition-all appearance-none outline-none cursor-pointer"
                  >
                    <option value="" className="text-nearblack">{t.destinations}</option>
                    <option value="Lake Assal" className="text-nearblack">Lake Assal</option>
                    <option value="Lac Abbé" className="text-nearblack">Lac Abbé</option>
                    <option value="Tadjoura Gulf" className="text-nearblack">Tadjoura Gulf</option>
                    <option value="Ardoukoba" className="text-nearblack">Ardoukoba</option>
                    <option value="Day Forest" className="text-nearblack">Day Forest</option>
                    <option value="Moucha Island" className="text-nearblack">Moucha Island</option>
                    <option value="Djibouti City" className="text-nearblack">Djibouti City</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  {t.search}
                </button>
              </div>
            </div>
          </form>

          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href={`/${locale}/tours`}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              {t.ctaPrimary}
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/destinations`}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              {t.ctaSecondary}
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-3xl font-bold text-ochre">50+</div>
              <div className="text-cream/70 text-sm">{locale === 'en' ? 'Unique Tours' : 'Circuits Uniques'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ochre">1000+</div>
              <div className="text-cream/70 text-sm">{locale === 'en' ? 'Happy Travelers' : 'Voyageurs Satisfaits'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ochre">4.9★</div>
              <div className="text-cream/70 text-sm">{locale === 'en' ? 'Average Rating' : 'Note Moyenne'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ochre">15+</div>
              <div className="text-cream/70 text-sm">{locale === 'en' ? 'Destinations' : 'Destinations'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}