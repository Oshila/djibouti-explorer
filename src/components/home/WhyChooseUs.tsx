'use client';

import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

export function WhyChooseUs({ locale }: Props) {
  const features = {
    en: [
      { title: 'Local Experts', description: 'Our guides are passionate locals who know every corner of Djibouti.' },
      { title: 'Authentic Experiences', description: 'We offer genuine experiences that go beyond typical tourist routes.' },
      { title: 'Best Price Guarantee', description: 'Direct bookings with no hidden fees or middleman markups.' },
      { title: '24/7 Support', description: 'We\'re here to help you before, during, and after your trip.' },
    ],
    fr: [
      { title: 'Experts Locaux', description: 'Nos guides sont des locaux passionnés qui connaissent chaque recoin de Djibouti.' },
      { title: 'Expériences Authentiques', description: 'Nous proposons des expériences authentiques qui vont au-delà des circuits touristiques habituels.' },
      { title: 'Meilleur Prix Garanti', description: 'Réservations directes sans frais cachés ni marges intermédiaires.' },
      { title: 'Support 24/7', description: 'Nous sommes là pour vous aider avant, pendant et après votre voyage.' },
    ],
  };

  const t = features[locale];

  return (
    <section className="section-padding bg-teal text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            {locale === 'en' ? 'Why Travel With Us' : 'Pourquoi Voyager Avec Nous'}
          </h2>
          <p className="text-cream/80 text-lg">
            {locale === 'en' 
              ? 'We combine local knowledge with exceptional service to create unforgettable journeys.' 
              : 'Nous combinons la connaissance locale avec un service exceptionnel pour créer des voyages inoubliables.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-ochre/20 rounded-lg flex items-center justify-center mb-4 text-2xl">
                {['🌟', '🌍', '💰', '🕐'][index]}
              </div>
              <h3 className="text-xl font-heading mb-2 text-ochre">{feature.title}</h3>
              <p className="text-cream/80 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}