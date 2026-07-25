'use client';

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'tour_uploads',
};

export const getCloudinaryUrl = (publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
}) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  
  if (!options) {
    return `${baseUrl}/${publicId}`;
  }

  const transformations = [];
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);

  const transformString = transformations.join(',');
  return `${baseUrl}/${transformString}/${publicId}`;
};