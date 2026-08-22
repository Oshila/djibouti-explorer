'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// ⭐ Clear Payment Icons
const VisaIcon = () => (
  <svg className="w-10 h-7" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="30" rx="4" fill="#1434CB"/>
    <path d="M19.5 9.8L17 19.4H13.8L16.3 9.8H19.5ZM25 10.2C24.3 9.9 23.4 9.6 22.3 9.6C19.1 9.6 16.8 11.4 16.8 13.8C16.8 15.7 18.4 16.7 19.7 17.3C21 17.9 21.4 18.3 21.4 18.8C21.4 19.5 20.6 19.8 19.8 19.8C18.7 19.8 18 19.5 17 19.1L16.5 18.9L16 21.4C16.8 21.8 18.2 22.1 19.6 22.1C23 22.1 25.1 20.4 25.1 17.8C25.1 15.7 23.4 14.6 22 14C20.7 13.4 20.3 12.9 20.3 12.4C20.3 11.9 20.8 11.4 21.9 11.4C22.9 11.4 23.7 11.7 24.2 11.9L24.6 12.1L25 10.2ZM31.8 9.8L29.9 19.4H27L28.9 9.8H31.8ZM38.3 9.8L35.5 15.8L35 13.4C34.4 11.4 33.1 10.1 31.4 9.8L34.4 19.4H37.4L41.3 9.8H38.3Z" fill="white"/>
    <path d="M11.6 9.8L9.1 17L8.8 15.7C8.3 13.7 6.5 12.2 4.5 11.5L7.1 19.4H10.1L14.6 9.8H11.6Z" fill="white"/>
  </svg>
);

const MastercardIcon = () => (
  <svg className="w-10 h-7" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="30" rx="4" fill="#2D2D2D"/>
    <circle cx="18" cy="15" r="10" fill="#EB001B"/>
    <circle cx="30" cy="15" r="10" fill="#F79E1B"/>
    <path d="M24 8.5C22.1 10 20.8 12.3 20.8 15C20.8 17.7 22.1 20 24 21.5C25.9 20 27.2 17.7 27.2 15C27.2 12.3 25.9 10 24 8.5Z" fill="#FF5F00"/>
  </svg>
);

const PayPalIcon = () => (
  <svg className="w-10 h-7" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="30" rx="4" fill="#003087"/>
    <path d="M16.8 6.8L15.2 17.2H12.8L14.4 6.8H16.8ZM21.6 7.6C20.8 7.3 19.7 7 18.4 7C14.8 7 12.2 9 12.2 11.8C12.2 14 14.1 15.1 15.6 15.8C17.1 16.5 17.5 16.9 17.5 17.5C17.5 18.3 16.6 18.6 15.7 18.6C14.4 18.6 13.7 18.3 12.5 17.8L11.9 17.5L11.3 20.3C12.1 20.8 13.7 21.1 15.3 21.1C19.1 21.1 21.5 19.2 21.5 16.3C21.5 14 19.5 12.7 18 12C16.6 11.3 16.1 10.8 16.1 10.2C16.1 9.6 16.6 9.1 17.9 9.1C19 9.1 19.9 9.4 20.5 9.6L20.9 9.8L21.6 7.6Z" fill="white"/>
    <path d="M27.6 6.8L26 17.2H23.6L25.2 6.8H27.6ZM33.6 7.6C32.8 7.3 31.7 7 30.4 7C26.8 7 24.2 9 24.2 11.8C24.2 14 26.1 15.1 27.6 15.8C29.1 16.5 29.5 16.9 29.5 17.5C29.5 18.3 28.6 18.6 27.7 18.6C26.4 18.6 25.7 18.3 24.5 17.8L23.9 17.5L23.3 20.3C24.1 20.8 25.7 21.1 27.3 21.1C31.1 21.1 33.5 19.2 33.5 16.3C33.5 14 31.5 12.7 30 12C28.6 11.3 28.1 10.8 28.1 10.2C28.1 9.6 28.6 9.1 29.9 9.1C31 9.1 31.9 9.4 32.5 9.6L32.9 9.8L33.6 7.6Z" fill="white"/>
  </svg>
);

