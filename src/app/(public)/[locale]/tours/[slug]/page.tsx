import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, limit, DocumentData } from 'firebase/firestore';
import TourDetail from '@/components/tours/TourDetail';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

async function getTourBySlug(slug: string, locale: Locale) {
  try {
    // Try English slug first
    const q = query(
      collection(db, 'tours'),
      where('slug.en', '==', slug),
      limit(1)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      if (doc) {
        return { id: doc.id, ...doc.data() };
      }
    }
    
    // Try French slug if English not found
    const qFr = query(
      collection(db, 'tours'),
      where('slug.fr', '==', slug),
      limit(1)
    );
    const snapshotFr = await getDocs(qFr);
    
    if (!snapshotFr.empty) {
      const doc = snapshotFr.docs[0];
      if (doc) {
        return { id: doc.id, ...doc.data() };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const tour = await getTourBySlug(slug, validLocale);
  
  if (!tour) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-2xl font-heading text-teal mb-4">Tour Not Found</h1>
        <p className="text-nearblack/70">The tour you're looking for doesn't exist.</p>
        <a href={`/${validLocale}/tours`} className="text-terracotta hover:text-terracotta/80 transition-colors mt-4 inline-block">
          ← Back to Tours
        </a>
      </div>
    );
  }

  return <TourDetail tour={tour} locale={validLocale} />;
}