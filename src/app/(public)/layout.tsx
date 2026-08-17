import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/shared/CookieConsent';

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}