const StripeIcon = () => (
  <svg className="w-10 h-7" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="30" rx="4" fill="#635BFF"/>
    <path d="M18.4 11.8C18.4 10.9 19.2 10.4 20.4 10.4C21.6 10.4 22.8 10.8 23.6 11.4L24.4 9.4C23.2 8.6 21.6 8.2 20 8.2C17.2 8.2 15.2 9.6 15.2 11.8C15.2 13.8 16.8 14.8 18.8 15.4C20.4 15.8 21.2 16.2 21.2 16.8C21.2 17.6 20.4 18.2 19.2 18.2C17.6 18.2 16 17.6 15.2 16.8L14.4 18.8C15.6 19.8 17.6 20.4 19.2 20.4C22.4 20.4 24.4 18.8 24.4 16.6C24.4 14.2 22.4 13.2 20.4 12.6C18.8 12.2 18.4 11.8 18.4 11.8Z" fill="white"/>
    <path d="M27.2 12.6C28 12.6 28.8 13 29.2 13.6L30.4 11.6C29.6 10.8 28.4 10.2 27.2 10.2C24.8 10.2 23.2 11.6 23.2 13.8C23.2 16 24.8 17.4 27.2 17.4C28.4 17.4 29.6 16.8 30.4 16L29.2 14C28.8 14.6 28 15 27.2 15C26 15 25.6 14.2 25.6 13.8C25.6 13.2 26 12.6 27.2 12.6Z" fill="white"/>
    <path d="M35.2 10.2C33.6 10.2 32 10.8 31.2 12L32.8 13.6C33.6 12.8 34.4 12.4 35.2 12.4C36 12.4 36.8 12.8 36.8 13.2V13.4C36.4 13.2 35.6 13 34.8 13C32.8 13 31.2 14 31.2 15.8C31.2 17.6 32.8 18.6 34.8 18.6C36 18.6 36.8 18.2 37.6 17.4V18.4H39.2V13.2C39.2 11.4 37.2 10.2 35.2 10.2ZM35.2 17C34.4 17 33.6 16.6 33.6 15.8C33.6 15 34.4 14.6 35.2 14.6C36 14.6 36.8 14.8 37.2 15V15.8C36.8 16.6 36 17 35.2 17Z" fill="white"/>
  </svg>
);

