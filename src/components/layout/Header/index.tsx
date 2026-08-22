'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon, 
  GlobeAltIcon,
  ChevronDownIcon,
  HomeIcon,
  MapPinIcon,
  TruckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainNav = {
    en: [
      { name: 'Home', href: `/${locale}`, icon: HomeIcon },
      { name: 'Tours', href: `/${locale}/tours`, icon: MapPinIcon },
      { name: 'Destinations', href: `/${locale}/destinations`, icon: MapPinIcon },
    ],
    fr: [
      { name: 'Accueil', href: `/${locale}`, icon: HomeIcon },
      { name: 'Circuits', href: `/${locale}/tours`, icon: MapPinIcon },
      { name: 'Destinations', href: `/${locale}/destinations`, icon: MapPinIcon },
    ],
  };

  const servicesNav = {
    en: [
      { name: 'Car Rental', href: `/${locale}/cars`, icon: TruckIcon, desc: 'Rent a vehicle with driver' },
      { name: 'Visa Invitation', href: `/${locale}/visa`, icon: DocumentTextIcon, desc: 'Get your visa letter' },
    ],
    fr: [
      { name: 'Location Voiture', href: `/${locale}/cars`, icon: TruckIcon, desc: 'Louez un véhicule avec chauffeur' },
      { name: 'Invitation Visa', href: `/${locale}/visa`, icon: DocumentTextIcon, desc: 'Obtenez votre lettre de visa' },
    ],
  };

  const otherNav = {
    en: [
      { name: 'About', href: `/${locale}/about`, icon: InformationCircleIcon },
      { name: 'Blog', href: `/${locale}/blog`, icon: AcademicCapIcon },
      { name: 'Contact', href: `/${locale}/contact`, icon: EnvelopeIcon },
    ],
    fr: [
      { name: 'À Propos', href: `/${locale}/about`, icon: InformationCircleIcon },
      { name: 'Blog', href: `/${locale}/blog`, icon: AcademicCapIcon },
      { name: 'Contact', href: `/${locale}/contact`, icon: EnvelopeIcon },
    ],
  };

  const mainItems = mainNav[locale as 'en' | 'fr'] || mainNav.en;
  const servicesItems = servicesNav[locale as 'en' | 'fr'] || servicesNav.en;
  const otherItems = otherNav[locale as 'en' | 'fr'] || otherNav.en;

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href) || false;
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    const segments = pathname?.split('/').filter(Boolean) || [];
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
    router.push(newPath);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-teal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 flex-shrink-0 group">
            <div className="p-1 rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-removebg-preview.png"
                alt="Djibouti Explorer"
                width={80}
                height={45}
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-heading text-white tracking-wide leading-tight">
                Djibouti Explorer
              </span>
              <span className="block text-[10px] text-cream/50 tracking-wider uppercase">
                Travel • Explore • Discover
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Main Links */}
            {mainItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white'
                      : 'text-cream/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  servicesItems.some(item => isActive(item.href))
                    ? 'bg-white/20 text-white'
                    : 'text-cream/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{locale === 'en' ? 'Services' : 'Services'}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-cream/50 py-2 z-50"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {servicesItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-cream/30 transition-colors ${
                          isActive(item.href) ? 'bg-cream/30' : ''
                        }`}
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-teal" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-teal">{item.name}</div>
                          <div className="text-xs text-nearblack/50">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Links */}
            {otherItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white'
                      : 'text-cream/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/25377862639`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ochre hover:bg-ochre/90 text-nearblack px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40"
              aria-label="Switch language"
            >
              <GlobeAltIcon className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                {locale === 'en' ? 'EN' : 'FR'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-teal/95 backdrop-blur-md border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container-custom py-4 space-y-6">
            {/* Main Links */}
            <div className="space-y-1">
              <p className="text-xs text-cream/40 uppercase tracking-wider font-medium px-2">
                {locale === 'en' ? 'Navigation' : 'Navigation'}
              </p>
              {mainItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'text-cream/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Services */}
            <div className="space-y-1">
              <p className="text-xs text-cream/40 uppercase tracking-wider font-medium px-2">
                {locale === 'en' ? 'Services' : 'Services'}
              </p>
              {servicesItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'text-cream/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-cream/50">{item.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Other Links */}
            <div className="space-y-1">
              <p className="text-xs text-cream/40 uppercase tracking-wider font-medium px-2">
                {locale === 'en' ? 'More' : 'Plus'}
              </p>
              {otherItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'text-cream/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href={`https://wa.me/25377862639`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-ochre text-nearblack px-4 py-3 rounded-lg text-center font-medium hover:bg-ochre/90 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>

              {/* Mobile Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full text-cream/80 hover:text-white transition-colors py-3 border border-white/20 rounded-lg hover:bg-white/10"
              >
                <GlobeAltIcon className="w-5 h-5" />
                <span>{locale === 'en' ? 'Switch to Français' : 'Switch to English'}</span>
                <span className="text-xs text-cream/50">
                  {locale === 'en' ? '🇫🇷' : '🇬🇧'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}