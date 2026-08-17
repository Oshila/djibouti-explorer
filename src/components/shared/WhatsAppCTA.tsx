'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
}

export function WhatsAppCTA({ locale }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const content = {
    en: {
      button: 'Chat on WhatsApp',
      bubble: ' Need help? Message us!',
    },
    fr: {
      button: 'Discuter sur WhatsApp',
      bubble: ' Besoin d\'aide ? Écrivez-nous !',
    },
  };

  const t = content[locale];
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25377862639';
  const message = encodeURIComponent(
    locale === 'en' 
      ? 'Hi! I\'d like to learn more about tours in Djibouti.' 
      : 'Bonjour ! Je voudrais en savoir plus sur les circuits à Djibouti.'
  );

  // Hide bubble after 10 seconds or on click
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Notification Bubble */}
      {isVisible && (
        <div 
          className="bg-white rounded-2xl shadow-xl px-4 py-3 max-w-xs border border-cream animate-slide-up relative"
          onClick={handleClick}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <p className="text-sm font-medium text-nearblack">{t.bubble}</p>
          </div>
          {/* Small arrow pointing to WhatsApp button */}
          <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white rotate-45 border-r border-b border-cream" />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        onClick={handleClick}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
        <span className="font-medium hidden sm:inline">{t.button}</span>
      </a>
    </div>
  );
}