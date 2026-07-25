import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('tours').get();
    const tours = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    return NextResponse.json({
      success: true,
      count: tours.length,
      tours: tours.slice(0, 5), // Show first 5
    });
  } catch (error: any) {
    console.error('Error checking tours:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}