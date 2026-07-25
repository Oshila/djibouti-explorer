'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Locale } from '@/types';
import { 
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Props {
  locale: Locale;
  tours: any[];
}

export function FeaturedToursCarousel({ locale, tours }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Safety check - ensure tours is an array and filter out invalid ones
  const safeTours = Array.isArray(tours) ? tours.filter(tour => {
    // Check if tour has required fields
    return tour && 
           tour.title && 
           tour.title.en && 
           tour.title.fr &&
           tour.slug &&
           tour.slug.en &&
           tour.slug.fr &&
           tour.price !== undefined;
  }) : [];
  
  // Show featured tours first, but if none exist, show all valid tours
  const featuredTours = safeTours.filter((t: any) => t.featured === true);
  const displayTours = featuredTours.length > 0 ? featuredTours : safeTours;
  
  const totalSlides = displayTours.length;

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (totalSlides === 0 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }
  };

  const goToPrev = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  // If no tours at all, show the "no tours" message
  if (totalSlides === 0) {
    return (
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
              {locale === 'en' ? 'Explore Our Tours' : 'Explorez Nos Circuits'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
              {locale === 'en' ? 'Featured Experiences' : 'Expériences Vedettes'}
            </h2>
            <p className="text-nearblack/70">
              {locale === 'en' ? 'No tours available yet. Check back soon!' : 'Aucun circuit disponible pour le moment. Revenez bientôt !'}
            </p>
            <Link
              href={`/${locale}/admin/tours`}
              className="mt-4 inline-block text-teal hover:text-terracotta transition-colors text-sm"
            >
              {locale === 'en' ? 'Manage Tours →' : 'Gérer les Circuits →'}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentTour = displayTours[currentIndex];

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="max-w-2xl">
            <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
              {locale === 'en' ? 'Explore Our Tours' : 'Explorez Nos Circuits'}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
              {locale === 'en' ? 'Featured Experiences' : 'Expériences Vedettes'}
            </h2>
            <p className="text-nearblack/70 text-lg">
              {locale === 'en' 
                ? 'Discover our most popular tours, handpicked by local experts.' 
                : 'Découvrez nos circuits les plus populaires, sélectionnés par des experts locaux.'}
            </p>
          </div>
          <Link
            href={`/${locale}/tours`}
            className="group flex items-center gap-2 text-teal hover:text-terracotta font-medium transition-colors mt-4 md:mt-0"
          >
            <span>{locale === 'en' ? 'View All Tours' : 'Voir Tous les Circuits'}</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel */}
        <div 
          className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Slide */}
          <div className="relative">
            <Link
              href={`/${locale}/tours/${currentTour.slug[locale]}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-2/5 h-56 sm:h-64 md:h-80 bg-gradient-to-br from-teal/20 to-terracotta/20 overflow-hidden">
                  {currentTour.images?.primary ? (
                    <img
                      src={currentTour.images.primary}
                      alt={currentTour.title?.[locale] || currentTour.title?.en || 'Tour'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl">
                      <svg className="w-16 h-16 md:w-24 md:h-24 text-teal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3.055 11.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M3.055 11.5a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z M12 3.055a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0-4.5 4.5 4.5 4.5 0 0 0-4.5-4.5z M12 3.055a4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 4.5 4.5 4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 md:gap-2">
                    {currentTour.categories?.slice(0, 2).map((cat: string) => (
                      <span key={cat} className="bg-white/90 backdrop-blur-sm text-teal text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 md:gap-1 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                    <StarSolidIcon className="w-3 h-3 md:w-4 md:h-4 text-ochre" />
                    <span className="text-xs md:text-sm font-medium text-nearblack">{currentTour.rating || 4.9}</span>
                    <span className="text-[10px] md:text-xs text-nearblack/50">({currentTour.reviewCount || 0})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-5 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-nearblack/50 mb-2">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{currentTour.duration || 1} {locale === 'en' ? 'day' : 'jour'}</span>
                      </div>
                      <span className="w-1 h-1 bg-nearblack/20 rounded-full hidden sm:block" />
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Max {currentTour.maxGroupSize || 8}</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-teal group-hover:text-terracotta transition-colors mb-2 line-clamp-2">
                      {currentTour.title?.[locale] || currentTour.title?.en || 'Tour'}
                    </h3>
                    <p className="text-nearblack/70 text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {currentTour.shortDescription?.[locale] || currentTour.shortDescription?.en || ''}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 sm:pt-4 border-t border-cream">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-teal">${currentTour.price || 0}</span>
                      <span className="text-nearblack/50 text-xs sm:text-sm ml-1">/ {locale === 'en' ? 'person' : 'personne'}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-ochre font-medium">
                        {locale === 'en' ? 'Book Now →' : 'Réserver →'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && !isMobile && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-nearblack p-2 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-nearblack p-2 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Next"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
              {displayTours.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 md:h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-teal w-4 sm:w-6 md:w-8'
                      : 'bg-white/60 hover:bg-white/80 w-1.5 md:w-2.5'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress/Count */}
        {totalSlides > 1 && !isMobile && (
          <div className="text-center text-sm text-nearblack/40 mt-4">
            {currentIndex + 1} / {totalSlides}
          </div>
        )}
      </div>
    </section>
  );
}