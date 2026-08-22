'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { 
  UsersIcon,
  CogIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  params: Promise<{
    locale: Locale;
  }>;
}

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  luggage: number;
  pricePerDay: number;
  priceWithDriver: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  featured: boolean;
  availability: boolean;
  rating?: number;
  reviewCount?: number;
}

// Fallback car data for when Firestore is empty
const fallbackCars: Omit<Car, 'id'>[] = [
  {
    name: 'Mazda CX-5 SUV',
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    category: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    luggage: 3,
    pricePerDay: 60,
    priceWithDriver: 100,
    image: '/images/cars/mazda-cx5.jpg',
    images: [],
    description: 'The perfect SUV for exploring Djibouti in comfort and style. Ideal for both city driving and light off-road adventures.',
    features: ['All-wheel drive', 'High ground clearance', 'Fuel efficient', 'Spacious interior', 'Premium leather seats', 'Advanced safety features'],
    featured: true,
    availability: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    name: 'Toyota Hilux 4x4',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2023,
    category: '4x4',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    luggage: 4,
    pricePerDay: 90,
    priceWithDriver: 140,
    image: '/images/cars/toyota-hilux.jpg',
    images: [],
    description: 'The ultimate off-road vehicle for desert expeditions and challenging terrain. Perfect for Danakil Depression and remote areas.',
    features: ['4x4 capability', 'Heavy duty suspension', 'Diesel engine', 'Off-road tires', 'High clearance', 'Roof rack'],
    featured: true,
    availability: true,
    rating: 4.9,
    reviewCount: 31,
  },
  {
    name: 'Toyota Prado',
    brand: 'Toyota',
    model: 'Prado',
    year: 2023,
    category: 'luxury',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 7,
    luggage: 4,
    pricePerDay: 120,
    priceWithDriver: 170,
    image: '/images/cars/toyota-prado.jpg',
    images: [],
    description: 'Luxury SUV with exceptional off-road capability. Perfect for family trips and demanding terrain.',
    features: ['7 seats', 'Luxury interior', 'Powerful diesel', 'Off-road capable', 'Premium sound system', 'Leather seats'],
    featured: true,
    availability: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    name: 'Toyota Land Cruiser',
    brand: 'Toyota',
    model: 'Land Cruiser',
    year: 2023,
    category: 'luxury',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    luggage: 4,
    pricePerDay: 150,
    priceWithDriver: 200,
    image: '/images/cars/toyota-landcruiser.jpg',
    images: [],
    description: 'The legendary Land Cruiser combines luxury with unbeatable off-road performance. The ultimate vehicle for Djibouti.',
    features: ['V8 diesel engine', 'Premium interior', 'Advanced off-road tech', 'Comfortable suspension', 'Spacious', 'Top safety'],
    featured: true,
    availability: true,
    rating: 5.0,
    reviewCount: 42,
  },
  {
    name: 'Suzuki Jimny',
    brand: 'Suzuki',
    model: 'Jimny',
    year: 2023,
    category: '4x4',
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 4,
    luggage: 1,
    pricePerDay: 45,
    priceWithDriver: 85,
    image: '/images/cars/suzuki-jimny.jpg',
    images: [],
    description: 'Compact and capable 4x4. Perfect for solo travelers and couples wanting to explore off the beaten path.',
    features: ['Compact size', '4x4 capability', 'Fun to drive', 'Economical', 'Easy to park', 'Adventure ready'],
    featured: false,
    availability: true,
    rating: 4.6,
    reviewCount: 15,
  },
  {
    name: 'Toyota Corolla Sedan',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2023,
    category: 'standard',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    luggage: 2,
    pricePerDay: 40,
    priceWithDriver: 80,
    image: '/images/cars/toyota-corolla.jpg',
    images: [],
    description: 'Reliable and comfortable sedan for city driving and business travel. Economical and easy to drive.',
    features: ['Fuel efficient', 'Comfortable', 'Reliable', 'Air conditioning', 'Bluetooth', 'USB ports'],
    featured: false,
    availability: true,
    rating: 4.5,
    reviewCount: 12,
  },
  {
    name: 'Kia Sportage SUV',
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    category: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    luggage: 3,
    pricePerDay: 55,
    priceWithDriver: 95,
    image: '/images/cars/kia-sportage.jpg',
    images: [],
    description: 'Modern SUV with stylish design and practical features. Great balance of comfort and capability.',
    features: ['Stylish design', 'Comfortable ride', 'Modern tech', 'Spacious interior', 'Safety features', 'Fuel efficient'],
    featured: false,
    availability: true,
    rating: 4.4,
    reviewCount: 9,
  },
  {
    name: 'Mercedes-Benz G-Class',
    brand: 'Mercedes-Benz',
    model: 'G-Class',
    year: 2023,
    category: 'luxury',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    luggage: 3,
    pricePerDay: 250,
    priceWithDriver: 300,
    image: '/images/cars/mercedes-gclass.jpg',
    images: [],
    description: 'The iconic G-Class combines ultimate luxury with exceptional off-road capability. The pinnacle of automotive excellence.',
    features: ['Iconic design', 'Luxury interior', 'V8 diesel', 'Off-road capable', 'Premium sound', 'Top safety'],
    featured: true,
    availability: true,
    rating: 5.0,
    reviewCount: 8,
  },
];

