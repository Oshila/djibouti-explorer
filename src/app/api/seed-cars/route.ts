import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

const cars = [
  {
    id: 'toyota-landcruiser',
    name: 'Toyota Land Cruiser',
    brand: 'Toyota',
    model: 'Land Cruiser',
    year: 2023,
    category: 'luxury',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    luggage: 4,
    doors: 5,
    pricePerDay: 150,
    priceWithDriver: 200,
    image: '/images/cars/toyota-landcruiser.jpg',
    images: [],
    description: 'The legendary Land Cruiser combines luxury with unbeatable off-road performance. The ultimate vehicle for exploring Djibouti\'s diverse terrain.',
    features: [
      'V8 diesel engine',
      'Premium leather interior',
      'Advanced off-road technology',
      'Comfortable suspension for long drives',
      'Spacious cabin with 5 seats',
      'Top safety features',
      'GPS navigation system',
      'Air conditioning',
      'Bluetooth connectivity'
    ],
    availability: true,
    featured: true,
    rating: 5.0,
    reviewCount: 42,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'toyota-hilux',
    name: 'Toyota Hilux 4x4',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2023,
    category: '4x4',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    luggage: 4,
    doors: 4,
    pricePerDay: 90,
    priceWithDriver: 140,
    image: '/images/cars/toyota-hilux.jpg',
    images: [],
    description: 'The ultimate off-road vehicle for desert expeditions and challenging terrain. Perfect for Danakil Depression and remote areas.',
    features: [
      '4x4 capability',
      'Heavy duty suspension',
      'Diesel engine',
      'Off-road tires',
      'High ground clearance',
      'Roof rack',
      'All-terrain capability',
      'Durable interior',
      'Recovery points'
    ],
    availability: true,
    featured: true,
    rating: 4.9,
    reviewCount: 31,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    // Check if cars already exist
    const snapshot = await adminDb.collection('cars').limit(1).get();
    
    if (!snapshot.empty) {
      return NextResponse.json({
        success: true,
        message: 'Cars already exist in Firestore. No action needed.',
        alreadySeeded: true,
        cars: cars.map(c => c.name)
      });
    }

    // Add all cars
    let count = 0;
    for (const car of cars) {
      await adminDb.collection('cars').doc(car.id).set(car);
      count++;
    }

    return NextResponse.json({
      success: true,
      message: `✅ Successfully seeded ${count} cars to Firestore!`,
      seeded: count,
      cars: cars.map(c => c.name)
    });

  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to seed cars'
    }, { status: 500 });
  }
}