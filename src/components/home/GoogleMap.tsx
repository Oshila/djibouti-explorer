'use client';

import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  locale: Locale;
  destinations?: Destination[];
}

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  lat: number;
  lng: number;
  description: { en: string; fr: string };
  image?: string;
  tourCount?: number;
}

// Default destinations
const defaultDestinations: Destination[] = [
  {
    id: '1',
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    lat: 11.65,
    lng: 42.42,
    description: { 
      en: 'Lowest point in Africa, saltiest lake on Earth',
      fr: 'Point le plus bas d\'Afrique, lac le plus salé de la Terre'
    },
    image: '',
    tourCount: 8,
  },
  {
    id: '2',
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    lat: 11.52,
    lng: 41.79,
    description: { 
      en: 'Otherworldly limestone chimneys',
      fr: 'Cheminées de calcaire d\'un autre monde'
    },
    image: '',
    tourCount: 6,
  },
  {
    id: '3',
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    lat: 11.78,
    lng: 42.88,
    description: { 
      en: 'Whale shark paradise',
      fr: 'Paradis des requins-baleines'
    },
    image: '',
    tourCount: 5,
  },
  {
    id: '4',
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    lat: 11.53,
    lng: 42.55,
    description: { 
      en: 'Unique biodiversity hotspot',
      fr: 'Hotspot de biodiversité unique'
    },
    image: '',
    tourCount: 4,
  },
  {
    id: '5',
    name: { en: 'Moucha Island', fr: 'Île Moucha' },
    slug: { en: 'moucha-island', fr: 'ile-moucha' },
    lat: 11.72,
    lng: 43.20,
    description: { 
      en: 'Pristine beaches and snorkeling',
      fr: 'Plages immaculées et snorkeling'
    },
    image: '',
    tourCount: 3,
  },
  {
    id: '6',
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    lat: 11.55,
    lng: 42.05,
    description: { 
      en: 'Active volcano in the Great Rift Valley',
      fr: 'Volcan actif dans la Vallée du Grand Rift'
    },
    image: '',
    tourCount: 3,
  },
  {
    id: '7',
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    lat: 11.59,
    lng: 43.15,
    description: { 
      en: 'Vibrant capital with rich culture',
      fr: 'Capitale vibrante avec une riche culture'
    },
    image: '',
    tourCount: 2,
  },
];

declare global {
  interface Window {
    google: any;
  }
}

