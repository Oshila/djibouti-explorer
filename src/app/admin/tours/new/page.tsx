'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase/client';
import { collection, addDoc } from 'firebase/firestore';
import { CloudinaryUpload } from '@/app/admin/CloudinaryUpload';
import toast from 'react-hot-toast';

export default function NewTourPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [primaryImage, setPrimaryImage] = useState('');
  const [formData, setFormData] = useState({
    // English
    titleEn: '',
    slugEn: '',
    descriptionEn: '',
    shortDescriptionEn: '',
    // French
    titleFr: '',
    slugFr: '',
    descriptionFr: '',
    shortDescriptionFr: '',
    // Common
    price: '',
    depositAmount: '',
    currency: 'USD',
    duration: '',
    maxGroupSize: '',
    difficulty: 'easy',
    minAge: '',
    meetingPointEn: '',
    meetingPointFr: '',
    published: true,
    featured: false,
  });

  const handleImageUpload = (result: any) => {
    const imageUrl = result.secure_url || result.url;
    setImages(prev => [...prev, imageUrl]);
    if (!primaryImage) {
      setPrimaryImage(imageUrl);
    }
  };

  const handleImageRemove = (imageUrl: string) => {
    setImages(prev => prev.filter(url => url !== imageUrl));
    if (primaryImage === imageUrl) {
      setPrimaryImage(images.find(url => url !== imageUrl) || '');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tourData = {
        title: {
          en: formData.titleEn,
          fr: formData.titleFr
        },
        slug: {
          en: formData.slugEn || formData.titleEn.toLowerCase().replace(/ /g, '-'),
          fr: formData.slugFr || formData.titleFr.toLowerCase().replace(/ /g, '-')
        },
        description: {
          en: formData.descriptionEn,
          fr: formData.descriptionFr
        },
        shortDescription: {
          en: formData.shortDescriptionEn,
          fr: formData.shortDescriptionFr
        },
        price: parseFloat(formData.price),
        depositAmount: parseFloat(formData.depositAmount),
        currency: formData.currency,
        duration: parseInt(formData.duration),
        maxGroupSize: parseInt(formData.maxGroupSize),
        difficulty: formData.difficulty,
        minAge: parseInt(formData.minAge) || 0,
        meetingPoint: {
          en: formData.meetingPointEn,
          fr: formData.meetingPointFr
        },
        published: formData.published,
        featured: formData.featured,
        images: {
          primary: primaryImage,
          gallery: images
        },
        highlights: { en: [], fr: [] },
        itinerary: [],
        included: { en: [], fr: [] },
        excluded: { en: [], fr: [] },
        whatToBring: { en: [], fr: [] },
        accommodation: { en: '', fr: '' },
        transportation: { en: '', fr: '' },
        cancellationPolicy: { en: '', fr: '' },
        faqs: [],
        bestSeasons: [],
        categories: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'tours'), tourData);
      toast.success('Tour created successfully!');
      router.push('/admin/tours');
    } catch (error) {
      console.error('Error creating tour:', error);
      toast.error('Failed to create tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading text-teal">Add New Tour</h1>
        <p className="text-nearblack/60">Create a new tour package</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* English Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">English Content</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Title (EN) *</label>
              <input
                type="text"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Slug (EN)</label>
              <input
                type="text"
                name="slugEn"
                value={formData.slugEn}
                onChange={handleChange}
                placeholder="lake-assal-discovery"
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
              <p className="text-xs text-nearblack/40 mt-1">Leave blank to auto-generate from title</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Short Description (EN) *</label>
              <textarea
                name="shortDescriptionEn"
                value={formData.shortDescriptionEn}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Full Description (EN) *</label>
              <textarea
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Meeting Point (EN)</label>
              <input
                type="text"
                name="meetingPointEn"
                value={formData.meetingPointEn}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
            </div>
          </div>
        </div>

        {/* French Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">French Content</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Title (FR) *</label>
              <input
                type="text"
                name="titleFr"
                value={formData.titleFr}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Slug (FR)</label>
              <input
                type="text"
                name="slugFr"
                value={formData.slugFr}
                onChange={handleChange}
                placeholder="decouverte-lac-assal"
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Short Description (FR) *</label>
              <textarea
                name="shortDescriptionFr"
                value={formData.shortDescriptionFr}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Full Description (FR) *</label>
              <textarea
                name="descriptionFr"
                value={formData.descriptionFr}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Meeting Point (FR)</label>
              <input
                type="text"
                name="meetingPointFr"
                value={formData.meetingPointFr}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">Pricing & Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Price (USD) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Deposit Amount (USD) *</label>
              <input
                type="number"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Duration (days) *</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Max Group Size *</label>
              <input
                type="number"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              >
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-nearblack/70 mb-1">Min Age</label>
              <input
                type="number"
                name="minAge"
                value={formData.minAge}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-cream focus:border-teal outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">Status</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 text-teal rounded"
              />
              <span className="text-sm">Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-teal rounded"
              />
              <span className="text-sm">Featured</span>
            </label>
          </div>
        </div>

        {/* 🖼️ IMAGE UPLOAD SECTION - ADD THIS */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-heading text-teal mb-4">Tour Images</h2>
          <p className="text-sm text-nearblack/60 mb-4">
            Upload images for this tour. The first image will be the primary (featured) image.
          </p>

          <CloudinaryUpload
            onUpload={handleImageUpload}
            onRemove={handleImageRemove}
            existingImages={images}
            multiple={true}
            folder="tours"
            buttonText="Upload Tour Images"
          />

          {/* Primary Image Selection */}
          {images.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-nearblack/70 mb-2">
                Primary Image (Featured)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPrimaryImage(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      primaryImage === image
                        ? 'border-teal ring-2 ring-teal/20'
                        : 'border-transparent hover:border-teal/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {primaryImage === image && (
                      <div className="absolute inset-0 bg-teal/20 flex items-center justify-center">
                        <span className="bg-teal text-white text-xs px-2 py-1 rounded-full">
                          Primary
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Tour'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/tours')}
            className="border border-cream text-nearblack/60 px-6 py-3 rounded-lg font-medium hover:bg-cream transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}