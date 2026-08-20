'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  HeartIcon,
  PlayIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

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
      links: {
        tours: 'Tours',
        destinations: 'Destinations',
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
      links: {
        tours: 'Circuits',
        destinations: 'Destinations',
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
      blog: 'blog',
      about: 'about',
      contact: 'contact',
    };
    return `/${locale}/${slugMap[key] || key}`;
  };

  return (
    <footer className="relative bg-nearblack text-cream/80 overflow-hidden">
      {/* ⭐ BLACK TOP - Solid nearblack background */}
      <div className="absolute inset-0 bg-nearblack" />

      {/* ⭐ GRADIENT OVERLAY - Only on bottom portion */}
      <div className="absolute inset-0 bg-gradient-to-b from-nearblack via-teal/5 to-terracotta/10" />

      {/* Decorative blurs - bottom only */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-ochre/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />

      {/* Top Decorative Line */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-ochre/30 to-transparent" />

      <div className="relative container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1.5">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div
                className="p-1 rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: '#141414',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/images/logo-footer3.jpg"
                  alt="Djibouti Explorer"
                  width={95}
                  height={45}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-heading text-lg leading-tight">Djibouti Explorer</h3>
                <span className="text-[10px] text-cream/40 tracking-wider uppercase">Travel • Djibouti</span>
              </div>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed mt-4 max-w-xs">
              {t.company}
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-cream/30 hover:text-ochre transition-all duration-300 hover:scale-110 transform">
                <GlobeAltIcon className="w-4 h-4" />
              </a>
              <a href="#" className="text-cream/30 hover:text-ochre transition-all duration-300 hover:scale-110 transform">
                <HeartIcon className="w-4 h-4" />
              </a>
              <a href="#" className="text-cream/30 hover:text-ochre transition-all duration-300 hover:scale-110 transform">
                <PlayIcon className="w-4 h-4" />
              </a>
              <a href="#" className="text-cream/30 hover:text-ochre transition-all duration-300 hover:scale-110 transform">
                <ShareIcon className="w-4 h-4" />
              </a>
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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