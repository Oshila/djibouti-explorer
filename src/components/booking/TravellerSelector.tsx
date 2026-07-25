'use client';

import { useState } from 'react';
import { Locale } from '@/types';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Props {
  tour: any;
  locale: Locale;
  onNext: (data: any) => void;
  onBack: () => void;
  initialTravellers: {
    adults: number;
    children: number;
    infants: number;
  };
}

export function TravellerSelector({ tour, locale, onNext, onBack, initialTravellers }: Props) {
  const [travellers, setTravellers] = useState(initialTravellers);
  const [error, setError] = useState('');

  const total = travellers.adults + travellers.children + travellers.infants;

  const updateTravellers = (type: 'adults' | 'children' | 'infants', change: number) => {
    const newValue = travellers[type] + change;
    if (newValue < 0) return;
    if (type === 'adults' && newValue === 0) return;
    if (total + change > tour.maxGroupSize) {
      setError(locale === 'en' 
        ? `Maximum ${tour.maxGroupSize} travellers allowed` 
        : `Maximum ${tour.maxGroupSize} voyageurs autorisés`);
      return;
    }
    setError('');
    setTravellers({ ...travellers, [type]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (total === 0) {
      setError(locale === 'en' ? 'Please select at least 1 traveller' : 'Veuillez sélectionner au moins 1 voyageur');
      return;
    }
    onNext({ travellers });
  };

  const content = {
    en: {
      title: 'How Many Travellers?',
      subtitle: 'Select the number of people joining the tour.',
      adults: 'Adults (12+)',
      children: 'Children (4-11)',
      infants: 'Infants (0-3)',
      max: 'Max capacity:',
      continue: 'Continue to Details',
      back: 'Back to Date',
    },
    fr: {
      title: 'Combien de Voyageurs ?',
      subtitle: 'Sélectionnez le nombre de personnes participant au circuit.',
      adults: 'Adultes (12+)',
      children: 'Enfants (4-11)',
      infants: 'Nourrissons (0-3)',
      max: 'Capacité max :',
      continue: 'Continuer vers Coordonnées',
      back: 'Retour à la Date',
    },
  };

  const t = content[locale];

  return (
    <div>
      <h2 className="text-xl font-heading text-teal mb-2">{t.title}</h2>
      <p className="text-nearblack/60 text-sm mb-6">{t.subtitle}</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {/* Adults */}
          <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
            <div>
              <div className="font-medium text-nearblack">{t.adults}</div>
              <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Required' : 'Requis'}</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateTravellers('adults', -1)}
                className="w-8 h-8 rounded-full border border-nearblack/20 flex items-center justify-center hover:bg-white transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-8 text-center">{travellers.adults}</span>
              <button
                type="button"
                onClick={() => updateTravellers('adults', 1)}
                className="w-8 h-8 rounded-full border border-nearblack/20 flex items-center justify-center hover:bg-white transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
            <div>
              <div className="font-medium text-nearblack">{t.children}</div>
              <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Optional' : 'Optionnel'}</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateTravellers('children', -1)}
                className="w-8 h-8 rounded-full border border-nearblack/20 flex items-center justify-center hover:bg-white transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-8 text-center">{travellers.children}</span>
              <button
                type="button"
                onClick={() => updateTravellers('children', 1)}
                className="w-8 h-8 rounded-full border border-nearblack/20 flex items-center justify-center hover:bg-white transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
            <div>
              <div className="font-medium text-nearblack">{t.infants}</div>
              <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Optional' : 'Optionnel'}</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateTravellers('infants', -1)}
                className="w-8 h-8 rounded-full border border-nearblack/20 flex items-center justify-center hover:bg-white transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium w-8 text-center">{travellers.infants}</span>
              <button
                type="button"
                onClick={() => updateTravellers('infants', 1)}
                className="w-8 h-8 rounded-full border border-nearblack/20 flex items-center justify-center hover:bg-white transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Max capacity */}
          <div className="text-sm text-nearblack/50 text-center">
            {t.max} {tour.maxGroupSize} {locale === 'en' ? 'people' : 'personnes'}
          </div>
        </div>

        {error && (
          <p className="text-terracotta text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition-colors"
          >
            {t.back}
          </button>
          <button
            type="submit"
            className="flex-1 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            {t.continue}
          </button>
        </div>
      </form>
    </div>
  );
}