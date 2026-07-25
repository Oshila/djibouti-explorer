import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    let updatedCount = 0;
    let alreadyPublished = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // Check if published field exists and is true
      if (data.published === true) {
        alreadyPublished++;
        continue;
      }
      
      // Update to published: true
      await adminDb.collection('tours').doc(doc.id).update({
        published: true,
        updatedAt: new Date().toISOString()
      });
      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} tours to published: true. ${alreadyPublished} tours were already published.`,
      updatedCount,
      alreadyPublished,
      total: snapshot.size
    });
  } catch (error: any) {
    console.error('Error updating tours:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}