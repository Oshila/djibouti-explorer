'use client';

import { Locale } from '@/types';
import { 
  CalendarIcon,
  CloudIcon,
  SunIcon,
  WindowIcon
} from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
}

export function SeasonalRecommendations({ locale }: Props) {
  const seasons = {
    en: {
      title: 'Best Time to Visit',
      subtitle: 'Plan your trip around the seasons for the best experiences.',
      months: [
        { 
          name: 'November - February', 
          icon: SunIcon,
          label: 'Cool & Dry', 
          description: 'Best for hiking, volcano treks, and Lake Assal visits.' 
        },
        { 
          name: 'March - May', 
          icon: CloudIcon,
          label: 'Warm & Pleasant', 
          description: 'Great for whale shark encounters and island visits.' 
        },
        { 
          name: 'June - September', 
          icon: WindowIcon,
          label: 'Hot & Windy', 
          description: 'Excellent for kite surfing and coastal activities.' 
        },
        { 
          name: 'October', 
          icon: SunIcon,
          label: 'Transition', 
          description: 'Good for all activities with fewer crowds.' 
        },
      ],
      cta: 'View Seasonal Tours',
    },
    fr: {
      title: 'Meilleure Période pour Visiter',
      subtitle: 'Planifiez votre voyage en fonction des saisons pour les meilleures expériences.',
      months: [
        { 
          name: 'Novembre - Février', 
          icon: SunIcon,
          label: 'Frais & Sec', 
          description: 'Idéal pour la randonnée, les treks volcaniques et la visite du Lac Assal.' 
        },
        { 
          name: 'Mars - Mai', 
          icon: CloudIcon,
          label: 'Chaud & Agréable', 
          description: 'Parfait pour les rencontres avec les requins-baleines et les visites d\'îles.' 
        },
        { 
          name: 'Juin - Septembre', 
          icon: WindowIcon,
          label: 'Chaud & Venteux', 
          description: 'Excellent pour le kitesurf et les activités côtières.' 
        },
        { 
          name: 'Octobre', 
          icon: SunIcon,
          label: 'Transition', 
          description: 'Bon pour toutes les activités avec moins de foule.' 
        },
      ],
      cta: 'Voir les Circuits Saisonniers',
    },
  };

  const t = seasons[locale];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
            {locale === 'en' ? 'Seasonal Guide' : 'Guide Saisonnier'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-nearblack/70 text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.months.map((month, index) => {
            const Icon = month.icon;
            return (
              <div key={index} className="bg-cream rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-cream hover:border-teal/20">
                <div className="text-teal/40 mb-3 flex justify-center">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="font-heading text-lg text-teal mb-1 text-center">{month.name}</h3>
                <div className="text-sm text-ochre font-medium mb-3 text-center">
                  {month.label}
                </div>
                <p className="text-nearblack/70 text-sm leading-relaxed text-center">{month.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href={`/${locale}/tours`}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}