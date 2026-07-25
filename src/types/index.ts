// Locale type
export type Locale = 'en' | 'fr';

// Localized string type
export interface LocalizedString {
  en: string;
  fr: string;
}

// Tour Types
export interface Tour {
  id: string;
  title: LocalizedString;
  slug: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  price: number;
  depositType: 'fixed' | 'percentage';
  depositAmount: number;
  currency: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  minAge: number;
  destinations: string[];
  meetingPoint: LocalizedString;
  images: {
    primary: string;
    gallery: string[];
  };
  highlights: LocalizedString;
  itinerary: {
    day: number;
    title: LocalizedString;
    description: LocalizedString;
  }[];
  included: LocalizedString;
  excluded: LocalizedString;
  whatToBring: LocalizedString;
  accommodation: LocalizedString;
  transportation: LocalizedString;
  cancellationPolicy: LocalizedString;
  faqs: {
    question: LocalizedString;
    answer: LocalizedString;
  }[];
  itineraryPdfUrl: LocalizedString;
  bestSeasons: string[];
  categories: string[];
  tags: string[];
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  reviewCount?: number;
}

// Booking Types
export interface Booking {
  id: string;
  bookingReference: string;
  tourId: string;
  tourSnapshot: {
    title: LocalizedString;
    price: number;
    depositAmount: number;
    currency: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  };
  travelDate: Date;
  travellers: {
    adults: number;
    children: number;
    infants: number;
  };
  totalAmount: number;
  depositAmount: number;
  remainingBalance: number;
  currency: string;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'deposit_paid' | 'fully_paid' | 'refunded';
  paymentReference?: string;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: {
    status: string;
    note: string;
    timestamp: Date;
    actor: string;
  }[];
  internalNotes?: {
    note: string;
    timestamp: Date;
    actor: string;
  }[];
}

// Review Types
export interface Review {
  id: string;
  tourId: string;
  bookingId?: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: LocalizedString;
  content: LocalizedString;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  featured: boolean;
  verifiedBooking: boolean;
  createdAt: Date;
  updatedAt: Date;
  moderatedBy?: string;
}

// User Types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'staff' | 'customer' | 'none';
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

// Site Settings
export interface SiteSettings {
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  address: LocalizedString;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  baseCurrency: string;
  displayCurrencies: string[];
  exchangeRates: Record<string, number>;
  exchangeRateUpdatedAt: Date;
  defaultMetaTitle: LocalizedString;
  defaultMetaDescription: LocalizedString;
  companyName: LocalizedString;
  tagline: LocalizedString;
  auditLogging: boolean;
  autoApproveReviews: boolean;
}

// Utility Types
export type AppError = {
  code: string;
  message: string;
  details?: any;
};