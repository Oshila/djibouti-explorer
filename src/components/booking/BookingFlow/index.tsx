'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/types';
import { 
  CalendarIcon,
  UserGroupIcon,
  UserIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { DateSelector } from '../DateSelector';
import { TravellerSelector } from '../TravellerSelector';
import { CustomerDetails } from '../CustomerDetails';
import { PaymentForm } from '../PaymentForm';
import { BookingSummary } from '../BookingSummary';
import { BookingConfirmation } from '../BookingConfirmation';

interface Props {
  tour: any;
  locale: Locale;
}

type Step = 'date' | 'travellers' | 'details' | 'payment' | 'confirmation';

export default function BookingFlow({ tour, locale }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('date');
  const [bookingData, setBookingData] = useState({
    date: '',
    travellers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      specialRequests: '',
    },
    paymentMethod: '',
  });

  const steps = {
    en: [
      { id: 'date', label: 'Select Date', icon: CalendarIcon },
      { id: 'travellers', label: 'Travellers', icon: UserGroupIcon },
      { id: 'details', label: 'Your Details', icon: UserIcon },
      { id: 'payment', label: 'Payment', icon: CreditCardIcon },
    ],
    fr: [
      { id: 'date', label: 'Choisir Date', icon: CalendarIcon },
      { id: 'travellers', label: 'Voyageurs', icon: UserGroupIcon },
      { id: 'details', label: 'Vos Coordonnées', icon: UserIcon },
      { id: 'payment', label: 'Paiement', icon: CreditCardIcon },
    ],
  };

  // Ensure we always have a steps array for the current locale; fallback to English
  const t = steps[locale] || steps.en;

  const currentStepIndex = t.findIndex(step => step.id === currentStep);
  const totalSteps = t.length;

  const handleNext = (data: any) => {
    setBookingData({ ...bookingData, ...data });
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < totalSteps) {
      const nextStep = t[nextIndex];
      if (nextStep) setCurrentStep(nextStep.id as Step);
    } else {
      setCurrentStep('confirmation');
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      const prevStep = t[prevIndex];
      if (prevStep) setCurrentStep(prevStep.id as Step);
    } else {
      router.push(`/${locale}/tours/${tour.slug[locale]}`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'date':
        return (
          <DateSelector
            tour={tour}
            locale={locale}
            onNext={handleNext}
            onBack={handleBack}
            initialDate={bookingData.date}
          />
        );
      case 'travellers':
        return (
          <TravellerSelector
            tour={tour}
            locale={locale}
            onNext={handleNext}
            onBack={handleBack}
            initialTravellers={bookingData.travellers}
          />
        );
      case 'details':
        return (
          <CustomerDetails
            locale={locale}
            onNext={handleNext}
            onBack={handleBack}
            initialCustomer={bookingData.customer}
          />
        );
      case 'payment':
        return (
          <PaymentForm
            tour={tour}
            bookingData={bookingData}
            locale={locale}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'confirmation':
        return (
          <BookingConfirmation
            tour={tour}
            bookingData={bookingData}
            locale={locale}
          />
        );
      default:
        return null;
    }
  };

  // If on confirmation, show only the confirmation
  if (currentStep === 'confirmation') {
    return renderStep();
  }

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-nearblack/50 mb-6">
            <Link href={`/${locale}`} className="hover:text-teal transition-colors">
              {locale === 'en' ? 'Home' : 'Accueil'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/tours`} className="hover:text-teal transition-colors">
              {locale === 'en' ? 'Tours' : 'Circuits'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/tours/${tour.slug[locale]}`} className="hover:text-teal transition-colors">
              {tour.title[locale]}
            </Link>
            <span>/</span>
            <span className="text-nearblack">{locale === 'en' ? 'Booking' : 'Réservation'}</span>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-heading text-teal">
              {locale === 'en' ? 'Book Your Adventure' : 'Réservez Votre Aventure'}
            </h1>
            <p className="text-nearblack/60 mt-1">
              {tour.title[locale]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between">
              {t.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                const isClickable = index < currentStepIndex;

                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => isClickable && setCurrentStep(step.id as Step)}
                      className={`flex flex-col items-center gap-1 transition-all ${
                        isActive ? 'text-teal' : isCompleted ? 'text-olive' : 'text-nearblack/30'
                      } ${isClickable ? 'hover:text-teal cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive ? 'border-teal bg-teal/10' : 
                        isCompleted ? 'border-olive bg-olive/10' : 
                        'border-nearblack/20'
                      }`}>
                        {isCompleted ? (
                          <CheckCircleIcon className="w-5 h-5 text-olive" />
                        ) : (
                          <Icon className={`w-5 h-5 ${isActive ? 'text-teal' : ''}`} />
                        )}
                      </div>
                      <span className={`text-xs font-medium hidden md:block ${
                        isActive ? 'text-teal' : isCompleted ? 'text-olive' : 'text-nearblack/30'
                      }`}>
                        {step.label}
                      </span>
                    </button>
                    {index < totalSteps - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 transition-all ${
                        index < currentStepIndex ? 'bg-olive' : 'bg-nearblack/10'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              {renderStep()}
            </div>
          </div>

          {/* Tour Summary Sidebar */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm text-nearblack/50">{locale === 'en' ? 'Total Price' : 'Prix Total'}</div>
                <div className="text-2xl font-bold text-teal">${tour.price}</div>
              </div>
              <div>
                <div className="text-sm text-nearblack/50">{locale === 'en' ? 'Deposit' : 'Acompte'}</div>
                <div className="text-lg font-semibold text-olive">${tour.depositAmount}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-nearblack/50">
                <UserGroupIcon className="w-4 h-4" />
                <span>Max {tour.maxGroupSize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}