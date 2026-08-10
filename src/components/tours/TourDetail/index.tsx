'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  tour: any;
  locale: Locale;
}

export default function TourDetail({ tour, locale }: Props) {
  const [activeTab, setActiveTab] = useState('overview');

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

  // Get the image path from public/images/tours/
  const getImagePath = (path: string) => {
    if (!path) return null;
    // If path already starts with /, use it as is
    if (path.startsWith('/')) return path;
    // Otherwise, assume it's in the tours folder
    return `/images/tours/${path}`;
  };

  // Get primary image
  const primaryImage = tour.images?.primary 
    ? getImagePath(tour.images.primary) 
    : null;

  // Get gallery images
  const galleryImages = tour.images?.gallery 
    ? tour.images.gallery.map((img: string) => getImagePath(img)).filter(Boolean)
    : [];

  return (
    <div className="bg-cream">
      {/* Sticky Booking Bar - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream p-4 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-teal">${tour.price}</span>
            <span className="text-nearblack/50 text-sm">/ {locale === 'en' ? 'person' : 'personne'}</span>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
            </a>
            <Link
              href={`/${locale}/booking/${tour.slug[locale]}`}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              {locale === 'en' ? 'Book Now' : 'Réserver'}
            </Link>
          </div>
        </div>
      </div>

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
              className="inline-flex items-center gap-2 text-nearblack/60 hover:text-teal transition-colors mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {locale === 'en' ? 'Back to Tours' : 'Retour aux Circuits'}
            </Link>

            {/* Tour Header */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading text-teal mb-2">
                    {tour.title[locale]}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-nearblack/70">
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-ochre" />
                      <span className="font-medium">{tour.rating || 0}</span>
                      <span>({tour.reviewCount || 0} {locale === 'en' ? 'reviews' : 'avis'})</span>
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
                  <div className="text-xs text-olive mt-1">
                    {locale === 'en' ? 'Deposit from' : 'Acompte à partir de'} ${tour.depositAmount}
                  </div>
                </div>
              </div>
            </div>
{/* Image Gallery */}
<div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
    {/* Main Image - Primary */}
    <div className="md:col-span-2 h-64 md:h-80 bg-gradient-to-br from-teal/20 to-terracotta/20 rounded-xl overflow-hidden relative">
      {tour.images?.primary ? (
        <img
          src={tour.images.primary}
          alt={tour.title[locale]}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-nearblack/30 text-lg">
          No Image Available
        </div>
      )}
    </div>
    
    {/* Gallery Thumbnails - 4 images */}
    <div className="grid grid-cols-2 gap-2">
      {tour.images?.gallery && tour.images.gallery.length > 0 ? (
        tour.images.gallery.slice(0, 4).map((image: string, index: number) => (
          <div key={index} className="h-32 bg-gradient-to-br from-teal/20 to-terracotta/20 rounded-xl overflow-hidden relative">
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
        // 4 placeholder boxes if no gallery images
        <>
          <div className="h-32 bg-gradient-to-br from-teal/20 to-terracotta/20 rounded-xl flex items-center justify-center text-nearblack/20 text-xs">
            Gallery
          </div>
          <div className="h-32 bg-gradient-to-br from-teal/20 to-terracotta/20 rounded-xl flex items-center justify-center text-nearblack/20 text-xs">
            Gallery
          </div>
          <div className="h-32 bg-gradient-to-br from-teal/20 to-terracotta/20 rounded-xl flex items-center justify-center text-nearblack/20 text-xs">
            Gallery
          </div>
          <div className="h-32 bg-gradient-to-br from-teal/20 to-terracotta/20 rounded-xl flex items-center justify-center text-nearblack/20 text-xs">
            Gallery
          </div>
        </>
      )}
    </div>
  </div>
</div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="border-b border-cream">
                <div className="flex overflow-x-auto">
                  {t.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-teal border-b-2 border-teal'
                          : 'text-nearblack/60 hover:text-teal'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <p className="text-nearblack/80 leading-relaxed">
                      {tour.description?.[locale] || 'No description available.'}
                    </p>

                    {/* Highlights */}
                    {tour.highlights?.[locale]?.length > 0 && (
                      <div>
                        <h3 className="font-heading text-lg text-teal mb-3">
                          {locale === 'en' ? 'Highlights' : 'Points Forts'}
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {tour.highlights[locale].map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircleIcon className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                              <span className="text-nearblack/80">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-cream">
                      <div>
                        <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Duration' : 'Durée'}</div>
                        <div className="font-medium">{tour.duration} {locale === 'en' ? 'day' : 'jour'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Group Size' : 'Taille du Groupe'}</div>
                        <div className="font-medium">Max {tour.maxGroupSize}</div>
                      </div>
                      <div>
                        <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Difficulty' : 'Difficulté'}</div>
                        <div className="font-medium capitalize">{tour.difficulty || 'Easy'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-nearblack/50">{locale === 'en' ? 'Min Age' : 'Âge Minimum'}</div>
                        <div className="font-medium">{tour.minAge || 0}+</div>
                      </div>
                    </div>

                    {/* Meeting Point */}
                    {tour.meetingPoint?.[locale] && (
                      <div className="bg-cream rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <MapPinIcon className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-teal">
                              {locale === 'en' ? 'Meeting Point' : 'Point de Rendez-vous'}
                            </div>
                            <div className="text-sm text-nearblack/80">{tour.meetingPoint[locale]}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Itinerary PDF Download */}
                    {tour.itineraryPdfUrl?.[locale] && (
                      <div className="bg-teal/5 rounded-xl p-4 border border-teal/10">
                        <div className="flex items-center gap-3">
                          <DocumentIcon className="w-6 h-6 text-teal" />
                          <div>
                            <div className="text-sm font-medium text-teal">
                              {locale === 'en' ? 'Download Itinerary' : 'Télécharger l\'Itinéraire'}
                            </div>
                            <a
                              href={tour.itineraryPdfUrl[locale]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-terracotta hover:text-terracotta/80 transition-colors"
                            >
                              {locale === 'en' ? 'Download PDF' : 'Télécharger le PDF'}
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
                      tour.itinerary.map((day: any) => (
                        <div key={day.day} className="border-l-2 border-teal pl-4">
                          <h3 className="font-heading text-lg text-teal">
                            {locale === 'en' ? 'Day' : 'Jour'} {day.day}: {day.title?.[locale] || ''}
                          </h3>
                          <p className="text-nearblack/80 text-sm mt-2">{day.description?.[locale] || ''}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-nearblack/60">No itinerary available for this tour.</p>
                    )}
                  </div>
                )}

                {/* Inclusions Tab */}
                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-heading text-lg text-olive mb-3">
                        {locale === 'en' ? 'Included' : 'Inclus'}
                      </h3>
                      {tour.included?.[locale]?.length > 0 ? (
                        <ul className="space-y-2">
                          {tour.included[locale].map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircleIcon className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                              <span className="text-nearblack/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-nearblack/60">No inclusions listed.</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-terracotta mb-3">
                        {locale === 'en' ? 'Excluded' : 'Exclus'}
                      </h3>
                      {tour.excluded?.[locale]?.length > 0 ? (
                        <ul className="space-y-2">
                          {tour.excluded[locale].map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
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
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-teal">{tour.rating || 0}</div>
                      <div>
                        <div className="flex items-center gap-1 text-ochre">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon key={i} className="w-5 h-5" />
                          ))}
                        </div>
                        <div className="text-sm text-nearblack/50">
                          {tour.reviewCount || 0} {locale === 'en' ? 'reviews' : 'avis'}
                        </div>
                      </div>
                    </div>
                    <p className="text-nearblack/60 text-sm">
                      {locale === 'en' 
                        ? 'Reviews coming soon. Book now and share your experience!' 
                        : 'Les avis arrivent bientôt. Réservez maintenant et partagez votre expérience !'}
                    </p>
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {tour.faqs?.length > 0 ? (
                      tour.faqs.map((faq: any, index: number) => (
                        <div key={index} className="border-b border-cream pb-4 last:border-0 last:pb-0">
                          <h3 className="font-medium text-teal mb-1">{faq.question?.[locale] || ''}</h3>
                          <p className="text-nearblack/80 text-sm">{faq.answer?.[locale] || ''}</p>
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
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-cream">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-teal">${tour.price}</span>
                <span className="text-nearblack/50 text-sm"> / {locale === 'en' ? 'person' : 'personne'}</span>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-nearblack/60">{locale === 'en' ? 'Duration' : 'Durée'}</span>
                  <span className="font-medium">{tour.duration} {locale === 'en' ? 'day' : 'jour'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nearblack/60">{locale === 'en' ? 'Group Size' : 'Taille du Groupe'}</span>
                  <span className="font-medium">Max {tour.maxGroupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nearblack/60">{locale === 'en' ? 'Deposit' : 'Acompte'}</span>
                  <span className="font-medium text-olive">${tour.depositAmount}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/${locale}/booking/${tour.slug[locale]}`}
                  className="w-full bg-terracotta hover:bg-terracotta/90 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg active:scale-95 block text-center"
                >
                  {locale === 'en' ? 'Book Now' : 'Réserver'}
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  {locale === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'}
                </a>
              </div>

              <div className="mt-4 text-center">
                <div className="text-xs text-nearblack/40">
                  {locale === 'en' 
                    ? '✓ Free cancellation up to 24h' 
                    : '✓ Annulation gratuite jusqu\'à 24h'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}