export default function Footer() {
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

  const content = {
    en: {
      company: 'Djibouti Explorer is your trusted local tour operator, offering authentic experiences across Djibouti.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      follow: 'Follow Us',
      rights: 'All rights reserved.',
      securePayments: 'Secure Payments',
      links: {
        tours: 'Tours',
        destinations: 'Destinations',
        visa: 'Visa',
        blog: 'Blog',
        about: 'About Us',
        contact: 'Contact',
      },
      tripadvisor: 'TripAdvisor Excellence',
      viewReviews: 'View Reviews',
    },
    fr: {
      company: "Djibouti Explorer est votre guide touristique local de confiance, offrant des expériences authentiques à travers Djibouti.",
      quickLinks: 'Liens Rapides',
      contact: 'Contact',
      follow: 'Suivez-Nous',
      rights: 'Tous droits réservés.',
      securePayments: 'Paiements Sécurisés',
      links: {
        tours: 'Circuits',
        destinations: 'Destinations',
        visa: 'Visa',
        blog: 'Blog',
        about: 'À Propos',
        contact: 'Contact',
      },
      tripadvisor: 'TripAdvisor Excellence',
      viewReviews: 'Voir les Avis',
    },
  };

  const t = content[locale] || content.en;
  const whatsappNumber = '+25377862639';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  const getHref = (key: string) => {
    const slugMap: Record<string, string> = {
      tours: 'tours',
      destinations: 'destinations',
      visa: 'visa',
      blog: 'blog',
      about: 'about',
      contact: 'contact',
    };
    return `/${locale}/${slugMap[key] || key}`;
  };

  return (
    <footer className="relative bg-nearblack text-cream/80 overflow-hidden">
      <div className="absolute inset-0 bg-nearblack" />
      <div className="absolute inset-0 bg-gradient-to-b from-nearblack via-teal/5 to-terracotta/10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-ochre/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="relative h-px bg-gradient-to-r from-transparent via-ochre/30 to-transparent" />

      <div className="relative container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1.5">
            <Link href={`/${locale}`} className="flex items-center gap-4 group">
              <div 
                className="flex-shrink-0 p-1.5 rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: '#141414',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/images/logo-footer3.jpg"
                  alt="Djibouti Explorer"
                  width={110}
                  height={50}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-heading text-xl leading-tight">Djibouti Explorer</h3>
                <span className="text-[10px] text-cream/40 tracking-wider uppercase">Travel • Djibouti</span>
              </div>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed mt-4 max-w-xs">
              {t.company}
            </p>
            
            {/* Social Media Links */}
            <div className="mt-4">
              <p className="text-cream/40 text-xs uppercase tracking-wider mb-3">
                {t.follow}
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com/djiboutiexplorer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream/40 hover:text-[#1877F2] transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/djiboutiexplorer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream/40 hover:text-[#E4405F] transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@djiboutiexplorer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream/40 hover:text-[#FF0000] transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/djiboutiexplorer" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream/40 hover:text-[#1DA1F2] transition-all duration-300 hover:scale-110"
                  aria-label="Twitter/X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Payment Methods with Icons */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-cream/40 text-xs uppercase tracking-wider mb-3">
                {t.securePayments}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <VisaIcon />
                <MastercardIcon />
                <PayPalIcon />
                <StripeIcon />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-4 relative">
              {t.quickLinks}
              <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-ochre rounded-full" />
            </h4>
            <ul className="space-y-2">
              {Object.entries(t.links).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={getHref(key)}
                    className="text-cream/50 hover:text-ochre transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-4 relative">
              {t.contact}
              <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-ochre rounded-full" />
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm group">
                <PhoneIcon className="w-4 h-4 text-ochre mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/50 hover:text-cream/80 transition-colors text-sm"
                >
                  {whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm group">
                <EnvelopeIcon className="w-4 h-4 text-ochre mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-cream/50 hover:text-cream/80 transition-colors text-sm">
                  info@djiboutiexplorer.com
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm group">
                <MapPinIcon className="w-4 h-4 text-ochre mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-cream/50 hover:text-cream/80 transition-colors text-sm">
                  Djibouti City, Djibouti
                </span>
              </li>
            </ul>
          </div>

          {/* TripAdvisor & CTA */}
          <div className="lg:col-span-1.5">
            <h4 className="text-white font-medium text-xs uppercase tracking-wider mb-4 relative">
              {locale === 'en' ? 'Trusted by Travelers' : 'Approuvé par les Voyageurs'}
              <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-ochre rounded-full" />
            </h4>
            
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g293787-d34320815-Reviews-Djibouti_Explorer-Djibouti.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/5 backdrop-blur-sm rounded-xl p-4 border-2 border-ochre/20 hover:border-ochre/50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative p-1 rounded-lg bg-gradient-to-r from-ochre/20 to-ochre/5 border border-ochre/10 mb-2">
                  <Image
                    src="/images/trip-advisor.jpg"
                    alt="TripAdvisor"
                    width={250}
                    height={50}
                    className="object-contain"
                  />
                </div>
                
                <div className="flex items-center gap-0.5 text-ochre mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon key={i} className="w-4 h-4" />
                  ))}
                </div>
                
                <div className="text-[10px] text-cream/40 mb-2">
                  {t.tripadvisor}
                </div>
                
                <div className="bg-ochre/10 text-ochre text-xs font-medium px-4 py-1.5 rounded-full group-hover:bg-ochre/20 transition-colors border border-ochre/10">
                  {t.viewReviews} →
                </div>
              </div>
            </a>

            <div className="mt-4">
              <p className="text-cream/40 text-xs mb-2.5 text-center">
                {locale === 'en' 
                  ? 'Ready to explore Djibouti?' 
                  : 'Prêt à explorer Djibouti ?'}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 w-full"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {locale === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-cream/30 text-xs">
            © {new Date().getFullYear()} Djibouti Explorer. {t.rights}
          </p>
          <div className="flex gap-5 text-xs">
            <Link href={`/${locale}/privacy`} className="text-cream/30 hover:text-ochre transition-colors">
              {locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
            </Link>
            <Link href={`/${locale}/terms`} className="text-cream/30 hover:text-ochre transition-colors">
              {locale === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}