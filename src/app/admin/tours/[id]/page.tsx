'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// ============================================
// TYPES
// ============================================
interface Tour {
  id: string;
  title: { en: string; fr: string };
  slug: { en: string; fr: string };
  shortDescription: { en: string; fr: string };
  description: { en: string; fr: string };
  price: number;
  depositType: 'fixed' | 'percentage';
  depositAmount: number;
  currency: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  minAge: number;
  destinations: string[];
  meetingPoint: { en: string; fr: string };
  images: {
    primary: string;
    gallery: string[];
  };
  highlights: { en: string[]; fr: string[] };
  itinerary: {
    day: number;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
  }[];
  included: { en: string[]; fr: string[] };
  excluded: { en: string[]; fr: string[] };
  whatToBring: { en: string[]; fr: string[] };
  accommodation: { en: string; fr: string };
  transportation: { en: string; fr: string };
  cancellationPolicy: { en: string; fr: string };
  faqs: {
    question: { en: string; fr: string };
    answer: { en: string; fr: string };
  }[];
  itineraryPdfUrl: { en: string; fr: string };
  bestSeasons: string[];
  categories: string[];
  tags: string[];
  metaTitle: { en: string; fr: string };
  metaDescription: { en: string; fr: string };
  featured: boolean;
  published: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: any;
  updatedAt: any;
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function EditTourPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'included' | 'reviews' | 'faq'>('overview');

  // Itinerary editing state
  const [editingItineraryIndex, setEditingItineraryIndex] = useState<number | null>(null);
  const [editingDay, setEditingDay] = useState<number>(1);
  const [editingTitleEn, setEditingTitleEn] = useState('');
  const [editingTitleFr, setEditingTitleFr] = useState('');
  const [editingDescriptionEn, setEditingDescriptionEn] = useState('');
  const [editingDescriptionFr, setEditingDescriptionFr] = useState('');

  // Included/Excluded editing state
  const [newIncludedEn, setNewIncludedEn] = useState('');
  const [newIncludedFr, setNewIncludedFr] = useState('');
  const [newExcludedEn, setNewExcludedEn] = useState('');
  const [newExcludedFr, setNewExcludedFr] = useState('');

  // FAQ editing state
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [editingFaqQuestionEn, setEditingFaqQuestionEn] = useState('');
  const [editingFaqQuestionFr, setEditingFaqQuestionFr] = useState('');
  const [editingFaqAnswerEn, setEditingFaqAnswerEn] = useState('');
  const [editingFaqAnswerFr, setEditingFaqAnswerFr] = useState('');

  // Load tour data
  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, 'tours', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        const tourData: Tour = {
          id: docSnap.id,
          title: data.title || { en: '', fr: '' },
          slug: data.slug || { en: '', fr: '' },
          shortDescription: data.shortDescription || { en: '', fr: '' },
          description: data.description || { en: '', fr: '' },
          price: data.price || 0,
          depositType: data.depositType || 'percentage',
          depositAmount: data.depositAmount || 20,
          currency: data.currency || 'USD',
          duration: data.duration || 1,
          maxGroupSize: data.maxGroupSize || 10,
          difficulty: data.difficulty || 'moderate',
          minAge: data.minAge || 0,
          destinations: data.destinations || [],
          meetingPoint: data.meetingPoint || { en: '', fr: '' },
          images: data.images || { primary: '', gallery: [] },
          highlights: data.highlights || { en: [], fr: [] },
          itinerary: data.itinerary || [],
          included: data.included || { en: [], fr: [] },
          excluded: data.excluded || { en: [], fr: [] },
          whatToBring: data.whatToBring || { en: [], fr: [] },
          accommodation: data.accommodation || { en: '', fr: '' },
          transportation: data.transportation || { en: '', fr: '' },
          cancellationPolicy: data.cancellationPolicy || { en: '', fr: '' },
          faqs: data.faqs || [],
          itineraryPdfUrl: data.itineraryPdfUrl || { en: '', fr: '' },
          bestSeasons: data.bestSeasons || [],
          categories: data.categories || [],
          tags: data.tags || [],
          metaTitle: data.metaTitle || { en: '', fr: '' },
          metaDescription: data.metaDescription || { en: '', fr: '' },
          featured: data.featured || false,
          published: data.published || false,
          rating: data.rating || 0,
          reviewCount: data.reviewCount || 0,
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        };
        
