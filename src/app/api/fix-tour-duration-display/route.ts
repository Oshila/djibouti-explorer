import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    let updatedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const duration = data.duration;
      
      if (duration && duration > 0) {
        // Add a displayDuration field for frontend
        let displayDuration = '';
        if (duration === 1) {
          displayDuration = '1 Day';
        } else {
          displayDuration = `${duration} Days / ${duration - 1} Nights`;
        }
        
        await adminDb.collection('tours').doc(doc.id).update({
          displayDuration: displayDuration,
          updatedAt: new Date().toISOString(),
        });
        updatedCount++;
        console.log(`✅ Updated: ${data.title?.en} → ${displayDuration}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} tours with displayDuration!`,
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