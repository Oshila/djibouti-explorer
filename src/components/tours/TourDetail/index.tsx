'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { 
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  tour: any;
  locale: Locale;
}

export default function TourDetail({ tour, locale }: Props) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const tabs = {
    en: [
      { id: 'overview', label: 'Overview' },
      { id: 'itinerary', label: 'Itinerary' },
      { id: 'inclusions', label: "What's Included" },
      { id: 'reviews', label: 'Reviews' },
      { id: 'faq', label: 'FAQ' },
    ],
    fr: [
      { id: 'overview', label: 'Aperçu' },
      { id: 'itinerary', label: 'Itinéraire' },
      { id: 'inclusions', label: 'Ce qui est Inclus' },
      { id: 'reviews', label: 'Avis' },
      { id: 'faq', label: 'FAQ' },
    ],
  };

  const t = tabs[locale];

  // Get image path
  const getImagePath = (path: string) => {
    if (!path) return null;
    if (path.startsWith('/')) return path;
    return `/images/tours/${path}`;
  };

  const primaryImage = tour.images?.primary ? getImagePath(tour.images.primary) : null;
  const galleryImages = tour.images?.gallery ? tour.images.gallery.map((img: string) => getImagePath(img)).filter(Boolean) : [];

  // Booking Summary
  const totalGuests = 2;
  const estimatedPrice = tour.price * totalGuests;

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-custom py-8">
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
          <span className="text-nearblack">{tour.title[locale]}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Back Button */}
            <Link
              href={`/${locale}/tours`}
              className="inline-flex items-center gap-2 text-nearblack/60 hover:text-teal transition-colors mb-6 group"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {locale === 'en' ? 'Back to Tours' : 'Retour aux Circuits'}
            </Link>

            {/* Tour Header */}
            <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 shadow-sm border border-cream/50">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tour.categories?.map((cat: string) => (
                      <span key={cat} className="text-xs font-medium uppercase tracking-wider text-teal bg-teal/10 px-3 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                    {tour.featured && (
                      <span className="text-xs font-medium uppercase tracking-wider text-ochre bg-ochre/10 px-3 py-1 rounded-full flex items-center gap-1">
                        <StarSolidIcon className="w-3 h-3" />
                        {locale === 'en' ? 'Featured' : 'Vedette'}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-teal mb-3">
                    {tour.title[locale]}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-nearblack/70">
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-ochre" />
                      <span className="font-medium">{tour.rating || 0}</span>
                      <span className="text-nearblack/50">({tour.reviewCount || 0} {locale === 'en' ? 'reviews' : 'avis'})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{tour.destinations?.join(', ') || 'Various'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{tour.duration} {locale === 'en' ? 'day' : 'jour'}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block text-right">
                  <div className="text-3xl font-bold text-teal">${tour.price}</div>
                  <div className="text-sm text-nearblack/50">/ {locale === 'en' ? 'person' : 'personne'}</div>
                  <div className="text-xs text-olive mt-1 font-medium">
                    {locale === 'en' ? 'Deposit from' : 'Acompte à partir de'} ${tour.depositAmount}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 shadow-sm border border-cream/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Primary Image */}
                <div className="md:col-span-2 h-64 md:h-80 lg:h-96 bg-gradient-to-br from-teal/5 to-terracotta/5 rounded-2xl overflow-hidden relative">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={tour.title[locale]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-nearblack/20 text-lg">
                      No Image Available
                    </div>
                  )}
                </div>
                
                {/* Gallery Thumbnails */}
                <div className="grid grid-cols-2 gap-3">
                  {galleryImages.length > 0 ? (
                    galleryImages.slice(0, 4).map((image: string, index: number) => (
                      <div key={index} className="h-32 bg-gradient-to-br from-teal/5 to-terracotta/5 rounded-2xl overflow-hidden relative">
                        <img
                          src={image}
                          alt={`${tour.title[locale]} - Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    // 4 placeholder boxes
                    <>
                      <div className="h-32 bg-gradient-to-br from-teal/5 to-terracotta/5 rounded-2xl flex items-center justify-center text-nearblack/10 text-xs">
                        Gallery
                      </div>
                      <div className="h-32 bg-gradient-to-br from-teal/5 to-terracotta/5 rounded-2xl flex items-center justify-center text-nearblack/10 text-xs">
                        Gallery
                      </div>
                      <div className="h-32 bg-gradient-to-br from-teal/5 to-terracotta/5 rounded-2xl flex items-center justify-center text-nearblack/10 text-xs">
                        Gallery
                      </div>
                      <div className="h-32 bg-gradient-to-br from-teal/5 to-terracotta/5 rounded-2xl flex items-center justify-center text-nearblack/10 text-xs">
                        Gallery
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-3xl shadow-sm border border-cream/50 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-cream overflow-x-auto">
                <div className="flex px-4 md:px-6">
                  {t.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-all relative ${
                        activeTab === tab.id
                          ? 'text-teal'
                          : 'text-nearblack/50 hover:text-teal'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h2 className="text-xl font-heading text-teal mb-4">
                        {locale === 'en' ? 'About This Tour' : 'À Propos de ce Circuit'}
                      </h2>
                      <p className="text-nearblack/80 leading-relaxed whitespace-pre-line">
                        {tour.description?.[locale] || 'No description available.'}
                      </p>
                    </div>

                    {/* Highlights */}
                    {tour.highlights?.[locale]?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-heading text-teal mb-4">
                          {locale === 'en' ? '✨ Highlights' : '✨ Points Forts'}
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tour.highlights[locale].map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <CheckCircleIcon className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                              <span className="text-nearblack/80">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-cream">
                      <div>
                        <div className="text-xs text-nearblack/50 uppercase tracking-wider">{locale === 'en' ? 'Duration' : 'Durée'}</div>
                        <div className="font-medium text-teal">{tour.duration} {locale === 'en' ? 'day' : 'jour'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-nearblack/50 uppercase tracking-wider">{locale === 'en' ? 'Group Size' : 'Taille du Groupe'}</div>
                        <div className="font-medium text-teal">Max {tour.maxGroupSize}</div>
                      </div>
                      <div>
                        <div className="text-xs text-nearblack/50 uppercase tracking-wider">{locale === 'en' ? 'Difficulty' : 'Difficulté'}</div>
                        <div className="font-medium text-teal capitalize">{tour.difficulty || 'Easy'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-nearblack/50 uppercase tracking-wider">{locale === 'en' ? 'Min Age' : 'Âge Minimum'}</div>
                        <div className="font-medium text-teal">{tour.minAge || 0}+</div>
                      </div>
                    </div>

                    {/* Meeting Point */}
                    {tour.meetingPoint?.[locale] && (
                      <div className="bg-cream/50 rounded-2xl p-5 border border-cream">
                        <div className="flex items-start gap-3">
                          <MapPinIcon className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-teal">
                              {locale === 'en' ? '📍 Meeting Point' : '📍 Point de Rendez-vous'}
                            </div>
                            <div className="text-sm text-nearblack/80 mt-1">{tour.meetingPoint[locale]}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PDF Download */}
                    {tour.itineraryPdfUrl?.[locale] && (
                      <div className="bg-teal/5 rounded-2xl p-5 border border-teal/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center">
                            <DocumentIcon className="w-6 h-6 text-teal" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-teal">
                              {locale === 'en' ? 'Download Itinerary' : 'Télécharger l\'Itinéraire'}
                            </div>
                            <a
                              href={tour.itineraryPdfUrl[locale]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-terracotta hover:text-terracotta/80 transition-colors font-medium"
                            >
                              {locale === 'en' ? 'Download PDF →' : 'Télécharger le PDF →'}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    {tour.itinerary?.length > 0 ? (
                      tour.itinerary.map((day: any, index: number) => (
                        <div key={day.day} className="flex gap-4 group">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center text-teal font-bold text-sm group-hover:bg-teal/20 transition-colors">
                              {day.day}
                            </div>
                            {index < tour.itinerary.length - 1 && (
                              <div className="w-0.5 flex-1 bg-cream group-hover:bg-teal/20 transition-colors" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <h3 className="font-heading text-lg text-teal mb-2">
                              {day.title?.[locale] || `Day ${day.day}`}
                            </h3>
                            <p className="text-nearblack/70 text-sm leading-relaxed">
                              {day.description?.[locale] || ''}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-nearblack/60">No itinerary available for this tour.</p>
                    )}
                  </div>
                )}

                {/* Inclusions Tab */}
                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-olive/5 rounded-2xl p-6 border border-olive/10">
                      <h3 className="font-heading text-lg text-olive mb-4 flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5" />
                        {locale === 'en' ? 'Included' : 'Inclus'}
                      </h3>
                      {tour.included?.[locale]?.length > 0 ? (
                        <ul className="space-y-3">
                          {tour.included[locale].map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <CheckCircleIcon className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                              <span className="text-nearblack/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-nearblack/60">No inclusions listed.</p>
                      )}
                    </div>
                    <div className="bg-terracotta/5 rounded-2xl p-6 border border-terracotta/10">
                      <h3 className="font-heading text-lg text-terracotta mb-4 flex items-center gap-2">
                        <XCircleIcon className="w-5 h-5" />
                        {locale === 'en' ? 'Excluded' : 'Exclus'}
                      </h3>
                      {tour.excluded?.[locale]?.length > 0 ? (
                        <ul className="space-y-3">
                          {tour.excluded[locale].map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <XCircleIcon className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                              <span className="text-nearblack/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-nearblack/60">No exclusions listed.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 p-6 bg-cream/30 rounded-2xl border border-cream">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-teal">{tour.rating || 0}</div>
                        <div className="flex items-center gap-1 text-ochre mt-1">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon key={i} className="w-4 h-4" />
                          ))}
                        </div>
                        <div className="text-sm text-nearblack/50 mt-1">
                          {tour.reviewCount || 0} {locale === 'en' ? 'reviews' : 'avis'}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-nearblack/60 text-sm">
                          {locale === 'en' 
                            ? 'Reviews coming soon. Book now and share your experience!' 
                            : 'Les avis arrivent bientôt. Réservez maintenant et partagez votre expérience !'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {tour.faqs?.length > 0 ? (
                      tour.faqs.map((faq: any, index: number) => (
                        <div key={index} className="border border-cream rounded-2xl overflow-hidden">
                          <details className="group">
                            <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-cream/30 transition-colors">
                              <span className="font-medium text-teal">{faq.question?.[locale] || ''}</span>
                              <ChevronDownIcon className="w-5 h-5 text-teal/60 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-5 pb-5 text-sm text-nearblack/70 leading-relaxed">
                              {faq.answer?.[locale] || ''}
                            </div>
                          </details>
                        </div>
                      ))
                    ) : (
                      <p className="text-nearblack/60">No FAQs available for this tour.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Booking Card - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-cream/50">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-teal">${tour.price}</span>
                <span className="text-nearblack/50 text-sm"> / {locale === 'en' ? 'person' : 'personne'}</span>
                <div className="text-xs text-olive mt-1 font-medium">
                  {locale === 'en' ? 'Deposit from' : 'Acompte à partir de'} ${tour.depositAmount}
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6 p-4 bg-cream/30 rounded-2xl">
                <div className="flex justify-between">
                  <span className="text-nearblack/60">{locale === 'en' ? 'Duration' : 'Durée'}</span>
                  <span className="font-medium text-teal">{tour.duration} {locale === 'en' ? 'day' : 'jour'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nearblack/60">{locale === 'en' ? 'Group Size' : 'Taille du Groupe'}</span>
                  <span className="font-medium text-teal">Max {tour.maxGroupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nearblack/60">{locale === 'en' ? 'Deposit' : 'Acompte'}</span>
                  <span className="font-medium text-olive">${tour.depositAmount}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/${locale}/booking/${tour.slug[locale]}`}
                  className="w-full bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 block text-center"
                >
                  {locale === 'en' ? 'Book Now' : 'Réserver'}
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25377862639'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  {locale === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}
                </a>
              </div>

              <div className="mt-4 text-center space-y-1">
                <div className="text-xs text-nearblack/40 flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-olive" />
                  {locale === 'en' ? 'Free cancellation up to 24h' : 'Annulation gratuite jusqu\'à 24h'}
                </div>
                <div className="text-xs text-nearblack/40 flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-olive" />
                  {locale === 'en' ? 'Best price guarantee' : 'Meilleur prix garanti'}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Booking Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream p-4 z-40 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-teal">${tour.price}</span>
                <span className="text-nearblack/50 text-sm">/ {locale === 'en' ? 'person' : 'personne'}</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25377862639'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                </a>
                <Link
                  href={`/${locale}/booking/${tour.slug[locale]}`}
                  className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                  {locale === 'en' ? 'Book Now' : 'Réserver'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}