'use client';

import { Locale } from '@/types';
import { 
  CheckCircleIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PrinterIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Props {
  tour: any;
  bookingData: any;
  locale: Locale;
}

export function BookingConfirmation({ tour, bookingData, locale }: Props) {
  const isPaid = bookingData?.paymentStatus === 'paid' || bookingData?.paymentStatus === 'succeeded';
  const isPending = bookingData?.paymentStatus === 'pending' || !bookingData?.paymentStatus;

  const content = {
    en: {
      title: 'Booking Confirmed! 🎉',
      subtitle: 'Your adventure is booked. A confirmation email has been sent.',
      reference: 'Booking Reference',
      tour: 'Tour',
      date: 'Date',
      travellers: 'Travellers',
      total: 'Total Paid',
      paymentStatus: 'Payment Status',
      paid: '✅ Payment Confirmed',
      pending: '⏳ Payment Pending',
      paymentNote: 'Please complete your payment to confirm your booking.',
      next: 'What happens next?',
      steps: [
        'You will receive a confirmation email with your booking details.',
        'Our team will contact you within 24 hours to confirm all arrangements.',
        'Your guide will meet you at the designated meeting point on the day of the tour.',
        'Enjoy your adventure with Djibouti Explorer!'
      ],
      contact: 'Need help? Contact us on WhatsApp',
      print: 'Print Confirmation',
    },
    fr: {
      title: 'Réservation Confirmée ! 🎉',
      subtitle: 'Votre aventure est réservée. Un email de confirmation a été envoyé.',
      reference: 'Référence de Réservation',
      tour: 'Circuit',
      date: 'Date',
      travellers: 'Voyageurs',
      total: 'Total Payé',
      paymentStatus: 'Statut du Paiement',
      paid: '✅ Paiement Confirmé',
      pending: '⏳ Paiement en Attente',
      paymentNote: 'Veuillez compléter votre paiement pour confirmer votre réservation.',
      next: 'Et maintenant ?',
      steps: [
        'Vous recevrez un email de confirmation avec les détails de votre réservation.',
        'Notre équipe vous contactera dans les 24 heures pour confirmer tous les arrangements.',
        'Votre guide vous attendra au point de rendez-vous désigné le jour du circuit.',
        'Profitez de votre aventure avec Djibouti Explorer !'
      ],
      contact: 'Besoin d\'aide ? Contactez-nous sur WhatsApp',
      print: 'Imprimer la Confirmation',
    },
  };

  const t = content[locale];
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '253XXXXXXXXX';
  const message = encodeURIComponent(
    locale === 'en' 
      ? `Hi! I have a booking (${bookingData.bookingReference}) and have a question.` 
      : `Bonjour ! J'ai une réservation (${bookingData.bookingReference}) et j'ai une question.`
  );

  const totalTravellers = (bookingData.travellers?.adults || 0) + 
                          (bookingData.travellers?.children || 0) + 
                          (bookingData.travellers?.infants || 0);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-10 h-10 text-olive" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading text-teal">{t.title}</h1>
        <p className="text-nearblack/60 mt-2">{t.subtitle}</p>
      </div>

      {/* Payment Status */}
      <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
        isPaid ? 'bg-olive/10 border border-olive/20' : 'bg-ochre/10 border border-ochre/20'
      }`}>
        {isPaid ? (
          <CheckCircleIcon className="w-6 h-6 text-olive flex-shrink-0" />
        ) : (
          <ClockIcon className="w-6 h-6 text-ochre flex-shrink-0" />
        )}
        <div>
          <div className="text-sm font-medium">
            {isPaid ? t.paid : t.pending}
          </div>
          {!isPaid && (
            <p className="text-xs text-nearblack/60">{t.paymentNote}</p>
          )}
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-cream rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-nearblack/50">{t.reference}</div>
            <div className="font-mono font-bold text-teal">{bookingData.bookingReference || 'N/A'}</div>
          </div>
          <div>
            <div className="text-xs text-nearblack/50">{t.tour}</div>
            <div className="font-medium">{tour?.title?.[locale] || bookingData.tourName || 'Tour'}</div>
          </div>
          <div>
            <div className="text-xs text-nearblack/50">{t.date}</div>
            <div className="font-medium">
              {bookingData.date 
                ? new Date(bookingData.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR')
                : 'Flexible'}
            </div>
          </div>
          <div>
            <div className="text-xs text-nearblack/50">{t.travellers}</div>
            <div className="font-medium">{totalTravellers}</div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-cream rounded-xl p-4 text-center mb-6">
        <div className="text-xs text-nearblack/50">{t.total}</div>
        <div className="text-2xl font-bold text-teal">
          ${bookingData.totalAmount || tour?.price || 0}
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-6">
        <h3 className="font-heading text-lg text-teal mb-3">{t.next}</h3>
        <ul className="space-y-2">
          {t.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 bg-teal/10 text-teal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-nearblack/70">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/${phoneNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
          {t.contact}
        </a>
        <button
          onClick={() => window.print()}
          className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition-colors flex items-center justify-center gap-2"
        >
          <PrinterIcon className="w-5 h-5" />
          {t.print}
        </button>
      </div>

      {/* Email Note */}
      <div className="mt-4 text-center text-xs text-nearblack/40 flex items-center justify-center gap-2">
        <EnvelopeIcon className="w-4 h-4" />
        <span>
          {locale === 'en' 
            ? 'A confirmation email has been sent to your email address.' 
            : 'Un email de confirmation a été envoyé à votre adresse email.'}
        </span>
      </div>
    </div>
  );
}