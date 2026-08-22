'use client';

import { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, updateDoc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import { 
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  luggage: number;
  doors: number;
  pricePerDay: number;
  priceWithDriver: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  availability: boolean;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: any;
  updatedAt: any;
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditCarPage({ params }: Props) {
  const router = useRouter();
  // ⭐ Unwrap params with React.use()
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isNew = id === 'new';

  const [car, setCar] = useState<Car>({
    id: '',
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    luggage: 3,
    doors: 5,
    pricePerDay: 60,
    priceWithDriver: 100,
    image: '',
    images: [],
    description: '',
    features: [],
    availability: true,
    featured: false,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchCar();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchCar = async () => {
    try {
      console.log('Fetching car with ID:', id);
      const docRef = doc(db, 'cars', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCar({ id: docSnap.id, ...docSnap.data() } as Car);
        console.log('Car found:', docSnap.data());
      } else {
        console.log('Car not found, redirecting...');
        toast.error('Car not found');
        router.push('/admin/cars');
      }
    } catch (error) {
      console.error('Error fetching car:', error);
      toast.error('Failed to load car');
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const storageRef = ref(storage, `cars/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      if (!car.image) {
        setCar({ ...car, image: url });
      } else {
        setCar({ ...car, images: [...car.images, url] });
      }
      toast.success('Image uploaded!');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = car.images.filter((_, i) => i !== index);
    setCar({ ...car, images: newImages });
  };

  const setMainImage = (url: string) => {
    const remainingImages = car.images.filter(img => img !== url);
    setCar({ 
      ...car, 
      image: url,
      images: [url, ...remainingImages]
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setCar({ ...car, features: [...car.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setCar({ ...car, features: car.features.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    if (!car.name || !car.brand || !car.model) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const data = {
        ...car,
        updatedAt: new Date().toISOString(),
      };

      if (isNew) {
        const docRef = doc(collection(db, 'cars'));
        await setDoc(docRef, { ...data, id: docRef.id, createdAt: new Date().toISOString() });
        toast.success('Car added successfully!');
      } else {
        await updateDoc(doc(db, 'cars', id), data);
        toast.success('Car updated successfully!');
      }
      router.push('/admin/cars');
    } catch (error) {
      console.error('Error saving car:', error);
      toast.error('Failed to save car');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-nearblack/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/cars" className="p-2 hover:bg-cream rounded-lg transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-nearblack/60" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading text-teal">
            {isNew ? 'Add New Car' : 'Edit Car'}
          </h1>
          <p className="text-nearblack/60">{isNew ? 'Add a new vehicle to the fleet' : 'Update vehicle details'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Name *</label>
                <input
                  type="text"
                  value={car.name}
                  onChange={(e) => setCar({ ...car, name: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  placeholder="e.g. Toyota Land Cruiser"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Brand *</label>
                <input
                  type="text"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  placeholder="e.g. Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Model *</label>
                <input
                  type="text"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  placeholder="e.g. Land Cruiser"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Year</label>
                <input
                  type="number"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min="2000"
                  max={new Date().getFullYear() + 1}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Price Per Day ($)</label>
                <input
                  type="number"
                  value={car.pricePerDay}
                  onChange={(e) => setCar({ ...car, pricePerDay: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Price With Driver ($)</label>
                <input
                  type="number"
                  value={car.priceWithDriver}
                  onChange={(e) => setCar({ ...car, priceWithDriver: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Category</label>
                <select
                  value={car.category}
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                >
                  <option value="standard">Standard</option>
                  <option value="suv">SUV</option>
                  <option value="4x4">4x4</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Transmission</label>
                <select
                  value={car.transmission}
                  onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Fuel Type</label>
                <select
                  value={car.fuelType}
                  onChange={(e) => setCar({ ...car, fuelType: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                >
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Seats</label>
                <input
                  type="number"
                  value={car.seats}
                  onChange={(e) => setCar({ ...car, seats: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min="1"
                  max="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Luggage (bags)</label>
                <input
                  type="number"
                  value={car.luggage}
                  onChange={(e) => setCar({ ...car, luggage: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nearblack/70 mb-1">Doors</label>
                <input
                  type="number"
                  value={car.doors || 4}
                  onChange={(e) => setCar({ ...car, doors: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                  min="2"
                  max="5"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Description</h2>
            <textarea
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
              className="w-full px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none min-h-[120px]"
              placeholder="Describe the vehicle, its features, and ideal use cases..."
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Features</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-3 py-2 border border-cream rounded-lg focus:border-teal outline-none"
                placeholder="Add a feature..."
                onKeyDown={(e) => e.key === 'Enter' && addFeature()}
              />
              <button
                onClick={addFeature}
                className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-cream text-nearblack px-3 py-1.5 rounded-lg text-sm"
                >
                  {feature}
                  <button
                    onClick={() => removeFeature(index)}
                    className="hover:text-terracotta transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Images & Status */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Status</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={car.availability}
                  onChange={(e) => setCar({ ...car, availability: e.target.checked })}
                  className="w-4 h-4 rounded border-cream text-teal focus:ring-teal"
                />
                <span className="text-sm font-medium text-nearblack/70">Available</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={car.featured}
                  onChange={(e) => setCar({ ...car, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-cream text-teal focus:ring-teal"
                />
                <span className="text-sm font-medium text-nearblack/70">⭐ Featured</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-heading text-teal mb-4">Images</h2>
            
            {/* Main Image */}
            {car.image && (
              <div className="mb-4">
                <p className="text-xs text-nearblack/50 mb-1">Main Image</p>
                <div className="relative aspect-video bg-cream rounded-lg overflow-hidden">
                  <img src={car.image} alt="Main" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setCar({ ...car, image: '' })}
                    className="absolute top-2 right-2 bg-terracotta/90 text-white p-1 rounded-full hover:bg-terracotta transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Gallery Images */}
            {car.images.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-nearblack/50 mb-1">Gallery ({car.images.length})</p>
                <div className="grid grid-cols-3 gap-2">
                  {car.images.map((img, index) => (
                    <div key={index} className="relative aspect-square bg-cream rounded-lg overflow-hidden">
                      <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-terracotta/90 text-white p-0.5 rounded-full hover:bg-terracotta transition-colors"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                      {car.image !== img && (
                        <button
                          onClick={() => setMainImage(img)}
                          className="absolute bottom-1 left-1 bg-teal/90 text-white text-[10px] px-1.5 py-0.5 rounded hover:bg-teal transition-colors"
                        >
                          Set Main
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-cream hover:border-teal rounded-xl p-4 transition-colors disabled:opacity-50"
              >
                <PhotoIcon className="w-5 h-5 text-nearblack/40" />
                <span className="text-sm text-nearblack/60">
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </span>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : isNew ? 'Add Car' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}