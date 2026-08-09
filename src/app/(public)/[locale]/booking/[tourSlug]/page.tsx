'use client';

import { useState } from 'react';
import { use } from 'react';  // ← Import use
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';

interface Props {
  params: Promise<{  // ← Change to Promise
    locale: Locale;
    tourSlug: string;
  }>;
}

// Mock tour data - replace with actual data from Firebase
function getTourBySlug(slug: string, locale: Locale) {
  const mockTours = [
    {
      id: '1',
      title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' },
      slug: { en: 'lake-assal-discovery', fr: 'decouverte-lac-assal' },
      price: 150,
      depositAmount: 30,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 8,
    },
    {
      id: '2',
      title: { en: 'Whale Shark Adventure', fr: 'Aventure Requin-Baleine' },
      slug: { en: 'whale-shark-adventure', fr: 'aventure-requin-baleine' },
      price: 250,
      depositAmount: 50,
      currency: 'USD',
      duration: 1,
      maxGroupSize: 10,
    },
    {
      id: '3',
      title: { en: 'Lac Abbé & Ardoukoba', fr: 'Lac Abbé & Ardoukoba' },
      slug: { en: 'lac-abbe-ardoukoba', fr: 'lac-abbe-ardoukoba' },
      price: 350,
      depositAmount: 70,
      currency: 'USD',
      duration: 2,
      maxGroupSize: 6,
    },
  ];

  return mockTours.find(tour => tour.slug[locale] === slug) || null;
}

export default function BookingPage({ params }: Props) {
  // Unwrap params using React.use()
  const { locale, tourSlug } = use(params);
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const tour = getTourBySlug(tourSlug, validLocale);
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const [completed, setCompleted] = useState(false);
  const [reference, setReference] = useState('');

  // If tour not found, show error
  if (!tour) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-2xl font-heading text-teal">Tour Not Found</h1>
        <p className="text-nearblack/70">The tour you're looking for doesn't exist.</p>
        <a href={`/${validLocale}/tours`} className="text-terracotta hover:text-terracotta/80 transition-colors mt-4 inline-block">
          ← Back to Tours
        </a>
      </div>
    );
  }

  const totalGuests = formData.adults + formData.children + formData.infants;
  const estimatedPrice = tour.price * totalGuests;
  
  const content = {
    en: {
      title: 'Book Your Tour',
      step1: 'Select Date & Guests',
      step2: 'Your Details',
      step3: 'Review & Submit',
      date: 'Select Date',
      adults: 'Adults',
      children: 'Children (4-11)',
      infants: 'Infants (0-3)',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      specialRequests: 'Special Requests (Optional)',
      submit: 'Submit Inquiry',
      back: 'Back',
      next: 'Next',
      total: 'Estimated Total',
      currency: 'USD',
      perPerson: 'per person',
      success: '✅ Inquiry Sent!',
      reference: 'Reference Number',
      wait: 'Our team will review your request and contact you within 24 hours.',
      whatsapp: 'Chat on WhatsApp',
      home: 'Return Home',
    },
    fr: {
      title: 'Réserver Votre Circuit',
      step1: 'Choisir Date & Voyageurs',
      step2: 'Vos Coordonnées',
      step3: 'Vérifier & Envoyer',
      date: 'Choisir une Date',
      adults: 'Adultes',
      children: 'Enfants (4-11)',
      infants: 'Nourrissons (0-3)',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      specialRequests: 'Demandes Spéciales (Optionnel)',
      submit: 'Envoyer la Demande',
      back: 'Retour',
      next: 'Continuer',
      total: 'Total Estimé',
      currency: 'USD',
      perPerson: 'par personne',
      success: '✅ Demande Envoyée !',
      reference: 'Numéro de Référence',
      wait: 'Notre équipe examinera votre demande et vous contactera dans les 24 heures.',
      whatsapp: 'Discuter sur WhatsApp',
      home: 'Retour à l\'Accueil',
    },
  };

  const t = content[validLocale];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          tourName: tour.title[validLocale],
          date: formData.date || 'Flexible',
          guests: totalGuests,
          price: estimatedPrice,
          currency: tour.currency || 'USD',
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setReference(data.reference);
        setCompleted(true);
        setStep(4);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="container-custom section-padding max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-heading text-teal">{t.success}</h1>
          <p className="text-nearblack/60 mt-2">{t.wait}</p>
          <div className="bg-cream rounded-xl p-4 mt-4">
            <p className="text-sm text-nearblack/50">{t.reference}</p>
            <p className="text-xl font-mono font-bold text-teal">{reference}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <a
              href="https://wa.me/25377862639"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-medium transition"
            >
              💬 {t.whatsapp}
            </a>
            <a
              href={`/${validLocale}`}
              className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              🏠 {t.home}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section-padding max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
        <h1 className="text-2xl font-heading text-teal mb-2">{t.title}</h1>
        <p className="text-nearblack/60 mb-6">{tour.title[validLocale]}</p>

        {/* Step 1: Date & Guests */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-heading text-teal mb-4">{t.step1}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">
                  {t.date}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-nearblack/70 mb-1">
                    {t.adults}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nearblack/70 mb-1">
                    {t.children}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nearblack/70 mb-1">
                    {t.infants}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={formData.infants}
                    onChange={(e) => setFormData({ ...formData, infants: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                  />
                </div>
              </div>
              <div className="text-right text-sm text-nearblack/50">
                {totalGuests} guests • {tour.currency} {tour.price} {t.perPerson}
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              {t.next} →
            </button>
          </div>
        )}

        {/* Step 2: Your Details */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-heading text-teal mb-4">{t.step2}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-nearblack/70 mb-1">
                    {t.firstName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nearblack/70 mb-1">
                    {t.lastName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">
                  {t.email} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">
                  {t.specialRequests}
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition"
              >
                ← {t.back}
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition"
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
              >
                {t.next} →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-heading text-teal mb-4">{t.step3}</h2>
            <div className="bg-cream rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-nearblack/60">{t.date}</span>
                <span className="font-medium">{formData.date || 'Flexible'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nearblack/60">Guests</span>
                <span className="font-medium">{totalGuests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nearblack/60">{t.total}</span>
                <span className="font-bold text-teal">{tour.currency} {estimatedPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-4 mt-4 text-sm">
              <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              <p className="text-nearblack/60">{formData.email}</p>
              <p className="text-nearblack/60">{formData.phone}</p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition"
              >
                ← {t.back}
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-xl font-medium transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : t.submit}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}