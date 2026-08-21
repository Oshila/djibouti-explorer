'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, limit, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  UserIcon, 
  CreditCardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Props {
  params: Promise<{
    locale: Locale;
    tourSlug: string;
  }>;
}

async function getTourBySlug(slug: string) {
  try {
    const q = query(
      collection(db, 'tours'),
      where('slug.en', '==', slug),
      limit(1)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      if (doc) {
        return { id: doc.id, ...doc.data() };
      }
    }
    
    const qFr = query(
      collection(db, 'tours'),
      where('slug.fr', '==', slug),
      limit(1)
    );
    const snapshotFr = await getDocs(qFr);
    
    if (!snapshotFr.empty) {
      const doc = snapshotFr.docs[0];
      if (doc) {
        return { id: doc.id, ...doc.data() };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export default function BookingPage({ params }: Props) {
  const router = useRouter();
  const { locale, tourSlug } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    adults: 1,
    children: 0,
    infants: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  useEffect(() => {
    async function fetchTour() {
      if (!tourSlug) {
        setLoading(false);
        return;
      }
      const tourData = await getTourBySlug(tourSlug);
      setTour(tourData);
      setLoading(false);
    }
    fetchTour();
  }, [tourSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60 font-medium">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-white p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-cream">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-heading text-teal mb-2">Tour Not Found</h1>
          <p className="text-nearblack/60 mb-6">The tour you're looking for doesn't exist.</p>
          <a href={`/${validLocale}/tours`} className="inline-block bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-xl font-medium transition">
            ← Back to Tours
          </a>
        </div>
      </div>
    );
  }

  const totalGuests = formData.adults + formData.children + formData.infants;
  const totalAmount = tour?.price * totalGuests;

  const steps = [
    { id: 1, label: validLocale === 'en' ? 'Date & Guests' : 'Date & Voyageurs', icon: CalendarIcon },
    { id: 2, label: validLocale === 'en' ? 'Your Details' : 'Vos Coordonnées', icon: UserIcon },
    { id: 3, label: validLocale === 'en' ? 'Review & Pay' : 'Vérification & Paiement', icon: CreditCardIcon },
  ];

  const content = {
    en: {
      title: 'Book Your Adventure',
      subtitle: 'Secure your spot on this incredible journey',
      date: 'Select Date',
      adults: 'Adults',
      children: 'Children (4-11)',
      infants: 'Infants (0-3)',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      specialRequests: 'Special Requests (Optional)',
      submit: 'Proceed to Payment',
      back: 'Back',
      next: 'Continue',
      total: 'Total',
      currency: 'USD',
      perPerson: 'per person',
      step: 'Step',
      of: 'of',
      review: 'Review Your Booking',
      guests: 'guests',
      flex: 'Flexible',
      paymentNote: 'You will be redirected to Stripe to complete your payment securely.',
    },
    fr: {
      title: 'Réservez Votre Aventure',
      subtitle: 'Réservez votre place pour ce voyage incroyable',
      date: 'Choisir une Date',
      adults: 'Adultes',
      children: 'Enfants (4-11)',
      infants: 'Nourrissons (0-3)',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      specialRequests: 'Demandes Spéciales (Optionnel)',
      submit: 'Procéder au Paiement',
      back: 'Retour',
      next: 'Continuer',
      total: 'Total',
      currency: 'USD',
      perPerson: 'par personne',
      step: 'Étape',
      of: 'sur',
      review: 'Vérifiez Votre Réservation',
      guests: 'voyageurs',
      flex: 'Flexible',
      paymentNote: 'Vous serez redirigé vers Stripe pour compléter votre paiement en toute sécurité.',
    },
  };

  const t = content[validLocale]!;

 const handleSubmit = async () => {
  setSubmitting(true);
  try {
    console.log('📝 Creating booking with data:', {
      tourId: tour.id,
      tourName: tour.title[validLocale],
      totalAmount: totalAmount,
    });

    const bookingRef = await addDoc(collection(db, 'bookings'), {
      tourId: tour.id,
      tourName: tour.title[validLocale],
      tourSlug: tourSlug,
      date: formData.date || null,
      travellers: {
        adults: formData.adults,
        children: formData.children,
        infants: formData.infants,
      },
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      specialRequests: formData.specialRequests || '',
      totalAmount: totalAmount,
      currency: 'USD',
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      createdAt: serverTimestamp(),
    });

    console.log('✅ Booking created with ID:', bookingRef.id);

    const reference = `BK-${Date.now().toString().slice(-8)}`;
    await updateDoc(doc(db, 'bookings', bookingRef.id), {
      bookingReference: reference,
    });

    console.log('📋 Booking reference:', reference);
    console.log('🔗 Redirecting to checkout with ID:', bookingRef.id);

    const checkoutUrl = `/${validLocale}/checkout?type=tour&id=${bookingRef.id}&name=${encodeURIComponent(tour.title[validLocale])}&price=${totalAmount}`;
    
    toast.success('Booking created! Redirecting to payment...');
    router.push(checkoutUrl);

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    toast.error('Something went wrong. Please try again.');
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream/50 py-8 md:py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-terracotta font-medium text-sm uppercase tracking-wider bg-terracotta/10 px-4 py-1.5 rounded-full mb-3">
            {t.step} {currentStep} {t.of} 3
          </span>
          <h1 className="text-2xl md:text-3xl font-heading text-teal">{t.title}</h1>
          <p className="text-nearblack/60 mt-1">{tour.title[validLocale]}</p>
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
          {/* Tour Summary Bar */}
          <div className="bg-gradient-to-r from-teal/5 to-terracotta/5 p-4 md:p-6 border-b border-cream">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm text-nearblack/50">{tour.title[validLocale]}</div>
                <div className="flex items-center gap-4 mt-1 text-sm text-nearblack/60">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{tour.duration} {validLocale === 'en' ? 'day' : 'jour'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>Max {tour.maxGroupSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{tour.destinations?.[0] || 'Djibouti'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal">${tour.price}</div>
                <div className="text-xs text-nearblack/40">/ {validLocale === 'en' ? 'person' : 'personne'}</div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6 md:p-8">
            {/* Step 1: Date & Guests */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-heading text-teal mb-6">{steps[0]?.label}</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-nearblack/70 mb-2">
                      {t.date}
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-teal/40 w-5 h-5" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/30"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nearblack/70 mb-3">
                      {validLocale === 'en' ? 'Number of Travelers' : 'Nombre de Voyageurs'}
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-cream/30 rounded-xl p-4 text-center border border-cream hover:border-teal/30 transition-colors">
                        <div className="text-sm font-medium text-nearblack/70">{t.adults}</div>
                        <div className="flex items-center justify-center gap-3 mt-2">
                          <button
                            onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                            className="w-8 h-8 rounded-full border border-cream hover:bg-white transition flex items-center justify-center"
                          >
                            <span className="text-lg">−</span>
                          </button>
                          <span className="text-xl font-bold text-teal w-6 text-center">{formData.adults}</span>
                          <button
                            onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                            className="w-8 h-8 rounded-full border border-cream hover:bg-white transition flex items-center justify-center"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>
                      <div className="bg-cream/30 rounded-xl p-4 text-center border border-cream hover:border-teal/30 transition-colors">
                        <div className="text-sm font-medium text-nearblack/70">{t.children}</div>
                        <div className="flex items-center justify-center gap-3 mt-2">
                          <button
                            onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                            className="w-8 h-8 rounded-full border border-cream hover:bg-white transition flex items-center justify-center"
                          >
                            <span className="text-lg">−</span>
                          </button>
                          <span className="text-xl font-bold text-teal w-6 text-center">{formData.children}</span>
                          <button
                            onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                            className="w-8 h-8 rounded-full border border-cream hover:bg-white transition flex items-center justify-center"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>
                      <div className="bg-cream/30 rounded-xl p-4 text-center border border-cream hover:border-teal/30 transition-colors">
                        <div className="text-sm font-medium text-nearblack/70">{t.infants}</div>
                        <div className="flex items-center justify-center gap-3 mt-2">
                          <button
                            onClick={() => setFormData({ ...formData, infants: Math.max(0, formData.infants - 1) })}
                            className="w-8 h-8 rounded-full border border-cream hover:bg-white transition flex items-center justify-center"
                          >
                            <span className="text-lg">−</span>
                          </button>
                          <span className="text-xl font-bold text-teal w-6 text-center">{formData.infants}</span>
                          <button
                            onClick={() => setFormData({ ...formData, infants: formData.infants + 1 })}
                            className="w-8 h-8 rounded-full border border-cream hover:bg-white transition flex items-center justify-center"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-nearblack/50 mt-3">
                      {totalGuests} {t.guests} • <span className="font-medium text-teal">${totalAmount}</span> {t.total}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal/70 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center gap-2"
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
                        {t.firstName} *
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
                        {t.lastName} *
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
                      {t.email} *
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
                      {t.phone} *
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
                      placeholder={validLocale === 'en' ? 'Dietary requirements, mobility issues, etc.' : 'Régime alimentaire, problèmes de mobilité, etc.'}
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
                    className="flex-1 bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal/70 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
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
                        <div className="text-nearblack/50">{t.date}</div>
                        <div className="font-medium text-teal">{formData.date || t.flex}</div>
                      </div>
                      <div>
                        <div className="text-nearblack/50">{t.guests}</div>
                        <div className="font-medium text-teal">{totalGuests}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-nearblack/50">{t.total}</div>
                        <div className="font-bold text-2xl text-teal">${totalAmount}</div>
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

                  {/* Payment Note */}
                  <div className="bg-teal/5 rounded-xl p-4 border border-teal/20">
                    <div className="flex items-center gap-3">
                      <CreditCardIcon className="w-5 h-5 text-teal" />
                      <div>
                        <p className="text-sm font-medium text-teal">{t.paymentNote}</p>
                        <p className="text-xs text-nearblack/50 mt-1">
                          {validLocale === 'en' 
                            ? `You will pay the full amount of $${totalAmount} now.` 
                            : `Vous paierez le montant total de $${totalAmount} maintenant.`}
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
                        {t.submit} <CreditCardIcon className="w-5 h-5" />
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
            {validLocale === 'en' ? 'Secure Booking' : 'Réservation Sécurisée'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-olive" />
            {validLocale === 'en' ? 'Best Price Guarantee' : 'Meilleur Prix Garanti'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-olive" />
            {validLocale === 'en' ? 'Stripe Secure Payment' : 'Paiement Sécurisé Stripe'}
          </span>
        </div>
      </div>
    </div>
  );
}