        setTour(tourData);
      } else {
        setError('Tour not found');
        toast.error('Tour not found');
      }
    } catch (error) {
      console.error('Error fetching tour:', error);
      setError('Failed to load tour. Please try again.');
      toast.error('Failed to load tour');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // ITINERARY FUNCTIONS
  // ============================================

  const addItineraryDay = async () => {
    if (!tour) return;
    
    const newItinerary = [
      ...tour.itinerary,
      {
        day: tour.itinerary.length + 1,
        title: { en: 'New Day', fr: 'Nouveau Jour' },
        description: { 
          en: 'Add description here', 
          fr: 'Ajouter une description ici' 
        }
      }
    ];

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        itinerary: newItinerary,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, itinerary: newItinerary });
      toast.success('Day added!');
    } catch (error) {
      console.error('Error adding day:', error);
      toast.error('Failed to add day');
    }
  };

  const startEditItinerary = (index: number) => {
    if (!tour || !tour.itinerary[index]) return;
    const item = tour.itinerary[index];
    setEditingItineraryIndex(index);
    setEditingDay(item.day || index + 1);
    setEditingTitleEn(item.title?.en || '');
    setEditingTitleFr(item.title?.fr || '');
    setEditingDescriptionEn(item.description?.en || '');
    setEditingDescriptionFr(item.description?.fr || '');
  };

  const saveItineraryEdit = async () => {
    if (!tour || editingItineraryIndex === null) return;

    const updatedItinerary = [...tour.itinerary];
    updatedItinerary[editingItineraryIndex] = {
      day: editingDay,
      title: { en: editingTitleEn, fr: editingTitleFr },
      description: { en: editingDescriptionEn, fr: editingDescriptionFr }
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        itinerary: updatedItinerary,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, itinerary: updatedItinerary });
      setEditingItineraryIndex(null);
      toast.success('Itinerary updated!');
      fetchTour();
    } catch (error) {
      console.error('Error updating itinerary:', error);
      toast.error('Failed to update itinerary');
    }
  };

  const cancelItineraryEdit = () => {
    setEditingItineraryIndex(null);
  };

  const deleteItineraryDay = async (index: number) => {
    if (!tour) return;
    if (!confirm(`Delete day ${tour.itinerary[index]?.day || index + 1}? This cannot be undone.`)) return;

    const updatedItinerary = tour.itinerary.filter((_, i) => i !== index);
    const renumbered = updatedItinerary.map((item, i) => ({
      ...item,
      day: i + 1
    }));

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        itinerary: renumbered,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, itinerary: renumbered });
      toast.success('Day deleted!');
      fetchTour();
    } catch (error) {
      console.error('Error deleting day:', error);
      toast.error('Failed to delete day');
    }
  };

  const moveItineraryDay = async (index: number, direction: 'up' | 'down') => {
    if (!tour) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= tour.itinerary.length) {
      toast.error('Cannot move further in this direction');
      return;
    }

    const updatedItinerary = [...tour.itinerary];
    const [movedItem] = updatedItinerary.splice(index, 1);
    
    if (!movedItem) {
      toast.error('Failed to move day');
      return;
    }
    
    updatedItinerary.splice(newIndex, 0, movedItem);
    
    const renumbered = updatedItinerary.map((item, i) => ({
      ...item,
      day: i + 1
    }));

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        itinerary: renumbered,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, itinerary: renumbered });
      toast.success('Day moved!');
      fetchTour();
    } catch (error) {
      console.error('Error moving day:', error);
      toast.error('Failed to move day');
    }
  };

  // ============================================
  // INCLUDED/EXCLUDED FUNCTIONS
  // ============================================

  const addIncluded = async () => {
    if (!tour || !newIncludedEn.trim()) return;
    
    const updated = {
      en: [...tour.included.en, newIncludedEn.trim()],
      fr: [...tour.included.fr, newIncludedFr.trim() || newIncludedEn.trim()]
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        included: updated,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, included: updated });
      setNewIncludedEn('');
      setNewIncludedFr('');
      toast.success('Added to included!');
    } catch (error) {
      toast.error('Failed to add');
    }
  };

  const removeIncluded = async (index: number) => {
    if (!tour) return;
    const updated = {
      en: tour.included.en.filter((_, i) => i !== index),
      fr: tour.included.fr.filter((_, i) => i !== index)
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        included: updated,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, included: updated });
      toast.success('Removed from included!');
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  const addExcluded = async () => {
    if (!tour || !newExcludedEn.trim()) return;
    
    const updated = {
      en: [...tour.excluded.en, newExcludedEn.trim()],
      fr: [...tour.excluded.fr, newExcludedFr.trim() || newExcludedEn.trim()]
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        excluded: updated,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, excluded: updated });
      setNewExcludedEn('');
      setNewExcludedFr('');
      toast.success('Added to excluded!');
    } catch (error) {
      toast.error('Failed to add');
    }
  };

  const removeExcluded = async (index: number) => {
    if (!tour) return;
    const updated = {
      en: tour.excluded.en.filter((_, i) => i !== index),
      fr: tour.excluded.fr.filter((_, i) => i !== index)
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        excluded: updated,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, excluded: updated });
      toast.success('Removed from excluded!');
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  // ============================================
  // FAQ FUNCTIONS
  // ============================================

  const addFaq = async () => {
    if (!tour) return;
    
    const newFaq = {
      question: { en: 'New Question', fr: 'Nouvelle Question' },
      answer: { en: 'Add answer here', fr: 'Ajouter une réponse ici' }
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        faqs: [...tour.faqs, newFaq],
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, faqs: [...tour.faqs, newFaq] });
      toast.success('FAQ added!');
    } catch (error) {
      toast.error('Failed to add FAQ');
    }
  };

  const startEditFaq = (index: number) => {
    if (!tour || !tour.faqs[index]) return;
    const faq = tour.faqs[index];
    setEditingFaqIndex(index);
    setEditingFaqQuestionEn(faq.question?.en || '');
    setEditingFaqQuestionFr(faq.question?.fr || '');
    setEditingFaqAnswerEn(faq.answer?.en || '');
    setEditingFaqAnswerFr(faq.answer?.fr || '');
  };

  const saveFaqEdit = async () => {
    if (!tour || editingFaqIndex === null) return;

    const updatedFaqs = [...tour.faqs];
    updatedFaqs[editingFaqIndex] = {
      question: { en: editingFaqQuestionEn, fr: editingFaqQuestionFr },
      answer: { en: editingFaqAnswerEn, fr: editingFaqAnswerFr }
    };

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        faqs: updatedFaqs,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, faqs: updatedFaqs });
      setEditingFaqIndex(null);
      toast.success('FAQ updated!');
    } catch (error) {
      toast.error('Failed to update FAQ');
    }
  };

  const cancelFaqEdit = () => {
    setEditingFaqIndex(null);
  };

  const deleteFaq = async (index: number) => {
    if (!tour) return;
    if (!confirm('Delete this FAQ?')) return;

    const updatedFaqs = tour.faqs.filter((_, i) => i !== index);

    try {
      await updateDoc(doc(db, 'tours', tour.id), {
        faqs: updatedFaqs,
        updatedAt: serverTimestamp()
      });
      setTour({ ...tour, faqs: updatedFaqs });
      toast.success('FAQ deleted!');
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  // ============================================
  // SAVE ALL CHANGES
  // ============================================

  const saveAllChanges = async () => {
    if (!tour) return;
    setSaving(true);
    try {
      const { id, ...tourData } = tour;
      await updateDoc(doc(db, 'tours', tour.id), {
        ...tourData,
        updatedAt: serverTimestamp()
      });
      toast.success('All changes saved successfully!');
      fetchTour();
    } catch (error) {
      console.error('Error saving tour:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  // 📋 OVERVIEW TAB
  const renderOverviewTab = () => {
    if (!tour) return null;

    return (
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              Title (EN) <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              value={tour.title?.en || ''}
              onChange={(e) => setTour({ ...tour, title: { ...tour.title, en: e.target.value } })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              placeholder="e.g. Lake Assal Discovery"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              Title (FR) <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              value={tour.title?.fr || ''}
              onChange={(e) => setTour({ ...tour, title: { ...tour.title, fr: e.target.value } })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              placeholder="e.g. Découverte du Lac Assal"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              Slug (EN) <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              value={tour.slug?.en || ''}
              onChange={(e) => setTour({ ...tour, slug: { ...tour.slug, en: e.target.value } })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              placeholder="e.g. lake-assal-discovery"
            />
            <p className="text-xs text-nearblack/40 mt-1">URL-friendly version of the title (lowercase, hyphens instead of spaces)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">
              Slug (FR)
            </label>
            <input
              type="text"
              value={tour.slug?.fr || ''}
              onChange={(e) => setTour({ ...tour, slug: { ...tour.slug, fr: e.target.value } })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              placeholder="e.g. decouverte-lac-assal"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1">
            Short Description (EN)
          </label>
          <textarea
            value={tour.shortDescription?.en || ''}
            onChange={(e) => setTour({ 
              ...tour, 
              shortDescription: { ...tour.shortDescription, en: e.target.value } 
            })}
            className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[60px]"
            rows={2}
            placeholder="Brief summary of the tour (used in cards and listings)"
          />
          <p className="text-xs text-nearblack/40 mt-1">
            {tour.shortDescription?.en?.length || 0}/160 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1">
            Full Description (EN)
          </label>
          <textarea
            value={tour.description?.en || ''}
            onChange={(e) => setTour({ 
              ...tour, 
              description: { ...tour.description, en: e.target.value } 
            })}
            className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[150px]"
            rows={5}
            placeholder="Detailed description of the tour experience"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-nearblack/70 mb-1">
            Full Description (FR)
          </label>
          <textarea
            value={tour.description?.fr || ''}
            onChange={(e) => setTour({ 
              ...tour, 
              description: { ...tour.description, fr: e.target.value } 
            })}
            className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[150px]"
            rows={5}
            placeholder="Description détaillée de l'expérience du circuit"
          />
        </div>

        {/* Pricing & Logistics */}
        <div className="border-t border-cream pt-6">
          <h3 className="text-md font-heading text-teal mb-4">Pricing & Logistics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                Price ($) <span className="text-terracotta">*</span>
              </label>
              <input
                type="number"
                value={tour.price || 0}
                onChange={(e) => setTour({ ...tour, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Deposit Type</label>
              <select
                value={tour.depositType || 'percentage'}
                onChange={(e) => setTour({ ...tour, depositType: e.target.value as 'fixed' | 'percentage' })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              >
                <option value="percentage">Percentage of total</option>
                <option value="fixed">Fixed amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                {tour.depositType === 'percentage' ? 'Deposit %' : 'Deposit Amount ($)'}
              </label>
              <input
                type="number"
                value={tour.depositAmount || 0}
                onChange={(e) => setTour({ ...tour, depositAmount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                step="0.01"
                min="0"
                max={tour.depositType === 'percentage' ? 100 : undefined}
              />
              {tour.depositType === 'percentage' && (
                <p className="text-xs text-nearblack/40 mt-1">
                  Customer will pay ${((tour.price || 0) * (tour.depositAmount || 0) / 100).toFixed(2)} upfront
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                Duration (days) <span className="text-terracotta">*</span>
              </label>
              <input
                type="number"
                value={tour.duration || 1}
                onChange={(e) => setTour({ ...tour, duration: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                Max Group Size
              </label>
              <input
                type="number"
                value={tour.maxGroupSize || 1}
                onChange={(e) => setTour({ ...tour, maxGroupSize: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">
                Minimum Age
              </label>
              <input
                type="number"
                value={tour.minAge || 0}
                onChange={(e) => setTour({ ...tour, minAge: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Categories & Difficulty */}
        <div className="border-t border-cream pt-6">
          <h3 className="text-md font-heading text-teal mb-4">Categories & Difficulty</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Difficulty</label>
              <select
                value={tour.difficulty || 'moderate'}
                onChange={(e) => setTour({ ...tour, difficulty: e.target.value as any })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              >
                <option value="easy">🟢 Easy</option>
                <option value="moderate">🟡 Moderate</option>
                <option value="challenging">🔴 Challenging</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Categories</label>
              <input
                type="text"
                value={tour.categories?.join(', ') || ''}
                onChange={(e) => setTour({ 
                  ...tour, 
                  categories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                placeholder="e.g. Adventure, Nature, Culture (comma separated)"
              />
              <p className="text-xs text-nearblack/40 mt-1">Comma-separated list of categories</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-nearblack/70 mb-1">Tags</label>
            <input
              type="text"
              value={tour.tags?.join(', ') || ''}
              onChange={(e) => setTour({ 
                ...tour, 
                tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              placeholder="e.g. lake, volcano, whale shark, desert (comma separated)"
            />
            <p className="text-xs text-nearblack/40 mt-1">Used for search and filtering</p>
          </div>
        </div>

        {/* Status Toggles */}
        <div className="border-t border-cream pt-6">
          <h3 className="text-md font-heading text-teal mb-4">Status</h3>
          
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tour.published || false}
                onChange={(e) => setTour({ ...tour, published: e.target.checked })}
                className="w-4 h-4 rounded border-cream text-teal focus:ring-teal"
              />
              <span className="text-sm font-medium text-nearblack/70">Published</span>
              <span className="text-xs text-nearblack/40">(Visible to customers)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tour.featured || false}
                onChange={(e) => setTour({ ...tour, featured: e.target.checked })}
                className="w-4 h-4 rounded border-cream text-teal focus:ring-teal"
              />
              <span className="text-sm font-medium text-nearblack/70">Featured</span>
              <span className="text-xs text-nearblack/40">(Shown on homepage)</span>
            </label>
          </div>
        </div>

        {/* Primary Image */}
        <div className="border-t border-cream pt-6">
          <h3 className="text-md font-heading text-teal mb-4">Primary Image</h3>
          
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-1">Image URL</label>
            <input
              type="text"
              value={tour.images?.primary || ''}
              onChange={(e) => setTour({ 
                ...tour, 
                images: { ...tour.images, primary: e.target.value } 
              })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
              placeholder="https://res.cloudinary.com/... or /images/..."
            />
            <p className="text-xs text-nearblack/40 mt-1">Upload to Cloudinary or use a direct image URL</p>
          </div>
          
          {tour.images?.primary && (
            <div className="mt-2">
              <img 
                src={tour.images.primary} 
                alt="Primary" 
                className="w-32 h-32 object-cover rounded-lg border border-cream"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // 📅 ITINERARY TAB
  const renderItineraryTab = () => {
    if (!tour) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading text-teal">Itinerary</h3>
            <p className="text-sm text-nearblack/60">Manage daily schedule for this tour</p>
            <p className="text-xs text-nearblack/40 mt-1">
              {tour.itinerary.length} days in itinerary
            </p>
          </div>
          <button
            onClick={addItineraryDay}
            className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors flex items-center gap-2 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add Day
          </button>
        </div>

        {!tour.itinerary || tour.itinerary.length === 0 ? (
          <div className="text-center py-12 bg-cream/30 rounded-xl">
            <p className="text-nearblack/40">No itinerary days yet.</p>
            <button
              onClick={addItineraryDay}
              className="mt-2 text-teal hover:text-terracotta transition-colors text-sm"
            >
              Click here to add your first day →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tour.itinerary.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 border transition-colors ${
                  editingItineraryIndex === index 
                    ? 'border-teal shadow-md' 
                    : 'border-cream hover:border-teal/20'
                }`}
              >
                {editingItineraryIndex === index ? (
                  // EDIT MODE
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-nearblack/70">
                        Day:
                        <input
                          type="number"
                          value={editingDay}
                          onChange={(e) => setEditingDay(Number(e.target.value))}
                          className="ml-2 w-16 px-2 py-1 border border-teal rounded focus:outline-none focus:ring-2 focus:ring-teal/20"
                          min="1"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-nearblack/70">Title (EN)</label>
                        <input
                          type="text"
                          value={editingTitleEn}
                          onChange={(e) => setEditingTitleEn(e.target.value)}
                          className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                          placeholder="Day title in English"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-nearblack/70">Title (FR)</label>
                        <input
                          type="text"
                          value={editingTitleFr}
                          onChange={(e) => setEditingTitleFr(e.target.value)}
                          className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                          placeholder="Day title in French"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-nearblack/70">Description (EN)</label>
                      <textarea
                        value={editingDescriptionEn}
                        onChange={(e) => setEditingDescriptionEn(e.target.value)}
                        className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[80px]"
                        placeholder="Day description in English"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-nearblack/70">Description (FR)</label>
                      <textarea
                        value={editingDescriptionFr}
                        onChange={(e) => setEditingDescriptionFr(e.target.value)}
                        className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[80px]"
                        placeholder="Day description in French"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={saveItineraryEdit}
                        className="px-4 py-2 bg-olive text-white rounded-lg hover:bg-olive/90 transition-colors flex items-center gap-2"
                      >
                        <CheckIcon className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={cancelItineraryEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // VIEW MODE
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-bold text-teal bg-teal/10 px-3 py-1 rounded-full">
                            Day {item.day || index + 1}
                          </span>
                          <h4 className="font-heading text-lg text-nearblack">
                            {item.title?.en || 'Untitled'}
                          </h4>
                          <span className="text-sm text-nearblack/40">|</span>
                          <span className="text-sm text-nearblack/60">
                            {item.title?.fr || 'Sans titre'}
                          </span>
                        </div>
                        <p className="mt-2 text-nearblack/70 text-sm whitespace-pre-wrap">
                          {item.description?.en || 'No description'}
                        </p>
                        {item.description?.fr && item.description.fr !== item.description.en && (
                          <p className="mt-1 text-nearblack/50 text-sm whitespace-pre-wrap">
                            {item.description.fr}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => moveItineraryDay(index, 'up')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                          index === 0 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-100 hover:bg-gray-200 text-nearblack'
                        }`}
                        disabled={index === 0}
                      >
                        <ChevronUpIcon className="w-3.5 h-3.5" />
                        Up
                      </button>
                      <button
                        onClick={() => moveItineraryDay(index, 'down')}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                          index === tour.itinerary.length - 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 hover:bg-gray-200 text-nearblack'
                        }`}
                        disabled={index === tour.itinerary.length - 1}
                      >
                        <ChevronDownIcon className="w-3.5 h-3.5" />
                        Down
                      </button>
                      <button
                        onClick={() => startEditItinerary(index)}
                        className="px-3 py-1.5 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItineraryDay(index)}
                        className="px-3 py-1.5 text-sm bg-terracotta text-white hover:bg-terracotta/80 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ✅ INCLUDED/EXCLUDED TAB
  const renderIncludedTab = () => {
    if (!tour) return null;

    return (
      <div className="space-y-6">
        {/* Included */}
        <div>
          <h3 className="text-lg font-heading text-olive mb-2">What's Included</h3>
          <p className="text-sm text-nearblack/60 mb-4">Items included in the tour package</p>
          
          <div className="space-y-2 mb-3">
            {(tour.included?.en || []).map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-olive/5 px-3 py-2 rounded-lg">
                <div>
                  <span className="text-sm text-nearblack">{item}</span>
                  {tour.included?.fr?.[index] && tour.included.fr[index] !== item && (
                    <span className="text-xs text-nearblack/50 ml-2">({tour.included.fr[index]})</span>
                  )}
                </div>
                <button
                  onClick={() => removeIncluded(index)}
                  className="p-1 hover:bg-terracotta/10 rounded text-terracotta transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newIncludedEn}
              onChange={(e) => setNewIncludedEn(e.target.value)}
              placeholder="Included (EN)"
              className="flex-1 px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addIncluded()}
            />
            <input
              type="text"
              value={newIncludedFr}
              onChange={(e) => setNewIncludedFr(e.target.value)}
              placeholder="Included (FR)"
              className="flex-1 px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addIncluded()}
            />
            <button
              onClick={addIncluded}
              className="px-4 py-2 bg-olive text-white rounded-lg hover:bg-olive/90 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Excluded */}
        <div className="border-t border-cream pt-6">
          <h3 className="text-lg font-heading text-terracotta mb-2">What's Not Included</h3>
          <p className="text-sm text-nearblack/60 mb-4">Items excluded from the tour package</p>
          
          <div className="space-y-2 mb-3">
            {(tour.excluded?.en || []).map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-terracotta/5 px-3 py-2 rounded-lg">
                <div>
                  <span className="text-sm text-nearblack">{item}</span>
                  {tour.excluded?.fr?.[index] && tour.excluded.fr[index] !== item && (
                    <span className="text-xs text-nearblack/50 ml-2">({tour.excluded.fr[index]})</span>
                  )}
                </div>
                <button
                  onClick={() => removeExcluded(index)}
                  className="p-1 hover:bg-terracotta/10 rounded text-terracotta transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newExcludedEn}
              onChange={(e) => setNewExcludedEn(e.target.value)}
              placeholder="Excluded (EN)"
              className="flex-1 px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addExcluded()}
            />
            <input
              type="text"
              value={newExcludedFr}
              onChange={(e) => setNewExcludedFr(e.target.value)}
              placeholder="Excluded (FR)"
              className="flex-1 px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addExcluded()}
            />
            <button
              onClick={addExcluded}
              className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ⭐ REVIEWS TAB
  const renderReviewsTab = () => {
    if (!tour) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading text-teal">Reviews</h3>
            <p className="text-sm text-nearblack/60">Manage customer reviews for this tour</p>
          </div>
          <div className="flex items-center gap-4 bg-cream/30 px-4 py-2 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{tour.rating || 0}</div>
              <div className="text-xs text-nearblack/50">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">{tour.reviewCount || 0}</div>
              <div className="text-xs text-nearblack/50">Reviews</div>
            </div>
          </div>
        </div>

        <div className="bg-cream/30 rounded-xl p-8 text-center">
          <StarIcon className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <p className="text-nearblack/60">Reviews will appear here once customers leave feedback.</p>
          <p className="text-sm text-nearblack/40 mt-1">Customers can leave reviews after completing a booking.</p>
        </div>

        {/* Placeholder for future review moderation */}
        <div className="border-t border-cream pt-4">
          <p className="text-xs text-nearblack/40">Review moderation coming soon. You'll be able to approve, reject, and respond to reviews here.</p>
        </div>
      </div>
    );
  };

  // ❓ FAQ TAB
  const renderFaqTab = () => {
    if (!tour) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading text-teal">FAQs</h3>
            <p className="text-sm text-nearblack/60">Frequently asked questions about this tour</p>
          </div>
          <button
            onClick={addFaq}
            className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors flex items-center gap-2 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add FAQ
          </button>
        </div>

        {!tour.faqs || tour.faqs.length === 0 ? (
          <div className="text-center py-8 bg-cream/30 rounded-xl">
            <p className="text-nearblack/40">No FAQs yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tour.faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 border transition-colors ${
                  editingFaqIndex === index 
                    ? 'border-teal shadow-md' 
                    : 'border-cream hover:border-teal/20'
                }`}
              >
                {editingFaqIndex === index ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium text-nearblack/70">Question (EN)</label>
                        <input
                          type="text"
                          value={editingFaqQuestionEn}
                          onChange={(e) => setEditingFaqQuestionEn(e.target.value)}
                          className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-nearblack/70">Question (FR)</label>
                        <input
                          type="text"
                          value={editingFaqQuestionFr}
                          onChange={(e) => setEditingFaqQuestionFr(e.target.value)}
                          className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-nearblack/70">Answer (EN)</label>
                      <textarea
                        value={editingFaqAnswerEn}
                        onChange={(e) => setEditingFaqAnswerEn(e.target.value)}
                        className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[60px]"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-nearblack/70">Answer (FR)</label>
                      <textarea
                        value={editingFaqAnswerFr}
                        onChange={(e) => setEditingFaqAnswerFr(e.target.value)}
                        className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[60px]"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveFaqEdit}
                        className="px-4 py-2 bg-olive text-white rounded-lg hover:bg-olive/90 transition-colors flex items-center gap-2"
                      >
                        <CheckIcon className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={cancelFaqEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-nearblack">
                          {faq.question?.en || 'Question'}
                        </h4>
                        <p className="text-sm text-nearblack/70 mt-1">
                          {faq.answer?.en || 'Answer'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => startEditFaq(index)}
                        className="px-3 py-1.5 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFaq(index)}
                        className="px-3 py-1.5 text-sm bg-terracotta text-white hover:bg-terracotta/80 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading tour...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="text-center py-12">
        <p className="text-terracotta">{error || 'Tour not found'}</p>
        <Link href="/admin/tours" className="text-teal hover:text-terracotta mt-4 inline-block">
          ← Back to tours
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/tours"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-nearblack/60" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-heading text-teal">Edit Tour</h1>
          <p className="text-sm text-nearblack/60">
            {tour.title?.en || 'Untitled'} • {tour.id}
            {tour.published && (
              <span className="ml-2 text-xs bg-olive/10 text-olive px-2 py-0.5 rounded-full">Published</span>
            )}
            {tour.featured && (
              <span className="ml-2 text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full flex items-center gap-1">
                <StarIcon className="w-3 h-3" />
                Featured
              </span>
            )}
          </p>
        </div>
        <button
          onClick={saveAllChanges}
          disabled={saving}
          className="px-6 py-2.5 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-cream pb-4">
        {[
          { id: 'overview', label: '📋 Overview' },
          { id: 'itinerary', label: '📅 Itinerary' },
          { id: 'included', label: '✅ Included' },
          { id: 'reviews', label: '⭐ Reviews' },
          { id: 'faq', label: '❓ FAQ' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-teal text-white'
                : 'bg-gray-100 text-nearblack/60 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'itinerary' && renderItineraryTab()}
        {activeTab === 'included' && renderIncludedTab()}
        {activeTab === 'reviews' && renderReviewsTab()}
        {activeTab === 'faq' && renderFaqTab()}
      </div>
    </div>
  );
}