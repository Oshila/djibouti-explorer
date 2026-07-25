'use client';

import { Locale } from '@/types';
import { 
  UserGroupIcon,
  HeartIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
}

export function WhyChooseUs({ locale }: Props) {
  const features = {
    en: [
      { 
        icon: UserGroupIcon,
        title: 'Local Experts', 
        description: 'Our guides are passionate locals who know every corner of Djibouti.' 
      },
      { 
        icon: HeartIcon,
        title: 'Authentic Experiences', 
        description: 'We offer genuine experiences that go beyond typical tourist routes.' 
      },
      { 
        icon: ChartBarIcon,
        title: 'Best Price Guarantee', 
        description: 'Direct bookings with no hidden fees or middleman markups.' 
      },
      { 
        icon: ClockIcon,
        title: '24/7 Support', 
        description: 'We\'re here to help you before, during, and after your trip.' 
      },
    ],
    fr: [
      { 
        icon: UserGroupIcon,
        title: 'Experts Locaux', 
        description: 'Nos guides sont des locaux passionnés qui connaissent chaque recoin de Djibouti.' 
      },
      { 
        icon: HeartIcon,
        title: 'Expériences Authentiques', 
        description: 'Nous proposons des expériences authentiques qui vont au-delà des circuits touristiques habituels.' 
      },
      { 
        icon: ChartBarIcon,
        title: 'Meilleur Prix Garanti', 
        description: 'Réservations directes sans frais cachés ni marges intermédiaires.' 
      },
      { 
        icon: ClockIcon,
        title: 'Support 24/7', 
        description: 'Nous sommes là pour vous aider avant, pendant et après votre voyage.' 
      },
    ],
  };

  const t = features[locale];

  return (
    <section className="section-padding bg-teal text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-ochre font-medium text-sm uppercase tracking-wider">
            {locale === 'en' ? 'Why Choose Us' : 'Pourquoi Nous Choisir'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading mt-2 mb-4">
            {locale === 'en' ? 'Travel With Confidence' : 'Voyagez En Toute Confiance'}
          </h2>
          <p className="text-cream/80 text-lg">
            {locale === 'en' 
              ? 'We combine local knowledge with exceptional service to create unforgettable journeys.' 
              : 'Nous combinons la connaissance locale avec un service exceptionnel pour créer des voyages inoubliables.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-ochre/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-ochre" />
                </div>
                <h3 className="text-xl font-heading mb-2 text-ochre">{feature.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-12 text-cream/60">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-ochre" />
            <span className="text-sm">{locale === 'en' ? 'Licensed & Insured' : 'Agréé & Assuré'}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrophyIcon className="w-5 h-5 text-ochre" />
            <span className="text-sm">{locale === 'en' ? 'Award Winning' : 'Primé'}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-ochre" />
            <span className="text-sm">{locale === 'en' ? '10+ Years Experience' : '10+ Ans d\'Expérience'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}