export default function CarsPage({ params }: Props) {
  const { locale } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const isEn = validLocale === 'en';

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const q = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Car[];
          setCars(data);
        } else {
          // Use fallback data
          const fallbackWithIds = fallbackCars.map((car, index) => ({
            ...car,
            id: `car-${index + 1}`,
          }));
          setCars(fallbackWithIds);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        // Use fallback data on error
        const fallbackWithIds = fallbackCars.map((car, index) => ({
          ...car,
          id: `car-${index + 1}`,
        }));
        setCars(fallbackWithIds);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const categories = [
    { id: 'all', label: isEn ? 'All Vehicles' : 'Tous les Véhicules' },
    { id: 'standard', label: isEn ? 'Standard' : 'Standard' },
    { id: 'suv', label: isEn ? 'SUV' : 'SUV' },
    { id: '4x4', label: isEn ? '4x4' : '4x4' },
    { id: 'luxury', label: isEn ? 'Luxury' : 'Luxe' },
  ];

  const filteredCars = cars.filter(car => {
    if (selectedCategory !== 'all' && car.category !== selectedCategory) return false;
    if (car.pricePerDay < priceRange[0] || car.pricePerDay > priceRange[1]) return false;
    return true;
  });

  const content = {
    en: {
      title: 'Car Rental in Djibouti',
      subtitle: 'Explore Djibouti with our premium fleet of vehicles',
      bookNow: 'Book Now',
      learnMore: 'Learn More',
      perDay: 'per day',
      withDriver: 'with driver',
      withoutDriver: 'without driver',
      seats: 'seats',
      luggage: 'luggage',
      transmission: 'transmission',
      fuel: 'fuel',
      noCars: 'No vehicles available',
      filterBy: 'Filter by',
      priceRange: 'Price Range',
      featured: 'Featured',
      category: 'Category',
    },
    fr: {
      title: 'Location de Voitures à Djibouti',
      subtitle: 'Explorez Djibouti avec notre flotte de véhicules premium',
      bookNow: 'Réserver',
      learnMore: 'En Savoir Plus',
      perDay: 'par jour',
      withDriver: 'avec chauffeur',
      withoutDriver: 'sans chauffeur',
      seats: 'places',
      luggage: 'bagages',
      transmission: 'transmission',
      fuel: 'carburant',
      noCars: 'Aucun véhicule disponible',
      filterBy: 'Filtrer par',
      priceRange: 'Prix',
      featured: 'Vedette',
      category: 'Catégorie',
    },
  };

  const t = content[validLocale] || content.en;

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">{isEn ? 'Loading vehicles...' : 'Chargement des véhicules...'}</p>
        </div>
      </div>
    );
  }

  const CarCard = ({ car }: { car: Car }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-cream hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-teal/5 to-terracotta/5">
        {car.image ? (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder-car.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🚗
          </div>
        )}
        {car.featured && (
          <span className="absolute top-3 left-3 bg-ochre text-nearblack text-xs font-medium px-3 py-1 rounded-full">
            ⭐ {t.featured}
          </span>
        )}
        {car.rating && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-teal text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <StarSolidIcon className="w-3.5 h-3.5 text-amber-400" />
            {car.rating} ({car.reviewCount})
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-heading text-teal mb-1">{car.name}</h3>
        <p className="text-sm text-nearblack/60 mb-3 line-clamp-2">{car.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-nearblack/50">
          <div className="flex items-center gap-1">
            <UsersIcon className="w-3.5 h-3.5" />
            <span>{car.seats} {t.seats}</span>
          </div>
          <div className="flex items-center gap-1">
            <CogIcon className="w-3.5 h-3.5" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <BeakerIcon className="w-3.5 h-3.5" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-cream pt-3 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-teal">${car.pricePerDay}</span>
              <span className="text-xs text-nearblack/40"> / {t.perDay}</span>
            </div>
            <span className="text-xs text-nearblack/40">
              {t.withoutDriver}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-nearblack/60">
              {isEn ? 'With driver:' : 'Avec chauffeur:'}
            </span>
            <span className="font-medium text-olive">${car.priceWithDriver} / {t.perDay}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/${validLocale}/cars/${car.id}`}
            className="flex-1 bg-teal/10 text-teal hover:bg-teal/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
          >
            {t.learnMore}
          </Link>
          <Link
            href={`/${validLocale}/booking/car/${car.id}`}
            className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
          >
            {t.bookNow}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading text-teal mb-4">{t.title}</h1>
          <p className="text-lg text-nearblack/70 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Filters - Mobile Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-between"
        >
          <span className="font-medium text-teal">{t.filterBy}</span>
          {showFilters ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>

        {/* Filters */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'} mb-8`}>
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-teal text-white'
                      : 'bg-cream hover:bg-cream/70 text-nearblack/70'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-nearblack/50">{t.priceRange}:</span>
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-32 accent-teal"
              />
              <span className="text-sm font-medium text-teal">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Car Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-nearblack/60">{t.noCars}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}