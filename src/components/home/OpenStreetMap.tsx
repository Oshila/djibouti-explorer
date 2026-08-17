'use client';

import { useEffect, useRef, useState } from 'react';
import { Locale } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';

// We'll import Leaflet dynamically to avoid SSR issues
let L: any = null;
let leafletLoaded = false;

const loadLeaflet = async () => {
  if (typeof window === 'undefined') return null;
  if (leafletLoaded) return L;
  
  try {
    const leafletModule = await import('leaflet');
    L = leafletModule.default;
    leafletLoaded = true;
    
    // Fix for default marker icons
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
    
    return L;
  } catch (error) {
    console.error('Failed to load Leaflet:', error);
    return null;
  }
};

interface Props {
  locale: Locale;
}

interface Destination {
  id: string;
  name: { en: string; fr: string };
  slug: { en: string; fr: string };
  lat: number;
  lng: number;
  description: { en: string; fr: string };
  image?: string;
  tourCount: number;
}

// Base destinations with coordinates (no tour counts)
const baseDestinations = [
  {
    id: 'lake-assal',
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    lat: 11.65,
    lng: 42.42,
    description: { 
      en: 'Lowest point in Africa, saltiest lake on Earth',
      fr: 'Point le plus bas d\'Afrique, lac le plus salé de la Terre'
    },
  },
  {
    id: 'lac-abbe',
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    lat: 11.52,
    lng: 41.79,
    description: { 
      en: 'Otherworldly limestone chimneys',
      fr: 'Cheminées de calcaire d\'un autre monde'
    },
  },
  {
    id: 'tadjoura-gulf',
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    lat: 11.78,
    lng: 42.88,
    description: { 
      en: 'Whale shark paradise',
      fr: 'Paradis des requins-baleines'
    },
  },
  {
    id: 'day-forest',
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    lat: 11.53,
    lng: 42.55,
    description: { 
      en: 'Unique biodiversity hotspot',
      fr: 'Hotspot de biodiversité unique'
    },
  },
  {
    id: 'moucha-island',
    name: { en: 'Moucha Island', fr: 'Île Moucha' },
    slug: { en: 'moucha-island', fr: 'ile-moucha' },
    lat: 11.72,
    lng: 43.20,
    description: { 
      en: 'Pristine beaches and snorkeling',
      fr: 'Plages immaculées et snorkeling'
    },
  },
  {
    id: 'ardoukoba',
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    lat: 11.55,
    lng: 42.05,
    description: { 
      en: 'Active volcano in the Great Rift Valley',
      fr: 'Volcan actif dans la Vallée du Grand Rift'
    },
  },
  {
    id: 'djibouti-city',
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    lat: 11.59,
    lng: 43.15,
    description: { 
      en: 'Vibrant capital with rich culture',
      fr: 'Capitale vibrante avec une riche culture'
    },
  },
  {
    id: 'maskali-islands',
    name: { en: 'Maskali Islands', fr: 'Îles Maskali' },
    slug: { en: 'maskali-islands', fr: 'iles-maskali' },
    lat: 11.70,
    lng: 43.18,
    description: { 
      en: 'Neighboring islands with calm waters and marine life',
      fr: 'Îles voisines avec eaux calmes et vie marine'
    },
  },
  {
    id: 'seven-brothers-islands',
    name: { en: 'Seven Brothers Islands', fr: 'Îles des Sept Frères' },
    slug: { en: 'seven-brothers-islands', fr: 'iles-sept-freres' },
    lat: 11.80,
    lng: 43.30,
    description: { 
      en: 'Remote archipelago with seabird colonies',
      fr: 'Archipel isolé avec colonies d\'oiseaux marins'
    },
  },
  {
    id: 'dittilou',
    name: { en: 'Dittilou', fr: 'Dittilou' },
    slug: { en: 'dittilou', fr: 'dittilou' },
    lat: 11.53,
    lng: 42.55,
    description: { 
      en: 'Mountain camp with waterfalls and green monkeys',
      fr: 'Camp de montagne avec cascades et singes verts'
    },
  },
  {
    id: 'allols',
    name: { en: 'Allols', fr: 'Allols' },
    slug: { en: 'allols', fr: 'allols' },
    lat: 11.70,
    lng: 43.10,
    description: { 
      en: 'Hidden coastal gem with pristine beaches',
      fr: 'Joyau côtier caché avec plages immaculées'
    },
  },
];

