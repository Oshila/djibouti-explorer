'use client';

import { Locale } from '@/types';
import { 
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Props {
  tour: any;
  bookingData: any;
  locale: Locale;
}

export function BookingSummary({ tour, bookingData, locale }: Props) {
  const totalTravellers = bookingData.travellers.adults + bookingData.travellers.children + bookingData.travellers.infants;
  
  const content = {
    en: {
      title: 'Booking Summary',
      tour: 'Tour',
      date: 'Date',
      travellers: 'Travellers',
      price: 'Price',
      deposit: 'Deposit',
      total: 'Total',
      remaining: 'Remaining Balance',
      perPerson: 'per person',
      adults: 'Adults',
      children: 'Children',
      infants: 'Infants',
    },
    fr: {
      title: 'Résumé de la Réservation',
      tour: 'Circuit',
      date: 'Date',
      travellers: 'Voyageurs',
      price: 'Prix',
      deposit: 'Acompte',
      total: 'Total',
      remaining: 'Solde Restant',
      perPerson: 'par personne',
      adults: 'Adultes',
      children: 'Enfants',
      infants: 'Nourrissons',
    },
  };

  const t = content[locale];

  return (
    <div className="bg-cream rounded-xl p-6">
      <h3 className="font-heading text-lg text-teal mb-4">{t.title}</h3>
      
      <div className="space-y-3">
        {/* Tour */}
        <div className="flex justify-between text-sm">
          <span className="text-nearblack/60">{t.tour}</span>
          <span className="font-medium">{tour.title[locale]}</span>
        </div>
        
        {/* Date */}
        <div className="flex justify-between text-sm">
          <span className="text-nearblack/60">{t.date}</span>
          <span className="font-medium">
            {new Date(bookingData.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        
        {/* Travellers */}
        <div className="flex justify-between text-sm">
          <span className="text-nearblack/60">{t.travellers}</span>
          <span className="font-medium">{totalTravellers}</span>
        </div>
        
        {/* Travellers breakdown */}
        <div className="pl-4 text-xs text-nearblack/50 space-y-1">
          {bookingData.travellers.adults > 0 && (
            <div>{t.adults}: {bookingData.travellers.adults}</div>
          )}
          {bookingData.travellers.children > 0 && (
            <div>{t.children}: {bookingData.travellers.children}</div>
          )}
          {bookingData.travellers.infants > 0 && (
            <div>{t.infants}: {bookingData.travellers.infants}</div>
          )}
        </div>
        
        <div className="border-t border-white pt-3 space-y-2">
          {/* Price */}
          <div className="flex justify-between text-sm">
            <span className="text-nearblack/60">{t.price}</span>
            <span className="font-medium">${tour.price} {t.perPerson}</span>
          </div>
          
          {/* Total */}
          <div className="flex justify-between text-sm">
            <span className="text-nearblack/60">{t.total}</span>
            <span className="font-bold text-teal">${tour.price}</span>
          </div>
          
          {/* Deposit */}
          <div className="flex justify-between text-sm">
            <span className="text-nearblack/60">{t.deposit}</span>
            <span className="font-medium text-olive">${tour.depositAmount}</span>
          </div>
          
          {/* Remaining */}
          <div className="flex justify-between text-sm pt-2 border-t border-white">
            <span className="text-nearblack/60">{t.remaining}</span>
            <span className="font-medium">${tour.price - tour.depositAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}