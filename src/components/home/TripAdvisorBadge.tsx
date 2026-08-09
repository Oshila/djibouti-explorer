'use client';

import { Locale } from '@/types';
import { StarIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
}

export function TripAdvisorBadge({ locale }: Props) {
  const content = {
    en: {
      rating: '5.0',
      reviews: '100+ 5-star reviews',
      view: 'View on TripAdvisor →',
      excellence: 'TripAdvisor Excellence',
    },
    fr: {
      rating: '5.0',
      reviews: '100+ avis 5 étoiles',
      view: 'Voir sur TripAdvisor →',
      excellence: 'TripAdvisor Excellence',
    },
  };

  const t = content[locale];

  return (
    <a
      href="https://www.tripadvisor.com/Attraction_Review-g293787-d34320815-Reviews-Djibouti_Explorer-Djibouti.html"
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-6 py-4 border border-cream hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo + Stars + Rating */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="text-sm font-bold text-teal">TripAdvisor</div>
          
          {/* Stars */}
          <div className="flex items-center gap-0.5 text-ochre">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5" />
            ))}
          </div>
          
          {/* Rating */}
          <div className="text-lg font-bold text-teal">{t.rating}</div>
        </div>
        
        {/* Right: Excellence Badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs bg-olive/10 text-olive font-medium px-2.5 py-1 rounded-full">
            {t.excellence}
          </span>
          <span className="text-xs text-teal hover:text-terracotta transition-colors">
            →
          </span>
        </div>
      </div>
      
      {/* Reviews text */}
      <div className="text-xs text-nearblack/50 mt-1 text-center">
        {t.reviews}
      </div>
    </a>
  );
}