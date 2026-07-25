// This uses Firebase REST API - works perfectly on Vercel
export async function fetchToursFromFirebase() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  
  if (!projectId || !apiKey) {
    console.error('Missing Firebase config');
    return [];
  }
  
  try {
    // Firebase REST API endpoint
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/tours`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Firebase REST API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.documents) {
      return [];
    }
    
    // Parse the REST API response
    const tours = data.documents.map((doc: any) => {
      const fields = doc.fields || {};
      
      // Helper to extract value from Firestore field
      const getValue = (field: any) => {
        if (!field) return undefined;
        if (field.stringValue !== undefined) return field.stringValue;
        if (field.integerValue !== undefined) return parseInt(field.integerValue);
        if (field.doubleValue !== undefined) return parseFloat(field.doubleValue);
        if (field.booleanValue !== undefined) return field.booleanValue;
        if (field.mapValue) return getMapValue(field.mapValue);
        if (field.arrayValue) return getArrayValue(field.arrayValue);
        if (field.timestampValue) return field.timestampValue;
        if (field.nullValue !== undefined) return null;
        return field;
      };
      
      const getMapValue = (map: any) => {
        if (!map || !map.fields) return {};
        const result: any = {};
        for (const key in map.fields) {
          result[key] = getValue(map.fields[key]);
        }
        return result;
      };
      
      const getArrayValue = (array: any) => {
        if (!array || !array.values) return [];
        return array.values.map((v: any) => getValue(v));
      };
      
      // Extract all fields
      const title = getValue(fields.title);
      const slug = getValue(fields.slug);
      const shortDescription = getValue(fields.shortDescription);
      const description = getValue(fields.description);
      const meetingPoint = getValue(fields.meetingPoint);
      const images = getValue(fields.images);
      const highlights = getValue(fields.highlights);
      const itinerary = getValue(fields.itinerary);
      const included = getValue(fields.included);
      const excluded = getValue(fields.excluded);
      const whatToBring = getValue(fields.whatToBring);
      const accommodation = getValue(fields.accommodation);
      const transportation = getValue(fields.transportation);
      const cancellationPolicy = getValue(fields.cancellationPolicy);
      const faqs = getValue(fields.faqs);
      const itineraryPdfUrl = getValue(fields.itineraryPdfUrl);
      const metaTitle = getValue(fields.metaTitle);
      const metaDescription = getValue(fields.metaDescription);
      const bestSeasons = getValue(fields.bestSeasons);
      const categories = getValue(fields.categories);
      const tags = getValue(fields.tags);
      
      return {
        id: doc.name.split('/').pop(),
        title: title || { en: '', fr: '' },
        slug: slug || { en: '', fr: '' },
        shortDescription: shortDescription || { en: '', fr: '' },
        description: description || { en: '', fr: '' },
        price: getValue(fields.price) || 0,
        depositAmount: getValue(fields.depositAmount) || 0,
        currency: getValue(fields.currency) || 'USD',
        duration: getValue(fields.duration) || 1,
        maxGroupSize: getValue(fields.maxGroupSize) || 8,
        difficulty: getValue(fields.difficulty) || 'easy',
        minAge: getValue(fields.minAge) || 0,
        meetingPoint: meetingPoint || { en: '', fr: '' },
        images: images || { primary: '', gallery: [] },
        highlights: highlights || { en: [], fr: [] },
        itinerary: itinerary || [],
        included: included || { en: [], fr: [] },
        excluded: excluded || { en: [], fr: [] },
        whatToBring: whatToBring || { en: [], fr: [] },
        accommodation: accommodation || { en: '', fr: '' },
        transportation: transportation || { en: '', fr: '' },
        cancellationPolicy: cancellationPolicy || { en: '', fr: '' },
        faqs: faqs || [],
        itineraryPdfUrl: itineraryPdfUrl || { en: '', fr: '' },
        bestSeasons: bestSeasons || [],
        categories: categories || [],
        tags: tags || [],
        metaTitle: metaTitle || { en: '', fr: '' },
        metaDescription: metaDescription || { en: '', fr: '' },
        rating: getValue(fields.rating) || 0,
        reviewCount: getValue(fields.reviewCount) || 0,
        featured: getValue(fields.featured) || false,
        published: getValue(fields.published) || false,
        createdAt: getValue(fields.createdAt) || new Date().toISOString(),
        updatedAt: getValue(fields.updatedAt) || new Date().toISOString(),
      };
    });
    
    return tours;
  } catch (error) {
    console.error('❌ Firebase REST API error:', error);
    return [];
  }
}