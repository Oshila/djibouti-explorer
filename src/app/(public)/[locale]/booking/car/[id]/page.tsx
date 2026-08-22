'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, addDoc, collection, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  CalendarIcon, 
  UserIcon, 
  CreditCardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UsersIcon,
  CogIcon,
  BeakerIcon
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
  pricePerDay: number;
  priceWithDriver: number;
  image: string;
  description: string;
  availability: boolean;
}

async function getCarById(id: string) {
  try {
    const docRef = doc(db, 'cars', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Car;
    }
    return null;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

export default function CarBookingPage({ params }: Props) {
  const { locale, id } = use(params);
  const router = useRouter();
  const validLocale: 'en' | 'fr' = (locale === 'en' || locale === 'fr') ? locale : 'en';
  const isEn = validLocale === 'en';

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  useEffect(() => {
    async function fetchCar() {
      const carData = await getCarById(id);
      if (carData) {
        setCar(carData);
      } else {
        toast.error('Car not found');
        router.push(`/${validLocale}/cars`);
      }
      setLoading(false);
    }
    fetchCar();
  }, [id, router, validLocale]);

  const totalDays = formData.pickupDate && formData.returnDate 
    ? Math.max(1, Math.ceil((new Date(formData.returnDate).getTime() - new Date(formData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  const totalPrice = car ? car.priceWithDriver * totalDays : 0;

  const steps = [
    { id: 1, label: isEn ? 'Date & Details' : 'Date & Details', icon: CalendarIcon },
    { id: 2, label: isEn ? 'Your Details' : 'Your Details', icon: UserIcon },
    { id: 3, label: isEn ? 'Review & Pay' : 'Review & Pay', icon: CreditCardIcon },
  ];

  const content = {
    en: {
      title: 'Book Your Rental Car',
      subtitle: 'Secure your vehicle for your Djibouti adventure',
      car: 'Vehicle',
      pickupDate: 'Pickup Date',
      returnDate: 'Return Date',
      days: 'days',
      total: 'Total',
      perDay: 'per day',
      withDriver: 'with driver',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      specialRequests: 'Special Requests (Optional)',
      submit: 'Book Now',
      back: 'Back',
      next: 'Continue',
      review: 'Review Your Booking',
      driverNote: 'All rentals include a professional driver',
      step: 'Step',
      of: 'of',
      paymentNote: 'You will be redirected to Stripe to complete your payment securely.',
      whatsapp: 'Chat on WhatsApp',
      home: 'Return Home',
    },
    fr: {
      title: 'Reserve Your Rental Car',
      subtitle: 'Secure your vehicle for your Djibouti adventure',
      car: 'Vehicle',
      pickupDate: 'Pickup Date',
      returnDate: 'Return Date',
      days: 'days',
      total: 'Total',
      perDay: 'per day',
      withDriver: 'with driver',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      specialRequests: 'Special Requests (Optional)',
      submit: 'Book Now',
      back: 'Back',
      next: 'Continue',
      review: 'Review Your Booking',
      driverNote: 'All rentals include a professional driver',
      step: 'Step',
      of: 'of',
      paymentNote: 'You will be redirected to Stripe to complete your payment securely.',
      whatsapp: 'Chat on WhatsApp',
      home: 'Return Home',
    },
  };

  const t = content[validLocale] || content.en;

  const validateStep = () => {
    if (currentStep === 1) {
      return formData.pickupDate && formData.returnDate;
    }
    if (currentStep === 2) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Save booking to Firestore
      const bookingRef = await addDoc(collection(db, 'carBookings'), {
        carId: car?.id,
        carName: car?.name,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        totalDays: totalDays,
        totalPrice: totalPrice,
        currency: 'USD',
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        specialRequests: formData.specialRequests || '',
        bookingStatus: 'pending',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
      });

      // Generate reference
      const reference = `CAR-${Date.now().toString().slice(-8)}`;
      await updateDoc(doc(db, 'carBookings', bookingRef.id), {
        bookingReference: reference,
      });

      // Redirect to Stripe checkout
      const checkoutUrl = `/${validLocale}/checkout?type=car&id=${bookingRef.id}&name=${encodeURIComponent(car?.name || 'Car Rental')}&price=${totalPrice}`;
      router.push(checkoutUrl);

    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60 font-medium">Loading vehicle...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-white p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-cream">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-heading text-teal mb-2">Car Not Found</h1>
          <p className="text-nearblack/60 mb-6">The vehicle you are looking for does not exist.</p>
          <Link href={`/${validLocale}/cars`} className="inline-block bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-xl font-medium transition">
            ← {isEn ? 'Back to Cars' : 'Retour aux Voitures'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream/50 py-8 md:py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-terracotta font-medium text-sm uppercase tracking-wider bg-terracotta/10 px-4 py-1.5 rounded-full mb-3">
            {t.step} {currentStep} {t.of} 3
          </span>
          <h1 className="text-2xl md:text-3xl font-heading text-teal">{t.title}</h1>
          <p className="text-nearblack/60 mt-1">{car.name}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-cream/50">
          <div className="flex items-center justify-between relative">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = currentStep === s.id;
              const isCompleted = currentStep > s.id;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'bg-gradient-to-r from-teal to-teal/80 text-white shadow-lg shadow-teal/30 scale-110' :
                      isCompleted ? 'bg-olive text-white' :
                      'bg-cream text-nearblack/30'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium hidden sm:block ${
                      isActive ? 'text-teal' : isCompleted ? 'text-olive' : 'text-nearblack/40'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 md:mx-4 transition-all duration-500 ${
                      isCompleted ? 'bg-olive' : 'bg-cream'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream/50">
          {/* Car Summary Bar */}
          <div className="bg-gradient-to-r from-teal/5 to-terracotta/5 p-4 md:p-6 border-b border-cream">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm text-nearblack/50">{car.name}</div>
                <div className="flex items-center gap-4 mt-1 text-sm text-nearblack/60">
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CogIcon className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BeakerIcon className="w-4 h-4" />
                    <span>{car.fuelType}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal">${car.priceWithDriver}</div>
                <div className="text-xs text-nearblack/40">{t.perDay} {t.withDriver}</div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6 md:p-8">
            {/* Step 1: Date & Details */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-heading text-teal mb-6">{steps[0]?.label}</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-2">
                        {t.pickupDate} <span className="text-terracotta">*</span>
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-teal/40 w-5 h-5" />
                        <input
                          type="date"
                          value={formData.pickupDate}
                          onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-2">
                        {t.returnDate} <span className="text-terracotta">*</span>
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-teal/40 w-5 h-5" />
                        <input
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                          min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Driver Note */}
                  <div className="bg-olive/5 rounded-xl p-4 border border-olive/20">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-olive" />
                      <div>
                        <p className="text-sm font-medium text-olive">{t.driverNote}</p>
                        <p className="text-xs text-nearblack/50">
                          {isEn 
                            ? 'All rentals include a professional driver for your safety and convenience.' 
                            : 'All rentals include a professional driver for your safety and convenience.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.pickupDate && formData.returnDate && (
                    <div className="bg-teal/5 rounded-xl p-4 border border-teal/10">
                      <p className="text-sm text-nearblack/70">
                        {totalDays} {t.days} x ${car.priceWithDriver} = <span className="font-bold text-teal">${totalPrice}</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!validateStep()}
                    className={`px-8 py-3.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                      validateStep()
                        ? 'bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal/70 text-white hover:shadow-lg hover:scale-[1.02] active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {t.next} <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Your Details */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-heading text-teal mb-6">{steps[1]?.label}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
                        {t.firstName} <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
                        {t.lastName} <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
                      {t.email} <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
                      {t.phone} <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                      placeholder="+253 77 86 26 39"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
                      {t.specialRequests}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30 resize-none"
                      placeholder={isEn ? 'Baby seat, extra luggage, etc.' : 'Baby seat, extra luggage, etc.'}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-cream text-nearblack/60 px-6 py-3.5 rounded-xl font-medium hover:bg-cream transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeftIcon className="w-5 h-5" /> {t.back}
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!validateStep()}
                    className={`flex-1 px-8 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      validateStep()
                        ? 'bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal/70 text-white hover:shadow-lg hover:scale-[1.02] active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {t.next} <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Pay */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-heading text-teal mb-6">{t.review}</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-teal/5 to-cream rounded-2xl p-5 border border-teal/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-nearblack/50">{t.car}</div>
                        <div className="font-medium text-teal">{car.name}</div>
                        <div className="text-xs text-nearblack/40">{car.brand} {car.model} ({car.year})</div>
                      </div>
                      <div>
                        <div className="text-nearblack/50">{t.pickupDate}</div>
                        <div className="font-medium text-teal">{formData.pickupDate}</div>
                      </div>
                      <div>
                        <div className="text-nearblack/50">{t.returnDate}</div>
                        <div className="font-medium text-teal">{formData.returnDate}</div>
                      </div>
                      <div>
                        <div className="text-nearblack/50">{t.days}</div>
                        <div className="font-medium text-teal">{totalDays}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-nearblack/50">{t.total}</div>
                        <div className="font-bold text-2xl text-teal">${totalPrice}</div>
                        <div className="text-xs text-nearblack/40">${car.priceWithDriver} {t.perDay} {t.withDriver}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cream/30 rounded-2xl p-5 border border-cream">
                    <p className="font-medium text-teal">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-nearblack/60">{formData.email}</p>
                    <p className="text-sm text-nearblack/60">{formData.phone}</p>
                    {formData.specialRequests && (
                      <p className="text-sm text-nearblack/60 mt-2 border-t border-cream pt-2">
                        <span className="text-nearblack/50">{t.specialRequests}:</span> {formData.specialRequests}
                      </p>
                    )}
                  </div>

                  <div className="bg-teal/5 rounded-xl p-4 border border-teal/20">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="w-5 h-5 text-teal" />
                      <div>
                        <p className="text-sm font-medium text-teal">{t.paymentNote}</p>
                        <p className="text-xs text-nearblack/50 mt-1">
                          {isEn 
                            ? 'You will be redirected to Stripe to complete your payment securely.' 
                            : 'You will be redirected to Stripe to complete your payment securely.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-cream text-nearblack/60 px-6 py-3.5 rounded-xl font-medium hover:bg-cream transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeftIcon className="w-5 h-5" /> {t.back}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-terracotta to-terracotta/80 hover:from-terracotta/90 hover:to-terracotta/70 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {t.submit} <ArrowRightIcon className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-nearblack/40">
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-olive" />
            {isEn ? 'Secure Booking' : 'Secure Booking'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-olive" />
            {isEn ? 'Professional Driver' : 'Professional Driver'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-olive" />
            {isEn ? '24/7 Support' : '24/7 Support'}
          </span>
        </div>
      </div>
    </div>
  );
}