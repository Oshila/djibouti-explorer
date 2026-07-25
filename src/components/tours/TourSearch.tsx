'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
  initialSearch?: string;
}

export function TourSearch({ locale, initialSearch = '' }: Props) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.push(`/${locale}/tours?${params.toString()}`);
  };

  const content = {
    en: {
      placeholder: 'Search tours...',
      button: 'Search',
    },
    fr: {
      placeholder: 'Rechercher des circuits...',
      button: 'Rechercher',
    },
  };

  const t = content[locale];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2 bg-white rounded-xl p-1 border border-cream">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-nearblack/40 w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.placeholder}
            className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-nearblack placeholder:text-nearblack/40"
          />
        </div>
        <button
          type="submit"
          className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          {t.button}
        </button>
      </div>
    </form>
  );
}