'use client';

import Link from 'next/link';
import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

export function HeroSection({ locale }: Props) {
  const content = {
    en: {
      title: 'Discover the Extraordinary Side of Djibouti',
      subtitle: 'Explore salt lakes, volcanic landscapes, hidden islands, and unforgettable wildlife experiences with local experts.',
      ctaPrimary: 'Explore Tours',
      ctaSecondary: 'Plan Your Trip',
    },
    fr: {
      title: 'Découvrez le Côté Extraordinaire de Djibouti',
      subtitle: 'Explorez les lacs salés, les paysages volcaniques, les îles cachées et des expériences fauniques inoubliables avec des experts locaux.',
      ctaPrimary: 'Explorer les Circuits',
      ctaSecondary: 'Planifier Votre Voyage',
    },
  };

  const t = content[locale];

  return (
    <section className="relative min-h-[80vh] flex items-center bg-teal overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/90 to-teal/80" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-ochre/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm text-cream px-4 py-2 rounded-full mb-6 border border-cream/20">
            <span className="w-2 h-2 bg-ochre rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              {locale === 'en' ? 'Local Experts • Since 2020' : 'Experts Locaux • Depuis 2020'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white leading-tight mb-6">
            {t.title}
          </h1>

          <p className="text-lg md:text-xl text-cream/90 mb-10 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/tours`}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/destinations`}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium border border-white/20 transition-all duration-300 hover:shadow-lg"
            >
              {t.ctaSecondary}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-ochre">50+</div>
              <div className="text-cream/70 text-sm">
                {locale === 'en' ? 'Unique Tours' : 'Circuits Uniques'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ochre">1000+</div>
              <div className="text-cream/70 text-sm">
                {locale === 'en' ? 'Happy Travelers' : 'Voyageurs Satisfaits'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ochre">15+</div>
              <div className="text-cream/70 text-sm">
                {locale === 'en' ? 'Destinations' : 'Destinations'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}