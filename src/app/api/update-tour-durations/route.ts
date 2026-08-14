// File: src/app/api/update-tour-durations/route.ts

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    // Map each tour slug to its correct duration format
    const tourDurationMap: Record<string, { duration: number; nights: number }> = {
      // 1 Day Tours (Day trips)
      'moucha-maskali-islands': { duration: 1, nights: 0 },
      'seven-brothers-islands-expedition': { duration: 1, nights: 0 },
      'dittilou-mountain-day-trip': { duration: 1, nights: 0 },
      
      // 2 Days - 1 Night
      'lake-abbe-lake-assal-expedition': { duration: 2, nights: 1 },
      
      // 3 Days - 2 Nights
      'djalelo-lac-abbe-adventure': { duration: 3, nights: 2 },
      'tadjourah-sable-blanc-day-forest': { duration: 3, nights: 2 },
      
      // 4 Days - 3 Nights
      'djibouti-lac-abbe-lac-assal-tour': { duration: 4, nights: 3 },
      
      // 5 Days - 4 Nights
      'djibouti-animals-tour': { duration: 5, nights: 4 },
      
      // 6 Days - 5 Nights
      'allols-discovery-tour': { duration: 6, nights: 5 },
      
      // 7 Days - 6 Nights
      'beach-mountain-tour': { duration: 7, nights: 6 },
      
      // 12 Days - 11 Nights
      'sea-mountain-hiking-grand-tour': { duration: 12, nights: 11 },
    };

    const snapshot = await adminDb.collection('tours').get();
    let updatedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const slug = data.slug?.en;
      
      if (slug && tourDurationMap[slug]) {
        const { duration, nights } = tourDurationMap[slug];
        
        // Build short description based on duration
        let shortDescEN = '';
        let shortDescFR = '';

        if (duration === 1) {
          // 1 Day - simple format
          shortDescEN = 'Duration: 1 Day. A full-day adventure exploring the best of Djibouti.';
          shortDescFR = 'Durée: 1 Jour. Une aventure d\'une journée complète explorant le meilleur de Djibouti.';
        } else {
          // 2+ Days - X Days / Y Nights format
          shortDescEN = `Duration: ${duration} Days / ${nights} Nights. A ${duration}-day package exploring the best of Djibouti.`;
          shortDescFR = `Durée: ${duration} Jours / ${nights} Nuits. Un circuit de ${duration} jours avec ${nights} nuits explorant le meilleur de Djibouti.`;
        }
        
        // Update the tour
        await adminDb.collection('tours').doc(doc.id).update({
          duration: duration,
          shortDescription: {
            en: shortDescEN,
            fr: shortDescFR,
          },
          updatedAt: new Date().toISOString(),
        });
        updatedCount++;
        console.log(`✅ Updated: ${slug} → ${duration} Days / ${nights} Nights`);
      } else {
        console.log(`⚠️ No duration mapping for: ${slug}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} tours with correct duration formats!`,
      updatedCount,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}