export function OpenStreetMap({ locale }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [leafletReady, setLeafletReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const content = {
    en: {
      title: 'Explore Djibouti',
      subtitle: 'Click on any marker to learn more about each destination.',
      viewTours: 'View Tours',
      close: 'Close',
      loading: 'Loading map...',
    },
    fr: {
      title: 'Explorez Djibouti',
      subtitle: 'Cliquez sur un marqueur pour en savoir plus sur chaque destination.',
      viewTours: 'Voir les Circuits',
      close: 'Fermer',
      loading: 'Chargement de la carte...',
    },
  };

  const t = content[locale];

  // Fetch tours from Firestore and calculate tour counts
  useEffect(() => {
    async function fetchDestinationsWithCounts() {
      try {
        setLoading(true);
        
        // Fetch all tours
        const toursSnapshot = await getDocs(collection(db, 'tours'));
        const tours = toursSnapshot.docs.map(doc => doc.data());

        // Calculate tour counts for each destination
        const destinationsWithCounts = baseDestinations.map((dest) => {
          const tourCount = tours.filter((tour: any) => {
            if (tour.destinations && Array.isArray(tour.destinations)) {
              return tour.destinations.some((d: string) => {
                const dLower = d.toLowerCase();
                return dLower === dest.id ||
                       dLower === dest.slug.en ||
                       dLower === dest.slug.fr ||
                       dLower === dest.name.en.toLowerCase() ||
                       dLower === dest.name.fr.toLowerCase() ||
                       dLower.includes(dest.id) ||
                       dLower.includes(dest.slug.en);
              });
            }
            if (tour.destination) {
              const dLower = tour.destination.toLowerCase();
              return dLower === dest.id ||
                     dLower === dest.slug.en ||
                     dLower === dest.slug.fr ||
                     dLower === dest.name.en.toLowerCase() ||
                     dLower === dest.name.fr.toLowerCase();
            }
            return false;
          }).length;

          return {
            ...dest,
            tourCount: tourCount,
          };
        });

        setDestinations(destinationsWithCounts);
      } catch (error) {
        console.error('Error fetching destinations with tour counts:', error);
        // Fallback: set tourCount to 0
        const destinationsWithZero = baseDestinations.map((dest) => ({
          ...dest,
          tourCount: 0,
        }));
        setDestinations(destinationsWithZero);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinationsWithCounts();
  }, []);

  // Load Leaflet on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    loadLeaflet().then((leaflet) => {
      if (leaflet) {
        setLeafletReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !leafletReady || !L || destinations.length === 0) return;

    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([11.6, 42.6], 8);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      addMarkers(map, destinations);
      setIsLoaded(true);
    };

    const timer = setTimeout(initMap, 100);
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletReady, destinations]);

  const addMarkers = (map: any, dests: Destination[]) => {
    if (!L) return;
    
    markersRef.current.forEach((marker: any) => marker.remove());
    markersRef.current = [];

    const createIcon = () => {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: #C0532C;
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid white;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 16px;
            ">📍</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });
    };

    dests.forEach((dest) => {
      const popupContent = `
        <div style="padding: 8px; max-width: 240px; font-family: Inter, sans-serif;">
          <h3 style="font-family: 'Playfair Display', serif; color: #1E3D47; font-size: 16px; margin: 0 0 4px 0;">
            ${dest.name[locale]}
          </h3>
          <p style="color: #141414; font-size: 13px; margin: 0 0 8px 0;">
            ${dest.description[locale]}
          </p>
          ${dest.tourCount !== undefined ? `<p style="color: #72803A; font-size: 12px; margin: 0;">${dest.tourCount} ${locale === 'en' ? 'tours available' : 'circuits disponibles'}</p>` : ''}
          <a href="/${locale}/destinations/${dest.slug[locale]}" 
             style="display: inline-block; margin-top: 8px; background: #C0532C; color: white; padding: 4px 14px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500;">
            ${t.viewTours}
          </a>
        </div>
      `;

      const marker = L.marker([dest.lat, dest.lng], { icon: createIcon() })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 260 });

      marker.on('click', () => {
        setSelectedDestination(dest);
      });

      markersRef.current.push(marker);
    });
  };

  // Update markers when destinations change
  useEffect(() => {
    if (mapInstanceRef.current && destinations.length > 0 && leafletReady) {
      addMarkers(mapInstanceRef.current, destinations);
    }
  }, [destinations, locale, leafletReady]);

  if (loading) {
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
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full h-[500px] bg-cream flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-nearblack/60">{t.loading}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            style={{ zIndex: 1 }}
          />
          
          {/* Loading overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-cream/80 z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-nearblack/60">{t.loading}</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section - CTA + Quick Links */}
        <div className="mt-6 space-y-4">
          <div className="bg-gradient-to-r from-teal/5 to-cream rounded-2xl p-4 sm:p-6 text-center border border-teal/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-3xl">🗺️</div>
              <div>
                <h3 className="font-heading text-teal text-base sm:text-lg">
                  {locale === 'en' ? 'Click a Pin to Explore' : 'Cliquez sur une Épingle pour Explorer'}
                </h3>
                <p className="text-xs sm:text-sm text-nearblack/60">
                  {locale === 'en' 
                    ? 'Each marker shows tours available at that destination.' 
                    : 'Chaque marqueur montre les circuits disponibles à cette destination.'}
                </p>
              </div>
              <a
                href={`/${locale}/destinations`}
                className="bg-terracotta hover:bg-terracotta/90 text-white px-5 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap"
              >
                {locale === 'en' ? 'All Destinations →' : 'Toutes les Destinations →'}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {destinations.map((dest) => (
              <a
                key={dest.id}
                href={`/${locale}/destinations/${dest.slug[locale]}`}
                className="inline-flex items-center gap-1.5 bg-cream hover:bg-teal/10 text-nearblack hover:text-teal transition-colors px-3 py-1.5 rounded-full text-xs sm:text-sm"
              >
                <span>📍</span>
                {dest.name[locale]}
                <span className="text-xs text-nearblack/40">({dest.tourCount})</span>
              </a>
            ))}
          </div>
        </div>

        {/* Selected Destination Modal (Mobile) */}
        {selectedDestination && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in lg:hidden">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
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