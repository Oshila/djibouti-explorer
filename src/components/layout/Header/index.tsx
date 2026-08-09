'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Locale } from '@/types';

interface Props {
  locale: Locale;
}

export function Header({ locale }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  // Build the path for the other language
  const getOtherLanguagePath = () => {
    if (!pathname) return `/${locale === 'en' ? 'fr' : 'en'}`;
    
    const segments = pathname.split('/');
    const currentLocale = segments[1];
    
    if (currentLocale === 'en' || currentLocale === 'fr') {
      const newLocale = currentLocale === 'en' ? 'fr' : 'en';
      const restOfPath = segments.slice(2).join('/');
      return `/${newLocale}${restOfPath ? '/' + restOfPath : ''}`;
    }
    
    return `/${locale === 'en' ? 'fr' : 'en'}`;
  };

  const otherPath = getOtherLanguagePath();
  
  // DYNAMIC LABEL - Shows the opposite language
  const switchLabel = locale === 'en' ? 'Français' : 'English';
  const switchShort = locale === 'en' ? 'FR' : 'EN';

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
            <div 
              className="p-1 rounded-lg"
              style={{ 
                backgroundColor: 'transparent',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
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
            
            {/* Language Switcher - Desktop */}
            <Link
              href={otherPath}
              className="text-cream/80 hover:text-white transition-colors text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              <GlobeAltIcon className="w-4 h-4" />
              <span className="font-medium">{switchLabel}</span>
              <span className="text-xs text-cream/50">({switchShort})</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className={`w-6 h-6 transition-colors duration-300 text-white`} />
            ) : (
              <Bars3Icon className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-black'
              }`} />
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
              
              {/* Language Switcher - Mobile */}
              <Link
                href={otherPath}
                className="block text-cream/80 hover:text-white transition-colors text-center py-3 border border-white/20 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-center gap-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  <span>{switchLabel}</span>
                  <span className="text-xs text-cream/50">({switchShort})</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}