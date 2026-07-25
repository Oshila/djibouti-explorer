import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    const tours = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title?.en || 'Untitled',
      published: doc.data().published,
      featured: doc.data().featured,
      hasPublished: 'published' in doc.data()
    }));

    const publishedCount = tours.filter(t => t.published === true).length;
    const unpublishedCount = tours.filter(t => t.published !== true).length;

    return NextResponse.json({
      success: true,
      total: tours.length,
      published: publishedCount,
      unpublished: unpublishedCount,
      tours: tours.slice(0, 10) // Show first 10
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}