export function GoogleMap({ locale, destinations = defaultDestinations }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const content = {
    en: {
      title: 'Explore Djibouti',
      subtitle: 'Click on any marker to learn more about each destination.',
      viewTours: 'View Tours',
      close: 'Close',
    },
    fr: {
      title: 'Explorez Djibouti',
      subtitle: 'Cliquez sur un marqueur pour en savoir plus sur chaque destination.',
      viewTours: 'Voir les Circuits',
      close: 'Fermer',
    },
  };

  const t = content[locale];

  // Load Google Maps script
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Google Maps API key not found');
      return;
    }

    // Check if script already exists
    if (document.getElementById('google-maps-script')) {
      if (window.google) {
        initMap();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    
    script.addEventListener('load', initMap);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      markers.forEach(marker => marker.setMap(null));
      if (infoWindow) infoWindow.close();
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    const center = { lat: 11.6, lng: 42.6 };

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 8,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#1E3D47' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#D4E4ED' }],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#F2E8D4' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#E5DCC8' }],
        },
      ],
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    setMap(mapInstance);
    setInfoWindow(new window.google.maps.InfoWindow());

    // Add markers
    addMarkers(mapInstance, destinations);
    setIsLoaded(true);
  };

  const addMarkers = (mapInstance: any, dests: Destination[]) => {
    const newMarkers: any[] = [];
    const infoWin = new window.google.maps.InfoWindow();

    dests.forEach((dest) => {
      // Create custom marker icon
      const icon = {
        url: `data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#C0532C;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#8B3A1F;stop-opacity:1" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
              </filter>
            </defs>
            <path d="M20 0 C9 0 0 9 0 20 C0 31 20 50 20 50 C20 50 40 31 40 20 C40 9 31 0 20 0Z" fill="url(#grad)" filter="url(#shadow)"/>
            <circle cx="20" cy="20" r="7" fill="white" opacity="0.9"/>
            <circle cx="20" cy="20" r="4" fill="#C0532C"/>
          </svg>
        `)}`,
        scaledSize: new window.google.maps.Size(40, 50),
      };

      const marker = new window.google.maps.Marker({
        position: { lat: dest.lat, lng: dest.lng },
        map: mapInstance,
        icon: icon,
        title: dest.name[locale],
        animation: window.google.maps.Animation.DROP,
      });

      // Create info window content
      const contentString = `
        <div style="padding: 12px; max-width: 250px; font-family: Inter, sans-serif;">
          ${dest.image ? `<img src="${dest.image}" alt="${dest.name[locale]}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
          <h3 style="font-family: 'Playfair Display', serif; color: #1E3D47; font-size: 18px; margin: 0 0 4px 0;">${dest.name[locale]}</h3>
          <p style="color: #141414; font-size: 14px; margin: 0 0 8px 0;">${dest.description[locale]}</p>
          ${dest.tourCount ? `<p style="color: #72803A; font-size: 12px; margin: 0;">${dest.tourCount} tours available</p>` : ''}
          <a href="/${locale}/destinations/${dest.slug[locale]}" 
             style="display: inline-block; margin-top: 8px; background: #C0532C; color: white; padding: 6px 16px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            ${t.viewTours}
          </a>
        </div>
      `;

      marker.addListener('click', () => {
        infoWin.setContent(contentString);
        infoWin.open(mapInstance, marker);
        setSelectedDestination(dest);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  // Update markers when destinations change
  useEffect(() => {
    if (map && destinations.length > 0) {
      // Clear old markers
      markers.forEach(marker => marker.setMap(null));
      // Add new markers
      addMarkers(map, destinations);
    }
  }, [destinations, map, locale]);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
            {locale === 'en' ? 'Interactive Map' : 'Carte Interactive'}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-teal mt-2 mb-4">
            {t.title}
          </h2>
          <p className="text-nearblack/70 text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div 
            ref={mapRef} 
            className="w-full h-[500px] bg-cream"
          />
          
          {/* Loading overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream/80">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-nearblack/60">
                  {locale === 'en' ? 'Loading map...' : 'Chargement de la carte...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Destination Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => {
                // Find and click the corresponding marker
                const marker = markers.find(m => {
                  const pos = m.getPosition();
                  return pos.lat() === dest.lat && pos.lng() === dest.lng;
                });
                if (marker) {
                  window.google.maps.event.trigger(marker, 'click');
                }
              }}
              className="flex items-center gap-2 p-2 bg-cream hover:bg-teal/10 rounded-lg transition-colors text-left text-sm"
            >
              {dest.image ? (
                <img src={dest.image} alt="" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center text-xs">
                  📍
                </div>
              )}
              <span className="text-nearblack/80 hover:text-teal transition-colors">
                {dest.name[locale]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Destination Modal (Mobile/Alternative) */}
        {selectedDestination && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in lg:hidden">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  {selectedDestination.image && (
                    <img
                      src={selectedDestination.image}
                      alt={selectedDestination.name[locale]}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="text-2xl font-heading text-teal">
                    {selectedDestination.name[locale]}
                  </h3>
                  <p className="text-nearblack/60 text-sm mt-1">
                    {selectedDestination.description[locale]}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex gap-3 mt-4">
                <a
                  href={`/${locale}/destinations/${selectedDestination.slug[locale]}`}
                  className="flex-1 bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium text-center transition"
                >
                  {t.viewTours}
                </a>
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 border border-cream text-nearblack/60 px-4 py-2 rounded-lg font-medium hover:bg-cream transition"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}