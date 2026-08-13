import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. Check images in public/images/tours/
    const imagesDir = path.join(process.cwd(), 'public/images/tours');
    let imageFiles: string[] = [];
    
    try {
      imageFiles = fs.readdirSync(imagesDir);
    } catch (error) {
      console.error('Error reading images directory:', error);
    }

    // 2. Check tours in Firebase
    const snapshot = await adminDb.collection('tours').get();
    const tours = snapshot.docs.map(doc => ({
      id: doc.id,
      slug: doc.data().slug?.en || 'No slug',
      title: doc.data().title?.en || 'Untitled',
      images: doc.data().images || null,
    }));

    // 3. Check which tours have images
    const toursWithImages = tours.filter(t => t.images && t.images.primary);
    const toursWithoutImages = tours.filter(t => !t.images || !t.images.primary);

    // 4. Find image files that match tour slugs
    const slugToImage: Record<string, string[]> = {};
    tours.forEach(tour => {
      if (tour.slug) {
        const matchingFiles = imageFiles.filter(file => 
          file.startsWith(tour.slug) || 
          file.includes(tour.slug.replace(/-/g, ''))
        );
        if (matchingFiles.length > 0) {
          slugToImage[tour.slug] = matchingFiles;
        }
      }
    });

    return NextResponse.json({
      success: true,
      images: {
        total: imageFiles.length,
        files: imageFiles,
        directory: imagesDir,
      },
      tours: {
        total: tours.length,
        list: tours,
      },
      stats: {
        withImages: toursWithImages.length,
        withoutImages: toursWithoutImages.length,
        toursWithoutImages: toursWithoutImages.map(t => ({ slug: t.slug, title: t.title })),
      },
      slugToImage,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}