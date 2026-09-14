'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const pathname = usePathname();

  const getLocale = () => {
    const segments = pathname?.split('/').filter(Boolean) || [];
    const firstSegment = segments[0];
    if (firstSegment === 'en' || firstSegment === 'fr') {
      return firstSegment;
    }
    return 'en';
  };

  const locale = getLocale() as 'en' | 'fr';
  const isEn = locale === 'en';

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // ── ACCEPT ALL ─────────────────────────────
  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    // Enable analytics here if you use GTM/GA:
    // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    setIsVisible(false);
  };

  // ── DECLINE ALL (except strictly necessary) ─
  const declineAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    // Disable analytics here:
    // window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    setIsVisible(false);
  };

  // ── SAVE CUSTOM PREFERENCES ─────────────────
  const savePreferences = () => {
    const consent = {
      necessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="bg-teal/95 backdrop-blur-md text-cream rounded-2xl shadow-2xl border border-white/10 p-5 sm:p-6">
          {/* ── MAIN BANNER ── */}
          {!showPreferences ? (
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Text */}
              <div className="flex-1">
                <h3 className="font-heading text-lg text-white mb-1">
                  {isEn ? 'We value your privacy' : 'Nous respectons votre vie privée'}
                </h3>
                <p className="text-sm text-cream/70 leading-relaxed">
                  {isEn
                    ? 'We use cookies to run the site, understand how it\'s used, and personalize your experience. You can accept all, decline non-essential cookies, or customize your preferences.'
                    : 'Nous utilisons des cookies pour faire fonctionner le site, comprendre son utilisation et personnaliser votre expérience. Vous pouvez tout accepter, refuser les cookies non essentiels ou personnaliser vos préférences.'}{' '}
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-ochre hover:text-ochre/80 underline underline-offset-2"
                  >
                    {isEn ? 'Privacy Policy' : 'Politique de Confidentialité'}
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full lg:w-auto">
                {/* Customize */}
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center justify-center gap-1.5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-cream px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                >
                  <Cog6ToothIcon className="w-4 h-4" />
                  {isEn ? 'Customize' : 'Personnaliser'}
                </button>

                {/* Decline */}
                <button
                  onClick={declineAll}
                  className="border border-white/20 hover:border-white/40 hover:bg-white/10 text-cream px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                >
                  {isEn ? 'Decline' : 'Refuser'}
                </button>

                {/* Accept */}
                <button
                  onClick={acceptAll}
                  className="bg-ochre hover:bg-ochre/90 text-nearblack px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg whitespace-nowrap"
                >
                  {isEn ? 'Accept All' : 'Tout Accepter'}
                </button>
              </div>

              {/* Close (only hides — same as decline for non-essential) */}
              <button
                onClick={declineAll}
                aria-label="Close"
                className="hidden lg:block p-1.5 hover:bg-white/10 rounded-lg transition-colors text-cream/50 hover:text-cream"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* ── PREFERENCES PANEL ── */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg text-white">
                  {isEn ? 'Cookie Preferences' : 'Préférences des Cookies'}
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  aria-label="Back"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-cream/50 hover:text-cream"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                {/* Necessary — always on */}
                <div className="flex items-start justify-between gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">
                      {isEn ? 'Strictly Necessary' : 'Strictement Nécessaires'}
                    </p>
                    <p className="text-xs text-cream/60 mt-1">
                      {isEn
                        ? 'Required for the site to function (login, booking, security). Cannot be disabled.'
                        : 'Requis pour le fonctionnement du site (connexion, réservation, sécurité). Ne peuvent pas être désactivés.'}
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-olive/20 text-olive px-3 py-1 rounded-full whitespace-nowrap">
                    {isEn ? 'Always On' : 'Toujours Actifs'}
                  </span>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">
                      {isEn ? 'Analytics' : 'Analytiques'}
                    </p>
                    <p className="text-xs text-cream/60 mt-1">
                      {isEn
                        ? 'Helps us understand how visitors use the site so we can improve it.'
                        : 'Nous aident à comprendre comment les visiteurs utilisent le site afin de l\'améliorer.'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ochre" />
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">
                      {isEn ? 'Marketing' : 'Marketing'}
                    </p>
                    <p className="text-xs text-cream/60 mt-1">
                      {isEn
                        ? 'Used to show relevant offers and measure campaign performance.'
                        : 'Utilisés pour afficher des offres pertinentes et mesurer les performances des campagnes.'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={marketingEnabled}
                      onChange={(e) => setMarketingEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ochre" />
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={declineAll}
                  className="flex-1 sm:flex-none border border-white/20 hover:border-white/40 hover:bg-white/10 text-cream px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  {isEn ? 'Decline All' : 'Tout Refuser'}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 sm:flex-none border border-white/20 hover:border-white/40 hover:bg-white/10 text-cream px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  {isEn ? 'Accept All' : 'Tout Accepter'}
                </button>
                <button
                  onClick={savePreferences}
                  className="flex-1 bg-ochre hover:bg-ochre/90 text-nearblack px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg"
                >
                  {isEn ? 'Save Preferences' : 'Enregistrer'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}