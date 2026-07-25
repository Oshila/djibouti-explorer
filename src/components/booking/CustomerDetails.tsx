'use client';

import { useState } from 'react';
import { Locale } from '@/types';

interface Props {
  locale: Locale;
  onNext: (data: any) => void;
  onBack: () => void;
  initialCustomer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests: string;
  };
}

export function CustomerDetails({ locale, onNext, onBack, initialCustomer }: Props) {
  const [customer, setCustomer] = useState(initialCustomer);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setCustomer({ ...customer, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customer.firstName.trim()) {
      newErrors.firstName = locale === 'en' ? 'First name is required' : 'Le prénom est requis';
    }
    if (!customer.lastName.trim()) {
      newErrors.lastName = locale === 'en' ? 'Last name is required' : 'Le nom est requis';
    }
    if (!customer.email.trim()) {
      newErrors.email = locale === 'en' ? 'Email is required' : 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = locale === 'en' ? 'Invalid email address' : 'Adresse email invalide';
    }
    if (!customer.phone.trim()) {
      newErrors.phone = locale === 'en' ? 'Phone number is required' : 'Le numéro de téléphone est requis';
    }
    if (!customer.country.trim()) {
      newErrors.country = locale === 'en' ? 'Country is required' : 'Le pays est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext({ customer });
    }
  };

  const content = {
    en: {
      title: 'Your Details',
      subtitle: 'Please provide your contact information.',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      country: 'Country',
      specialRequests: 'Special Requests (Optional)',
      specialRequestsPlaceholder: 'Dietary requirements, mobility issues, etc.',
      continue: 'Continue to Payment',
      back: 'Back to Travellers',
    },
    fr: {
      title: 'Vos Coordonnées',
      subtitle: 'Veuillez fournir vos informations de contact.',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      country: 'Pays',
      specialRequests: 'Demandes Spéciales (Optionnel)',
      specialRequestsPlaceholder: 'Régime alimentaire, problèmes de mobilité, etc.',
      continue: 'Continuer vers Paiement',
      back: 'Retour aux Voyageurs',
    },
  };

  const t = content[locale];

  return (
    <div>
      <h2 className="text-xl font-heading text-teal mb-2">{t.title}</h2>
      <p className="text-nearblack/60 text-sm mb-6">{t.subtitle}</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              {t.firstName} *
            </label>
            <input
              type="text"
              value={customer.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? 'border-terracotta' : 'border-cream'} focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none`}
            />
            {errors.firstName && (
              <p className="text-terracotta text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              {t.lastName} *
            </label>
            <input
              type="text"
              value={customer.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? 'border-terracotta' : 'border-cream'} focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none`}
            />
            {errors.lastName && (
              <p className="text-terracotta text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              {t.email} *
            </label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-terracotta' : 'border-cream'} focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none`}
            />
            {errors.email && (
              <p className="text-terracotta text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              {t.phone} *
            </label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-terracotta' : 'border-cream'} focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none`}
            />
            {errors.phone && (
              <p className="text-terracotta text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              {t.country} *
            </label>
            <input
              type="text"
              value={customer.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.country ? 'border-terracotta' : 'border-cream'} focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none`}
            />
            {errors.country && (
              <p className="text-terracotta text-sm mt-1">{errors.country}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              {t.specialRequests}
            </label>
            <textarea
              value={customer.specialRequests}
              onChange={(e) => handleChange('specialRequests', e.target.value)}
              placeholder={t.specialRequestsPlaceholder}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition-colors"
          >
            {t.back}
          </button>
          <button
            type="submit"
            className="flex-1 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            {t.continue}
          </button>
        </div>
      </form>
    </div>
  );
}