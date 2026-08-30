'use client';

import { IMAGE_CONFIG } from './config';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  mimeType?: 'image/jpeg' | 'image/webp' | 'image/png';
}

/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * Automatically downscales dimensions while preserving aspect ratio,
 * stripping heavy metadata, and compressing to optimized WebP/JPEG.
 *
 * @param file The original File from <input type="file" />
 * @param options Compression settings (dimensions, quality, output mime)
 * @returns Promise<string> Optimized base64 Data URL
 */
export async function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<string> {
  const {
    maxWidth = IMAGE_CONFIG.productMaxDimensions.width,
    maxHeight = IMAGE_CONFIG.productMaxDimensions.height,
    quality = IMAGE_CONFIG.compressionQuality,
    mimeType = IMAGE_CONFIG.preferredMimeType,
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file'));

    reader.onload = (event) => {
      const img = new (typeof window !== 'undefined' ? window.Image : Image)();

      img.onerror = () => reject(new Error('Failed to load image for compression'));

      img.onload = () => {
        let { width, height } = img;

        // Calculate new dimensions preserving aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas context fails
          return resolve(event.target?.result as string);
        }

        // Use high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        try {
          const compressedDataUrl = canvas.toDataURL(mimeType, quality);
          resolve(compressedDataUrl);
        } catch {
          // Fallback to JPEG if WebP encoding is unsupported
          const jpegFallback = canvas.toDataURL('image/jpeg', quality);
          resolve(jpegFallback);
        }
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Batch compress an array of image files.
 */
export async function compressImageFiles(
  files: File[] | FileList,
  options: CompressionOptions = {}
): Promise<string[]> {
  const fileArray = Array.from(files);
  const compressionPromises = fileArray.map((file) => compressImageFile(file, options));
  return Promise.all(compressionPromises);
}
