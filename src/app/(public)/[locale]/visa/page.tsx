'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  CheckIcon, 
  ChevronRightIcon,
  GlobeAltIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserIcon,
  EnvelopeIcon,
  DocumentIcon,
  CalendarIcon,
  MapPinIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface FormData {
  fullName: string;
  email: string;
  passportNumber: string;
  nationality: string;
  arrivalDate: string;
  departureDate: string;
}

export default function VisaPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string || 'en';
  const isEn = locale === 'en';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    passportNumber: '',
    nationality: '',
    arrivalDate: '',
    departureDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: 'Visa Invitation Letter',
      subtitle: 'Get your official invitation letter for Djibouti in 24-48 hours. Fast, secure, and reliable.',
      steps: ['Information', 'Review', 'Complete'],
      form: {
        fullName: 'Full Name (as in passport)',
        email: 'Email Address',
        passportNumber: 'Passport Number',
        nationality: 'Nationality',
        arrivalDate: 'Arrival Date',
        departureDate: 'Departure Date',
        proceed: 'Proceed to Review',
        submitting: 'Submitting...',
      },
      review: {
        title: 'Review Your Information',
        confirm: 'Confirm & Pay',
        edit: 'Edit',
      },
      complete: {
        title: 'Request Sent! 🎉',
        message: 'Your visa invitation letter request has been received. Our team will review your information and contact you shortly.',
        next: 'Back to Home',
      },
      features: [
        { icon: GlobeAltIcon, title: 'Global Access', desc: 'Available for all nationalities eligible for a visa to Djibouti.' },
        { icon: ClockIcon, title: 'Fast Track', desc: 'Standard processing within 24-48 hours of payment.' },
        { icon: ShieldCheckIcon, title: 'Secure', desc: 'Encrypted data processing and secure Stripe payment.' },
      ],
      payment: 'Payment: $23 USD (Visa Fee)',
      paymentNote: 'You will be redirected to Stripe to complete your payment securely.',
    },
    fr: {
      title: "Lettre d'Invitation de Visa",
      subtitle: "Obtenez votre lettre d'invitation officielle pour Djibouti en 24-48 heures. Rapide, sécurisé et fiable.",
      steps: ['Informations', 'Vérification', 'Terminé'],
      form: {
        fullName: 'Nom complet (comme sur le passeport)',
        email: 'Adresse e-mail',
        passportNumber: 'Numéro de passeport',
        nationality: 'Nationalité',
        arrivalDate: "Date d'arrivée",
        departureDate: 'Date de départ',
        proceed: 'Passer à la vérification',
        submitting: 'Envoi en cours...',
      },
      review: {
        title: "Vérifiez vos informations",
        confirm: 'Confirmer & Payer',
        edit: 'Modifier',
      },
      complete: {
        title: 'Demande envoyée ! 🎉',
        message: "Votre demande de lettre d'invitation de visa a été reçue. Notre équipe examinera vos informations et vous contactera sous peu.",
        next: "Retour à l'accueil",
      },
      features: [
        { icon: GlobeAltIcon, title: 'Accès Mondial', desc: 'Disponible pour toutes les nationalités éligibles au visa pour Djibouti.' },
        { icon: ClockIcon, title: 'Rapide', desc: 'Traitement standard sous 24-48 heures après paiement.' },
        { icon: ShieldCheckIcon, title: 'Sécurisé', desc: 'Traitement des données crypté et paiement sécurisé Stripe.' },
      ],
      payment: 'Paiement : 23 $ USD (Frais de visa)',
      paymentNote: 'Vous serez redirigé vers Stripe pour compléter votre paiement en toute sécurité.',
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    return formData.fullName && formData.email && formData.passportNumber && 
           formData.nationality && formData.arrivalDate && formData.departureDate;
  };

  // ⭐ Updated: Save to Firestore and redirect to Stripe checkout
  const handleSubmit = async () => {
  setIsSubmitting(true);
  
  try {
    // Save visa request to Firestore
    const docRef = await addDoc(collection(db, 'visaRequests'), {
      ...formData,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: serverTimestamp(),
    });
    
    // ⭐ Also create a payment record
    await addDoc(collection(db, 'payments'), {
      visaRequestId: docRef.id,
      amount: 23,
      currency: 'usd',
      status: 'pending',
      type: 'visa',
      metadata: {
        visaRequestId: docRef.id,
        customerName: formData.fullName,
        customerEmail: formData.email,
      },
      customerEmail: formData.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Redirect to Stripe checkout
    const checkoutUrl = `/${locale}/checkout?type=visa&id=${docRef.id}&name=${encodeURIComponent('Visa Invitation Letter')}&price=23`;
    router.push(checkoutUrl);
    
  } catch (error) {
    console.error('Error saving visa request:', error);
    toast.error('Failed to submit request. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
            {t.form.fullName} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nearblack/30" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
            {t.form.email} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nearblack/30" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
            {t.form.passportNumber} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <DocumentIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nearblack/30" />
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              placeholder="A1234567"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
            {t.form.nationality} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nearblack/30" />
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              placeholder="e.g. French"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
            {t.form.arrivalDate} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nearblack/30" />
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1.5">
            {t.form.departureDate} <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nearblack/30" />
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-olive/5 rounded-xl p-4 border border-olive/20">
        <div className="flex items-center gap-3">
          <CreditCardIcon className="w-5 h-5 text-olive" />
          <div>
            <p className="text-sm font-medium text-olive">{t.payment}</p>
            <p className="text-xs text-nearblack/50">
              {isEn 
                ? 'You will be redirected to Stripe to complete payment.' 
                : 'Vous serez redirigé vers Stripe pour effectuer le paiement.'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!validateStep1()}
        className={`w-full py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
          validateStep1()
            ? 'bg-teal hover:bg-teal/90 text-white hover:shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {t.form.proceed}
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-cream/30 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-nearblack/50">{t.form.fullName}</p>
            <p className="font-medium text-teal">{formData.fullName}</p>
          </div>
          <div>
            <p className="text-xs text-nearblack/50">{t.form.email}</p>
            <p className="font-medium text-teal">{formData.email}</p>
          </div>
          <div>
            <p className="text-xs text-nearblack/50">{t.form.passportNumber}</p>
            <p className="font-medium text-teal">{formData.passportNumber}</p>
          </div>
          <div>
            <p className="text-xs text-nearblack/50">{t.form.nationality}</p>
            <p className="font-medium text-teal">{formData.nationality}</p>
          </div>
          <div>
            <p className="text-xs text-nearblack/50">{t.form.arrivalDate}</p>
            <p className="font-medium text-teal">{formData.arrivalDate}</p>
          </div>
          <div>
            <p className="text-xs text-nearblack/50">{t.form.departureDate}</p>
            <p className="font-medium text-teal">{formData.departureDate}</p>
          </div>
        </div>
        
        <div className="border-t border-cream pt-4">
          <p className="text-sm font-medium text-olive">{t.payment}</p>
          <p className="text-xs text-nearblack/50">
            {isEn 
              ? 'Payment will be processed via Stripe.' 
              : 'Le paiement sera traité via Stripe.'}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-3.5 rounded-xl font-medium border border-cream text-nearblack/60 hover:bg-cream transition-all"
        >
          {t.review.edit}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 py-3.5 rounded-xl font-medium bg-terracotta hover:bg-terracotta/90 text-white transition-all hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? t.form.submitting : t.review.confirm}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center py-8 space-y-6">
      <div className="w-20 h-20 bg-olive/10 rounded-full flex items-center justify-center mx-auto">
        <CheckIcon className="w-10 h-10 text-olive" />
      </div>
      <h2 className="text-2xl font-heading text-teal">{t.complete.title}</h2>
      <p className="text-nearblack/70 max-w-md mx-auto">{t.complete.message}</p>
      <Link
        href={`/${locale}`}
        className="inline-block bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
      >
        {t.complete.next}
      </Link>
    </div>
  );

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading text-teal mb-4">{t.title}</h1>
          <p className="text-lg text-nearblack/70">{t.subtitle}</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-cream">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-heading text-teal mb-1">{feature.title}</h3>
                <p className="text-sm text-nearblack/60">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-cream p-6 md:p-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {t.steps.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isCompleted = stepNumber < step;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      isCompleted
                        ? 'bg-olive text-white'
                        : isActive
                        ? 'bg-teal text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckIcon className="w-4 h-4" /> : stepNumber}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${
                      isActive ? 'text-teal' : isCompleted ? 'text-olive' : 'text-gray-400'
                    }`}
                  >
                    {label}
                  </span>
                  {index < t.steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 ${
                        index + 1 < step ? 'bg-olive' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
}