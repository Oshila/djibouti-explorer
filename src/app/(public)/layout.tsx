import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header locale="en" />

      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>

      <Footer locale="en" />
    </div>
  );
}