'use client';

import Link from 'next/link';
import { Locale } from '@/types';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SocialIcons } from '@/components/shared/SocialIcons';

interface Props {
  locale: Locale;
}

export function Footer({ locale }: Props) {
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
    },
  };

  const t = content[locale];

  return (
    <footer className="bg-nearblack text-cream/80">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-heading text-xl mb-4">Djibouti Explorer</h3>
            <p className="text-cream/60 text-sm leading-relaxed">{t.company}</p>
            <div className="mt-4">
              <h5 className="text-white text-sm font-medium mb-2">{t.follow}</h5>
              <SocialIcons locale={locale} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {Object.entries(t.links).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key === 'tours' ? 'tours' : key === 'destinations' ? 'destinations' : key === 'blog' ? 'blog' : key === 'about' ? 'about' : 'contact'}`}
                    className="text-cream/60 hover:text-ochre transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">{t.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-ochre" />
                <span className="text-cream/60">{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+253 XX XX XX XX'}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-ochre" />
                <span className="text-cream/60">info@djiboutiexplorer.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-ochre mt-1" />
                <span className="text-cream/60">Djibouti City, Djibouti</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-medium mb-4">
              {locale === 'en' ? 'Plan Your Adventure' : 'Planifiez Votre Aventure'}
            </h4>
            <p className="text-cream/60 text-sm mb-4">
              {locale === 'en' 
                ? 'Ready to explore Djibouti? Contact us to start planning your journey.' 
                : 'Prêt à explorer Djibouti ? Contactez-nous pour commencer à planifier votre voyage.'}
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ochre text-nearblack px-6 py-3 rounded-lg font-medium hover:bg-ochre/90 transition-all"
            >
              {locale === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Djibouti Explorer. {t.rights}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-cream/40 hover:text-ochre transition-colors">
              {locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
            </Link>
            <Link href="/terms" className="text-cream/40 hover:text-ochre transition-colors">
              {locale === 'en' ? 'Terms of Service' : 'Conditions d\'Utilisation'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}