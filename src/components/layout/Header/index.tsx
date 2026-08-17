'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Header() {  // ⭐ DEFAULT export, no props
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const navigation = {
    en: [
      { name: 'Tours', href: `/${locale}/tours` },
      { name: 'Destinations', href: `/${locale}/destinations` },
      { name: 'Blog', href: `/${locale}/blog` },
      { name: 'About', href: `/${locale}/about` },
      { name: 'Contact', href: `/${locale}/contact` },
    ],
    fr: [
      { name: 'Circuits', href: `/${locale}/tours` },
      { name: 'Destinations', href: `/${locale}/destinations` },
      { name: 'Blog', href: `/${locale}/blog` },
      { name: 'À Propos', href: `/${locale}/about` },
      { name: 'Contact', href: `/${locale}/contact` },
    ],
  };

  const navItems = navigation[locale as 'en' | 'fr'] || navigation.en;

  // Simple toggle - just switch between en and fr
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
          <Link href={`/${locale}`} className="flex items-center gap-3 flex-shrink-0">
            <div className="p-1 rounded-lg" style={{ backgroundColor: 'transparent', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src="/images/logo-removebg-preview.png"
                alt="Djibouti Explorer"
                width={80}
                height={45}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-heading text-white tracking-wide hidden sm:block">
              Djibouti Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-cream/80 hover:text-white transition-colors text-sm font-medium ${
                  pathname === item.href ? 'text-white' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/25377862639`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ochre text-nearblack px-4 py-2 rounded-lg text-sm font-medium hover:bg-ochre/90 transition-all"
            >
              WhatsApp
            </a>
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40"
              aria-label="Switch language"
            >
              <GlobeAltIcon className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">
                {locale === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
              </span>
              <span className="text-xs text-white/50">
                {locale === 'en' ? '→ FR' : '→ EN'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-black'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-teal/95 backdrop-blur-md border-t border-white/10">
          <div className="container-custom py-4">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-cream/80 hover:text-white transition-colors py-2 ${
                    pathname === item.href ? 'text-white' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
              <a
                href={`https://wa.me/25377862639`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-ochre text-nearblack px-4 py-3 rounded-lg text-center font-medium hover:bg-ochre/90 transition-all"
              >
                WhatsApp
              </a>
              
              {/* Mobile Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-cream/80 hover:text-white transition-colors text-center py-3 border border-white/20 rounded-lg hover:bg-white/10"
              >
                <div className="flex items-center justify-center gap-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  <span>{locale === 'en' ? 'Switch to Français' : 'Switch to English'}</span>
                  <span className="text-xs text-cream/50">
                    {locale === 'en' ? '🇫🇷' : '🇬🇧'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}