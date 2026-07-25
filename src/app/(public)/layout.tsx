import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function PublicLayout({ children, params }: Props) {
  // Await the params
  const { locale } = await params;
  
  // Ensure locale is valid
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header locale={validLocale as 'en' | 'fr'} />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer locale={validLocale as 'en' | 'fr'} />
    </div>
  );
}