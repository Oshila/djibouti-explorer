'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { 
  CreditCardIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

interface Props {
  tour: any;
  bookingData: any;
  locale: Locale;
  onNext: (data: any) => void;
  onBack: () => void;
}

export function PaymentForm({ tour, bookingData, locale, onNext, onBack }: Props) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Payment providers - can be swapped with real ones later
  const paymentProviders = {
    en: [
      { id: 'stripe', name: 'Credit / Debit Card', icon: CreditCardIcon, description: 'Visa, Mastercard, Amex' },
      { id: 'd-money', name: 'D-Money', icon: BuildingOfficeIcon, description: 'Local mobile payment' },
      { id: 'waafi', name: 'Waafi', icon: BuildingOfficeIcon, description: 'Regional payment service' },
      { id: 'bank', name: 'Bank Transfer', icon: BanknotesIcon, description: 'Direct bank transfer' },
    ],
    fr: [
      { id: 'stripe', name: 'Carte de Crédit / Débit', icon: CreditCardIcon, description: 'Visa, Mastercard, Amex' },
      { id: 'd-money', name: 'D-Money', icon: BuildingOfficeIcon, description: 'Paiement mobile local' },
      { id: 'waafi', name: 'Waafi', icon: BuildingOfficeIcon, description: 'Service de paiement régional' },
      { id: 'bank', name: 'Virement Bancaire', icon: BanknotesIcon, description: 'Virement bancaire direct' },
    ],
  };

  const t = paymentProviders[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      setError(locale === 'en' ? 'Please select a payment method' : 'Veuillez sélectionner un moyen de paiement');
      return;
    }

    setIsProcessing(true);
    setError('');

    // Generate a mock booking reference
    const bookingReference = `DB-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Send booking data to parent
      onNext({
        paymentMethod,
        bookingReference,
        // In production, this would be the actual payment confirmation
        paymentStatus: 'pending'
      });
      
      // Redirect to confirmation
      router.push(`/${locale}/booking/confirmation/${bookingReference}`);
    }, 2000);
  };

  const totalAmount = tour.price;
  const depositAmount = tour.depositAmount;

  return (
    <div>
      <h2 className="text-xl font-heading text-teal mb-2">
        {locale === 'en' ? 'Secure Payment' : 'Paiement Sécurisé'}
      </h2>
      <p className="text-nearblack/60 text-sm mb-6">
        {locale === 'en' 
          ? 'Choose your preferred payment method to secure your booking.' 
          : 'Choisissez votre moyen de paiement préféré pour sécuriser votre réservation.'}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Payment Summary */}
        <div className="bg-cream rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-nearblack/60">{locale === 'en' ? 'Total Amount' : 'Montant Total'}</span>
            <span className="font-medium">${totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-nearblack/60">{locale === 'en' ? 'Deposit Required' : 'Acompte Requis'}</span>
            <span className="font-medium text-olive">${depositAmount}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-white">
            <span className="text-nearblack/60">{locale === 'en' ? 'Remaining Balance' : 'Solde Restant'}</span>
            <span className="font-medium">${totalAmount - depositAmount}</span>
          </div>
          <div className="mt-2 text-xs text-nearblack/40">
            {locale === 'en' 
              ? 'Pay the deposit now. Remaining balance can be paid later.' 
              : 'Payez l\'acompte maintenant. Le solde restant peut être payé plus tard.'}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {t.map((provider) => {
            const Icon = provider.icon;
            const isSelected = paymentMethod === provider.id;
            return (
              <button
                key={provider.id}
                type="button"
                onClick={() => {
                  setPaymentMethod(provider.id);
                  setError('');
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-teal bg-teal/5'
                    : 'border-cream hover:border-teal/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-teal/10 text-teal' : 'bg-cream text-nearblack/40'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-xs text-nearblack/50">{provider.description}</div>
                </div>
                {isSelected && (
                  <CheckCircleIcon className="w-5 h-5 text-teal" />
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p className="text-terracotta text-sm mb-4">{error}</p>
        )}

        {/* Security Note */}
        <div className="flex items-center gap-2 text-xs text-nearblack/40 mb-6">
          <LockClosedIcon className="w-4 h-4" />
          <span>
            {locale === 'en' 
              ? 'Your payment information is secure and encrypted.' 
              : 'Vos informations de paiement sont sécurisées et cryptées.'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition-colors"
          >
            {locale === 'en' ? 'Back to Details' : 'Retour aux Coordonnées'}
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className={`flex-1 bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {locale === 'en' ? 'Processing...' : 'Traitement...'}
              </>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5" />
                {locale === 'en' ? 'Pay Deposit Now' : 'Payer l\'Acompte'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}