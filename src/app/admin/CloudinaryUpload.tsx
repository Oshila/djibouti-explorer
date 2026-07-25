'use client';

import { useState, useRef } from 'react';
import { cloudinaryConfig } from '@/lib/cloudinary/client';
import { 
  CloudArrowUpIcon, 
  XMarkIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface CloudinaryUploadProps {
  onUpload: (result: any) => void;
  onRemove?: (publicId: string) => void;
  existingImages?: string[];
  multiple?: boolean;
  folder?: string;
  buttonText?: string;
}

export function CloudinaryUpload({
  onUpload,
  onRemove,
  existingImages = [],
  multiple = true,
  folder = 'tours',
  buttonText = 'Upload Images',
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'tour_uploads');
      formData.append('folder', `djibouti-explorer/${folder}`);
      formData.append('api_key', cloudinaryConfig.apiKey);

      // Upload to Cloudinary via API route
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      onUpload(result);
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        continue;
      }

      uploadImage(file);
    }

    // Reset input
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;
      if (file.type.startsWith('image/')) {
        uploadImage(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          uploading ? 'border-teal bg-teal/5' : 'border-cream hover:border-teal/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple={multiple}
          className="hidden"
        />

        {uploading ? (
          <div className="py-4">
            <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-nearblack/60 mt-2">Uploading... {uploadProgress}%</p>
            <div className="w-full max-w-xs mx-auto h-2 bg-cream rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-teal transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="py-4">
            <PhotoIcon className="w-12 h-12 text-nearblack/30 mx-auto" />
            <p className="text-nearblack/60 mt-2">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-xs text-nearblack/40 mt-1">
              Supports JPG, PNG, WebP • Max 5MB
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 bg-teal hover:bg-teal/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <CloudArrowUpIcon className="w-5 h-5" />
              {buttonText}
            </button>
          </div>
        )}
      </div>

      {/* Existing Images Preview */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="relative group bg-cream rounded-lg overflow-hidden aspect-square">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(image)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}