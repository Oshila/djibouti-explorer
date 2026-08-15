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

// ⭐ Convert Firestore Timestamps to plain objects
function convertTimestamps(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  // Handle Firestore Timestamp (has toDate method)
  if (typeof obj === 'object' && obj.toDate && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }
  
  // Handle Arrays
  if (Array.isArray(obj)) {
    return obj.map(item => convertTimestamps(item));
  }
  
  // Handle Objects
  if (typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      result[key] = convertTimestamps(obj[key]);
    }
    return result;
  }
  
  return obj;
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
        const data = doc.data();
        // ⭐ Convert timestamps and return plain object
        return { 
          id: doc.id, 
          ...convertTimestamps(data) 
        };
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
        const data = doc.data();
        // ⭐ Convert timestamps and return plain object
        return { 
          id: doc.id, 
          ...convertTimestamps(data) 
        };
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