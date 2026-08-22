'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  ArrowLeftIcon,
  UsersIcon,
  CogIcon,
  CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/outline';

interface Props {
  params: Promise<{
    locale: Locale;
    id: string;
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
  doors: number;
  pricePerDay: number;
  priceWithDriver: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  availability: boolean;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
}

export default function CarDetailPage({ params }: Props) {
  const { locale, id } = use(params);
  const router = useRouter();
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const isEn = validLocale === 'en';

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  // ⭐ Driver is always true - removed the toggle
  const withDriver = true;

  useEffect(() => {
    async function fetchCar() {
      try {
        const docRef = doc(db, 'cars', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCar({ id: docSnap.id, ...docSnap.data() } as Car);
        } else {
          toast.error('Car not found');
          router.push(`/${validLocale}/cars`);
        }
      } catch (error) {
        console.error('Error fetching car:', error);
        toast.error('Failed to load car details');
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id, router, validLocale]);

  const content = {
    en: {
      back: 'Back to Cars',
      bookNow: 'Book Now',
      requestQuote: 'Request Quote',
      perDay: 'per day',
      withDriver: 'with driver',
      withoutDriver: 'without driver',
      seats: 'seats',
      luggage: 'luggage',
      transmission: 'transmission',
      fuel: 'fuel',
      category: 'category',
      features: 'Features',
      specifications: 'Specifications',
      about: 'About This Vehicle',
      availability: 'Availability',
      available: 'Available Now',
      unavailable: 'Currently Unavailable',
      pickupDate: 'Pickup Date',
      returnDate: 'Return Date',
      driverOption: 'Driver Option',
      driverNote: 'All rentals include a professional driver',
      total: 'Total',
      days: 'days',
      contact: 'Contact Us',
      rating: 'Rating',
      reviews: 'reviews',
      whatsapp: 'Chat on WhatsApp',
    },
    fr: {
      back: 'Retour aux Voitures',
      bookNow: 'Réserver',
      requestQuote: 'Demander un Devis',
      perDay: 'par jour',
      withDriver: 'avec chauffeur',
      withoutDriver: 'sans chauffeur',
      seats: 'places',
      luggage: 'bagages',
      transmission: 'transmission',
      fuel: 'carburant',
      category: 'catégorie',
      features: 'Équipements',
      specifications: 'Spécifications',
      about: 'À Propos de ce Véhicule',
      availability: 'Disponibilité',
      available: 'Disponible',
      unavailable: 'Indisponible',
      pickupDate: 'Date de Prise en Charge',
      returnDate: 'Date de Retour',
      driverOption: 'Option Chauffeur',
      driverNote: 'Toutes les locations incluent un chauffeur professionnel',
      total: 'Total',
      days: 'jours',
      contact: 'Contactez-Nous',
      rating: 'Note',
      reviews: 'avis',
      whatsapp: 'Discuter sur WhatsApp',
    },
  };

  const t = content[validLocale] || content.en;

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border border-cream">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-heading text-teal mb-2">Car Not Found</h1>
          <p className="text-nearblack/60 mb-6">The vehicle you're looking for doesn't exist.</p>
          <Link href={`/${validLocale}/cars`} className="inline-block bg-teal text-white px-6 py-3 rounded-xl font-medium transition">
            ← {t.back}
          </Link>
        </div>
      </div>
    );
  }

  const totalDays = pickupDate && returnDate 
    ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  // ⭐ Always use priceWithDriver (compulsory)
  const dailyPrice = car.priceWithDriver;
  const totalPrice = dailyPrice * totalDays;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom">
        {/* Back Button */}
        <Link
          href={`/${validLocale}/cars`}
          className="inline-flex items-center gap-2 text-nearblack/60 hover:text-teal transition-colors mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {t.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream">
              <div className="relative h-96 bg-gradient-to-br from-teal/5 to-terracotta/5">
                <img
                  src={car.image || '/images/placeholder-car.jpg'}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-car.jpg';
                  }}
                />
              </div>
              {car.images && car.images.length > 0 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {car.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                        selectedImage === index ? 'border-teal' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Rating */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading text-teal">{car.name}</h1>
                  <p className="text-sm text-nearblack/60">{car.brand} {car.model} ({car.year})</p>
                </div>
                {car.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-teal">{car.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon key={i} className={`w-4 h-4 ${i < Math.floor(car.rating!) ? 'text-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-nearblack/40">({car.reviewCount} {t.reviews})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream">
              <h2 className="text-lg font-heading text-teal mb-4">{t.about}</h2>
              <p className="text-nearblack/70 leading-relaxed whitespace-pre-line">{car.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream">
              <h2 className="text-lg font-heading text-teal mb-4">{t.features}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-nearblack/70">
                    <CheckCircleIcon className="w-4 h-4 text-olive flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream">
              <h2 className="text-lg font-heading text-teal mb-4">{t.specifications}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-nearblack/40">{t.seats}</div>
                  <div className="font-medium text-teal flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" /> {car.seats}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-nearblack/40">{t.luggage}</div>
                  <div className="font-medium text-teal">{car.luggage} bags</div>
                </div>
                <div>
                  <div className="text-xs text-nearblack/40">{t.transmission}</div>
                  <div className="font-medium text-teal capitalize">{car.transmission}</div>
                </div>
                <div>
                  <div className="text-xs text-nearblack/40">{t.fuel}</div>
                  <div className="font-medium text-teal capitalize">{car.fuelType}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-cream p-6 space-y-6">
              {/* Price */}
              <div className="text-center border-b border-cream pb-4">
                <div className="text-3xl font-bold text-teal">${car.priceWithDriver}</div>
                <div className="text-sm text-nearblack/50">{t.perDay} {t.withDriver}</div>
                <div className="text-xs text-olive mt-1">
                  ✅ {t.driverNote}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${car.availability ? 'bg-olive' : 'bg-terracotta'}`} />
                <span className={`text-sm font-medium ${car.availability ? 'text-olive' : 'text-terracotta'}`}>
                  {car.availability ? t.available : t.unavailable}
                </span>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">{t.pickupDate}</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">{t.returnDate}</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-4 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* ⭐ Driver Option - Compulsory (display only, no toggle) */}
              <div className="bg-olive/5 rounded-xl p-4 border border-olive/20">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-olive" />
                  <div>
                    <p className="text-sm font-medium text-olive">{t.driverOption}</p>
                    <p className="text-xs text-nearblack/50">{t.driverNote}</p>
                  </div>
                </div>
              </div>

              {/* Total */}
              {pickupDate && returnDate && (
                <div className="bg-cream/30 rounded-xl p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-nearblack/60">{totalDays} {t.days}</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-cream pt-2 mt-2">
                    <span className="font-medium text-teal">{t.total}</span>
                    <span className="text-xl font-bold text-teal">${totalPrice}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <button
                disabled={!car.availability || !pickupDate || !returnDate}
                className={`w-full py-3.5 rounded-xl font-medium transition-all ${
                  car.availability && pickupDate && returnDate
                    ? 'bg-terracotta hover:bg-terracotta/90 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t.bookNow}
              </button>

              <a
                href={`https://wa.me/25377862639?text=${encodeURIComponent(`Hi! I'm interested in renting the ${car.name} with driver for ${totalDays} days.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-medium transition"
              >
                💬 {t.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}