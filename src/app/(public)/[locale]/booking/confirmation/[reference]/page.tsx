import { Locale } from '@/types';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';

interface Props {
  params: {
    locale: Locale;
    reference: string;
  };
}

// Mock function to get booking by reference
function getBookingByReference(reference: string) {
  // In production, this would fetch from Firebase
  return {
    bookingReference: reference,
    date: '2025-01-15',
    travellers: { adults: 2, children: 1, infants: 0 },
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      country: 'USA',
    },
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
  };
}

// Mock tour data - in production, this would be linked to the booking
const mockTour = {
  id: '1',
  title: { en: 'Lake Assal Discovery', fr: 'Découverte du Lac Assal' },
  price: 150,
  depositAmount: 30,
  currency: 'USD',
  duration: 1,
  maxGroupSize: 8,
};

export default async function ConfirmationPage({ params }: Props) {
  const { locale, reference } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';
  
  const booking = getBookingByReference(reference);

  return (
    <div className="bg-cream min-h-screen py-8">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <BookingConfirmation 
            tour={mockTour} 
            bookingData={booking} 
            locale={validLocale} 
          />
        </div>
      </div>
    </div>
  );
}