'use client';

import { Locale } from '@/types';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
}

const reviews = {
  en: [
    { 
      name: 'Sarah Mitchell', 
      location: 'United Kingdom',
      rating: 5, 
      date: 'December 2024',
      comment: 'An incredible experience! Lake Assal was breathtaking and our guide was fantastic. The organization was flawless from start to finish.',
      tour: 'Lake Assal Discovery'
    },
    { 
      name: 'James Kowalski', 
      location: 'Poland',
      rating: 5, 
      date: 'November 2024',
      comment: 'Swimming with whale sharks was a dream come true. Highly recommend this tour to anyone visiting Djibouti. Unforgettable!',
      tour: 'Whale Shark Adventure'
    },
    { 
      name: 'Emma Laurent', 
      location: 'France',
      rating: 5, 
      date: 'October 2024',
      comment: 'Great organization and beautiful destinations. Lac Abbé was surreal - like being on another planet. The team was so knowledgeable.',
      tour: 'Lac Abbé & Ardoukoba'
    },
    { 
      name: 'David Chen', 
      location: 'Singapore',
      rating: 4, 
      date: 'September 2024',
      comment: 'Everything was well planned and executed. The local guide\'s knowledge of the area made the experience even better.',
      tour: 'Day Forest Trek'
    },
  ],
  fr: [
    { 
      name: 'Marie Dupont', 
      location: 'France',
      rating: 5, 
      date: 'Décembre 2024',
      comment: 'Une expérience incroyable ! Le Lac Assal était à couper le souffle et notre guide était fantastique. L\'organisation était parfaite.',
      tour: 'Découverte du Lac Assal'
    },
    { 
      name: 'Thomas Robert', 
      location: 'Belgique',
      rating: 5, 
      date: 'Novembre 2024',
      comment: 'Nager avec les requins-baleines était un rêve devenu réalité. Je recommande vivement ce circuit à tous les visiteurs de Djibouti.',
      tour: 'Aventure Requin-Baleine'
    },
    { 
      name: 'Sophie Lefèvre', 
      location: 'Suisse',
      rating: 5, 
      date: 'Octobre 2024',
      comment: 'Excellente organisation et de belles destinations. Le Lac Abbé était surréaliste - comme une autre planète. L\'équipe était très compétente.',
      tour: 'Lac Abbé & Ardoukoba'
    },
    { 
      name: 'Pierre Martin', 
      location: 'Canada',
      rating: 4, 
      date: 'Septembre 2024',
      comment: 'Tout était bien planifié et exécuté. La connaissance du guide local a rendu l\'expérience encore meilleure.',
      tour: 'Randonnée Forêt du Day'
    },
  ],
};

export function CustomerReviews({ locale }: Props) {
  const t = reviews[locale];

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
            {locale === 'en' ? 'Testimonials' : 'Témoignages'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
            {locale === 'en' ? 'What Our Travelers Say' : 'Ce que Disent Nos Voyageurs'}
          </h2>
          <p className="text-nearblack/70 text-lg">
            {locale === 'en' 
              ? 'Real reviews from real travelers who explored Djibouti with us.' 
              : 'De vrais avis de vrais voyageurs qui ont exploré Djibouti avec nous.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.map((review, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-1 text-ochre mb-3">
                {[...Array(5)].map((_, i) => (
                  i < review.rating ? (
                    <StarSolidIcon key={i} className="w-4 h-4 text-ochre" />
                  ) : (
                    <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                  )
                ))}
              </div>
              
              <div className="flex-1">
                <p className="text-nearblack/80 text-sm leading-relaxed mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
              
              <div className="border-t border-cream pt-4 mt-2">
                <p className="font-medium text-teal text-sm">{review.name}</p>
                <p className="text-nearblack/50 text-xs flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  {review.location}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs text-ochre font-medium bg-ochre/10 px-2 py-0.5 rounded">
                    {review.tour}
                  </span>
                  <span className="text-xs text-nearblack/40">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl shadow-md px-8 py-4">
            <div>
              <div className="text-3xl font-bold text-teal">4.8</div>
              <div className="text-sm text-nearblack/60">{locale === 'en' ? 'Average Rating' : 'Note Moyenne'}</div>
            </div>
            <div className="w-px h-10 bg-cream" />
            <div>
              <div className="text-3xl font-bold text-teal">100+</div>
              <div className="text-sm text-nearblack/60">{locale === 'en' ? 'Happy Travelers' : 'Voyageurs Satisfaits'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}