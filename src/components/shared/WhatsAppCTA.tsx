'use client';

import { Locale } from '@/types';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
}

export function WhatsAppCTA({ locale }: Props) {
  const content = {
    en: {
      button: 'Chat on WhatsApp',
    },
    fr: {
      button: 'Discuter sur WhatsApp',
    },
  };

  const t = content[locale];
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '253XXXXXXXXX';
  const message = encodeURIComponent(
    locale === 'en' 
      ? 'Hi! I\'d like to learn more about tours in Djibouti.' 
      : 'Bonjour ! Je voudrais en savoir plus sur les circuits à Djibouti.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
        <span className="font-medium hidden sm:inline">{t.button}</span>
      </a>
    </div>
  );
}