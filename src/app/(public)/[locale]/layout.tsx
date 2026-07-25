import { notFound } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Await the params (required in Next.js 15+)
  const { locale } = await params;
  
  // Validate locale
  if (!['en', 'fr'].includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}