'use client';

import { usePathname, useRouter } from 'next/navigation';

interface LanguageToggleProps {
  locale?: string;
  className?: string;
}

export default function LanguageToggle({ locale = 'en', className = '' }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    
    const segments = pathname.split('/');
    const cleanSegments = segments.filter(seg => seg !== '');
    
    const firstSegment = cleanSegments[0];
    if (firstSegment && ['en', 'fr'].includes(firstSegment)) {
      cleanSegments[0] = newLocale;
    } else {
      cleanSegments.unshift(newLocale);
    }

    router.push('/' + cleanSegments.join('/'));
  };

  const isEn = locale === 'en';

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-cream/20 hover:bg-cream/30 transition-all duration-200 border border-cream/20 hover:border-cream/40 ${className}`}
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">
        {isEn ? '🇬🇧 EN' : '🇫🇷 FR'}
      </span>
      <div className="relative w-10 h-5 bg-teal/30 rounded-full transition-colors duration-300">
        <div
          className={`absolute top-0.5 w-4 h-4 bg-teal rounded-full transition-all duration-300 ${
            isEn ? 'left-0.5' : 'left-5.5'
          }`}
        />
      </div>
    </button>
  );
} 