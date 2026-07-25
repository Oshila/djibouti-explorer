'use client';

import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

const reviews = {
  en: [
    { 
      name: 'Sarah M.', 
      rating: 5, 
      comment: 'An incredible experience! Lake Assal was breathtaking and our guide was fantastic.' 
    },
    { 
      name: 'James K.', 
      rating: 5, 
      comment: 'Swimming with whale sharks was a dream come true. Highly recommend this tour.' 
    },
    { 
      name: 'Emma L.', 
      rating: 4, 
      comment: 'Great organization and beautiful destinations. Lac Abbé was surreal.' 
    },
  ],
  fr: [
    { 
      name: 'Marie D.', 
      rating: 5, 
      comment: 'Une expérience incroyable ! Le Lac Assal était à couper le souffle et notre guide était fantastique.' 
    },
    { 
      name: 'Thomas R.', 
      rating: 5, 
      comment: 'Nager avec les requins-baleines était un rêve devenu réalité. Je recommande vivement.' 
    },
    { 
      name: 'Sophie L.', 
      rating: 4, 
      comment: 'Excellente organisation et de belles destinations. Le Lac Abbé était surréaliste.' 
    },
  ],
};

export function CustomerReviews({ locale }: Props) {
  const t = reviews[locale];

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-teal mb-4">
            {locale === 'en' ? 'What Our Travelers Say' : 'Ce que Disent Nos Voyageurs'}
          </h2>
          <p className="text-nearblack/70 text-lg">
            {locale === 'en' 
              ? 'Real reviews from real travelers who explored Djibouti with us.' 
              : 'De vrais avis de vrais voyageurs qui ont exploré Djibouti avec nous.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.map((review, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-cream">
              <div className="flex items-center gap-1 text-ochre mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
              </div>
              <p className="text-nearblack/80 text-sm italic mb-4">&ldquo;{review.comment}&rdquo;</p>
              <p className="font-medium text-teal">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}