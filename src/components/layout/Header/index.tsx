'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
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

  // Navigation items - defined INSIDE the component
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

  // Get the correct navigation based on locale
  const navItems = navigation[locale as 'en' | 'fr'] || navigation.en;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-teal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-heading text-white">Djibouti Explorer</span>
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
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '253XXXXXXXXX'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ochre text-nearblack px-4 py-2 rounded-lg text-sm font-medium hover:bg-ochre/90 transition-all"
            >
              WhatsApp
            </a>
            <div className="flex items-center gap-2">
              <Link
                href={`/${locale === 'en' ? 'fr' : 'en'}${pathname ? pathname.replace(/^\/[a-z]{2}/, '') : ''}`}
                className="text-cream/80 hover:text-white transition-colors text-sm"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-teal/95 backdrop-blur-md border-t border-white/10">
          <div className="container-custom py-4 space-y-4">
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
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '253XXXXXXXXX'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ochre text-nearblack px-4 py-3 rounded-lg text-center font-medium hover:bg-ochre/90 transition-all"
              >
                WhatsApp
              </a>
              <Link
                href={`/${locale === 'en' ? 'fr' : 'en'}${pathname ? pathname.replace(/^\/[a-z]{2}/, '') : ''}`}
                className="text-cream/80 hover:text-white transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {locale === 'en' ? 'Français' : 'English'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}