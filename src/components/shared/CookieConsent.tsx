'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

export function CookieConsent({ locale }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = {
    en: {
      message: 'We use cookies to enhance your experience. By continuing, you agree to our use of cookies.',
      accept: 'Accept',
      decline: 'Decline',
      learnMore: 'Learn More',
    },
    fr: {
      message: 'Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.',
      accept: 'Accepter',
      decline: 'Refuser',
      learnMore: 'En Savoir Plus',
    },
  };

  const t = content[locale];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-nearblack text-cream p-4 shadow-lg">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-cream/80 text-center sm:text-left">
          {t.message}
          <a href={`/${locale}/privacy`} className="text-ochre hover:underline ml-1">
            {t.learnMore}
          </a>
        </p>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 rounded-lg border border-cream/30 text-cream/70 hover:bg-cream/10 transition text-sm"
          >
            {t.decline}
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded-lg bg-ochre text-nearblack hover:bg-ochre/90 transition text-sm font-medium"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}