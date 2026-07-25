interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Await the params object
  const { locale } = await params;
  
  // Pass locale to children if needed
  return <>{children}</>;
}