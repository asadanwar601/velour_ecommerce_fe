'use client';

import React, { useState, useEffect } from 'react';
import { CloseIcon, CheckIcon, SlidersIcon } from './Icons';

export type AspectRatioPreset = '3:4' | '1:1' | '16:9' | 'free';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  initialAspectRatio?: AspectRatioPreset;
  title?: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  initialAspectRatio = '3:4',
  title = 'Crop & Frame Garment Image',
  onClose,
  onCropComplete,
}: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>(initialAspectRatio);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
      setAspectRatio(initialAspectRatio);
    }
  }, [isOpen, initialAspectRatio, imageSrc]);

  if (!isOpen || !imageSrc) return null;

  const getAspectDimensions = () => {
    switch (aspectRatio) {
      case '3:4': return { width: 270, height: 360 };
      case '1:1': return { width: 300, height: 300 };
      case '16:9': return { width: 360, height: 202 };
      default: return { width: 300, height: 300 };
    }
  };

  const { width: cropWidth, height: cropHeight } = getAspectDimensions();

  const handleApplyCrop = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropWidth * 2;
      canvas.height = cropHeight * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        onCropComplete(imageSrc);
        onClose();
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -img.width / 2 + offset.x, -img.height / 2 + offset.y);
      onCropComplete(canvas.toDataURL('image/jpeg', 0.92));
      onClose();
    };
    img.src = imageSrc;
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-[#16130f]/75 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg bg-white border border-sand-200 rounded-sm shadow-2xl p-6 space-y-5 text-xs text-neutral-800">
        <div className="flex items-center justify-between border-b border-sand-200 pb-3">
          <div className="flex items-center gap-2">
            <SlidersIcon size={18} />
            <h3 className="font-serif text-lg text-neutral-900">{title}</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Viewport Frame */}
        <div
          className="relative bg-neutral-900 rounded-sm overflow-hidden flex items-center justify-center mx-auto cursor-grab active:cursor-grabbing select-none"
          style={{ width: `${cropWidth}px`, height: `${cropHeight}px` }}
          onMouseDown={(e) => {
            setIsDragging(true);
            setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
          }}
          onMouseMove={(e) => {
            if (isDragging) setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt="Crop target"
            draggable={false}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              maxWidth: 'none',
            }}
          />
        </div>

        {/* Controls */}
        <div className="space-y-3 pt-2 border-t border-sand-200">
          <div className="flex items-center justify-between gap-4">
            <span className="uppercase tracking-wider font-semibold text-neutral-600">Zoom</span>
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-neutral-900"
            />
            <span className="font-mono text-neutral-700 w-10 text-right">{Math.round(zoom * 100)}%</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5">
              {(['3:4', '1:1', '16:9'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-3 py-1 text-[11px] font-bold uppercase rounded-sm border transition-all ${
                    aspectRatio === ratio
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-sand-50 text-neutral-600 border-sand-300'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="px-3 py-1 bg-sand-100 hover:bg-sand-200 text-neutral-800 font-semibold uppercase tracking-wider rounded-sm transition-all"
            >
              Rotate 90°
            </button>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-sand-200">
          <button
            type="button"
            onClick={handleApplyCrop}
            className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 text-white uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center justify-center gap-1.5"
          >
            <CheckIcon size={14} />
            <span>Apply Framing & Save</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 border border-sand-300 text-neutral-600 uppercase tracking-widest font-medium rounded-sm hover:bg-sand-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
