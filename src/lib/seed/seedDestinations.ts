import { db } from '@/lib/firebase/client';
import { collection, doc, setDoc, getDocs, query, limit } from 'firebase/firestore';

// ⭐ All destinations with their data
const destinationsData = [
  {
    id: 'lake-assal',
    name: { en: 'Lake Assal', fr: 'Lac Assal' },
    slug: { en: 'lake-assal', fr: 'lac-assal' },
    description: { 
      en: 'Lowest point in Africa and the saltiest lake on Earth.', 
      fr: 'Point le plus bas d\'Afrique et le lac le plus salé de la Terre.' 
    },
    image: '/images/destinations/lake-assal.jpg',
    location: { lat: 11.65, lng: 42.42 },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'lac-abbe',
    name: { en: 'Lac Abbé', fr: 'Lac Abbé' },
    slug: { en: 'lac-abbe', fr: 'lac-abbe' },
    description: { 
      en: 'Otherworldly limestone chimneys in the desert.', 
      fr: 'Cheminées de calcaire d\'un autre monde dans le désert.' 
    },
    image: '/images/destinations/lac-abbe.jpeg',
    location: { lat: 11.52, lng: 41.79 },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tadjoura-gulf',
    name: { en: 'Tadjoura Gulf', fr: 'Golfe de Tadjoura' },
    slug: { en: 'tadjoura-gulf', fr: 'golfe-tadjoura' },
    description: { 
      en: 'Whale shark paradise in crystal-clear waters.', 
      fr: 'Paradis des requins-baleines dans des eaux cristallines.' 
    },
    image: '/images/destinations/tadjoura-gulf.jpg',
    location: { lat: 11.78, lng: 42.88 },
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'day-forest',
    name: { en: 'Day Forest', fr: 'Forêt du Day' },
    slug: { en: 'day-forest', fr: 'foret-day' },
    description: { 
      en: 'Unique biodiversity hotspot in the mountains.', 
      fr: 'Hotspot de biodiversité unique dans les montagnes.' 
    },
    image: '/images/destinations/day-forest.jpg',
    location: { lat: 11.53, lng: 42.55 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ardoukoba',
    name: { en: 'Ardoukoba', fr: 'Ardoukoba' },
    slug: { en: 'ardoukoba', fr: 'ardoukoba' },
    description: { 
      en: 'Active volcano in the Great Rift Valley.', 
      fr: 'Volcan actif dans la Vallée du Grand Rift.' 
    },
    image: '/images/destinations/ardoukoba.jpg',
    location: { lat: 11.55, lng: 42.05 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'djibouti-city',
    name: { en: 'Djibouti City', fr: 'Djibouti Ville' },
    slug: { en: 'djibouti-city', fr: 'djibouti-ville' },
    description: { 
      en: 'Vibrant capital with rich culture and history.', 
      fr: 'Capitale vibrante avec une riche culture et histoire.' 
    },
    image: '/images/destinations/djibouti-city.jpeg',
    location: { lat: 11.59, lng: 43.15 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'moucha-islands',
    name: { en: 'Moucha Islands', fr: 'Îles Moucha' },
    slug: { en: 'moucha-islands', fr: 'iles-moucha' },
    description: { 
      en: 'Pristine islands with white sand beaches and excellent snorkeling.', 
      fr: 'Îles préservées avec des plages de sable blanc et un excellent snorkeling.' 
    },
    image: '/images/destinations/moucha-islands.jpeg',
    location: { lat: 11.72, lng: 43.20 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'maskali-islands',
    name: { en: 'Maskali Islands', fr: 'Îles Maskali' },
    slug: { en: 'maskali-islands', fr: 'iles-maskali' },
    description: { 
      en: 'Neighboring islands to Moucha, known for calm waters and marine life.', 
      fr: 'Îles voisines de Moucha, connues pour leurs eaux calmes et leur vie marine.' 
    },
    image: '/images/destinations/maskali-islands.jpeg',
    location: { lat: 11.70, lng: 43.18 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'seven-brothers-islands',
    name: { en: 'Seven Brothers Islands', fr: 'Îles des Sept Frères' },
    slug: { en: 'seven-brothers-islands', fr: 'iles-sept-freres' },
    description: { 
      en: 'Remote archipelago with seabird colonies and untouched beaches.', 
      fr: 'Archipel isolé avec des colonies d\'oiseaux marins et des plages préservées.' 
    },
    image: '/images/destinations/seven-brothers.jpg',
    location: { lat: 11.80, lng: 43.30 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dittilou',
    name: { en: 'Dittilou', fr: 'Dittilou' },
    slug: { en: 'dittilou', fr: 'dittilou' },
    description: { 
      en: 'Mountain camp with waterfalls and green monkeys in the Goda Mountains.', 
      fr: 'Camp de montagne avec cascades et singes verts dans les Monts Goda.' 
    },
    image: '/images/destinations/dittilou.jpg',
    location: { lat: 11.53, lng: 42.55 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'allols',
    name: { en: 'Allols', fr: 'Allols' },
    slug: { en: 'allols', fr: 'allols' },
    description: { 
      en: 'Hidden coastal gem with pristine beaches and crystal-clear waters.', 
      fr: 'Joyau côtier caché avec des plages immaculées et des eaux cristallines.' 
    },
    image: '/images/destinations/allols.jpg',
    location: { lat: 11.70, lng: 43.10 },
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Seed all destinations to Firestore
 * This will add all destinations if they don't already exist
 */
export async function seedDestinations() {
  try {
    console.log('🌱 Checking if destinations exist in Firestore...');
    
    // Check if any destinations already exist
    const destQuery = query(collection(db, 'destinations'), limit(1));
    const snapshot = await getDocs(destQuery);
    
    if (!snapshot.empty) {
      console.log('✅ Destinations already exist in Firestore. Skipping seed.');
      return { success: true, message: 'Destinations already exist', seeded: 0 };
    }

    console.log('📦 Seeding destinations to Firestore...');
    let count = 0;
    
    // Add each destination
    for (const dest of destinationsData) {
      const docRef = doc(db, 'destinations', dest.id);
      await setDoc(docRef, dest);
      count++;
      console.log(`✅ Added: ${dest.name.en}`);
    }
    
    console.log(`🎉 Successfully seeded ${count} destinations!`);
    return { success: true, message: `Seeded ${count} destinations`, seeded: count };
    
  } catch (error) {
    console.error('❌ Error seeding destinations:', error);
    return { success: false, message: 'Error seeding destinations', error };
  }
}