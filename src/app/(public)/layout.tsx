import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/shared/CookieConsent';

interface Props {
  children: React.ReactNode;
  // Remove params - this layout doesn't need it
}

export default function PublicLayout({ children }: Props) {
  // Default to 'en' since we can't access params here
  const validLocale = 'en';

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header locale={validLocale as 'en' | 'fr'} />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer locale={validLocale as 'en' | 'fr'} />
      <CookieConsent locale={validLocale as 'en' | 'fr'} />
    </div>
  );
}