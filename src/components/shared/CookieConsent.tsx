'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CookieConsent() {  // ⭐ No props
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Detect locale from URL
  const getLocale = () => {
    const segments = pathname?.split('/').filter(Boolean) || [];
    const firstSegment = segments[0];
    if (firstSegment === 'en' || firstSegment === 'fr') {
      return firstSegment;
    }
    return 'en';
  };

  const locale = getLocale();

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

  const content = {
    en: {
      message: 'We use cookies to improve your experience.',
      accept: 'Accept',
    },
    fr: {
      message: 'Nous utilisons des cookies pour améliorer votre expérience.',
      accept: 'Accepter',
    },
  };

  const t = content[locale as 'en' | 'fr'] || content.en;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-teal/95 backdrop-blur-md border-t border-white/10 p-4">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/80">{t.message}</p>
          <button
            onClick={acceptCookies}
            className="bg-ochre text-nearblack px-6 py-2 rounded-lg text-sm font-medium hover:bg-ochre/90 transition-all whitespace-nowrap"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}