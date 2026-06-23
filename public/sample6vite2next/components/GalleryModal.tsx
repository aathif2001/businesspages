"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image"

export const galleryData: Record<string, { url: string; caption: string }[]> = {
  "Ready Mix Concrete": [
    { url: "https://images.unsplash.com/photo-1527410651988-c2f385ccd3f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Transit mixer delivering on site" },
    { url: "https://images.unsplash.com/photo-1640101086894-7d70c3e70179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Concrete pour — residential foundation" },
    { url: "https://images.unsplash.com/photo-1669170930713-f7c778496177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Grade M30 concrete works" },
    { url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "High-rise structural concrete supply" },
  ],
  "Aggregate & Sand": [
    { url: "https://images.unsplash.com/photo-1680463990599-9d318aaecf71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Open-pit aggregate excavation" },
    { url: "https://images.unsplash.com/photo-1626710214966-a95bc038cf85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Certified quarry stone" },
    { url: "https://images.unsplash.com/photo-1578804376914-6d367cd21488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Heavy machinery quarry operations" },
    { url: "https://images.unsplash.com/photo-1664565262236-65166affe34a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Premium rock aggregate source" },
  ],
  "Bulk Delivery": [
    { url: "https://images.unsplash.com/photo-1653924333410-0dda83ae490c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Fleet of bulk delivery vehicles" },
    { url: "https://images.unsplash.com/photo-1671022412547-75c4cb01f47e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Dump truck on-site delivery" },
    { url: "https://images.unsplash.com/photo-1597974380476-fbf652dfe188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Multi-vehicle site operations" },
    { url: "https://images.unsplash.com/photo-1624084340915-8ef036692deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Heavy haulage logistics" },
  ],
  "Construction Tools": [
    { url: "https://images.unsplash.com/photo-1645651964715-d200ce0939cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Professional hand tools range" },
    { url: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Precision striking tools" },
    { url: "https://images.unsplash.com/photo-1606676539940-12768ce0e762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Cordless power drill selection" },
    { url: "https://images.unsplash.com/photo-1518709414768-a88981a4515d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Industrial grade power tools" },
  ],
  "Waterproofing Solutions": [
    { url: "https://images.unsplash.com/photo-1674485169641-bcb2bf6f1df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Liquid membrane spray application" },
    { url: "https://images.unsplash.com/photo-1563174499-c1a4e1aa55ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Roof waterproofing treatment" },
    { url: "https://images.unsplash.com/photo-1640476750068-72c645e653cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Flat roof sealed system" },
    { url: "https://images.unsplash.com/photo-1574693464259-4de81ffb9231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Surface sealing & coating" },
  ],
  "Building Materials": [
    { url: "https://images.unsplash.com/photo-1637241612956-b7309005288b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Brick & block warehouse stock" },
    { url: "https://images.unsplash.com/photo-1627882206813-8c1ffd86efec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Premium quality clay bricks" },
    { url: "https://images.unsplash.com/photo-1629608564457-5d74829a9e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Bulk brick supply — all grades" },
    { url: "https://images.unsplash.com/photo-1637235549935-196a9d3a88c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080", caption: "Timber & structural materials" },
  ],
};

interface GalleryModalProps {
  category: string;
  onClose: () => void;
}

export function GalleryModal({ category, onClose }: GalleryModalProps) {
  const images = galleryData[category] ?? [];
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + images.length) % images.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % images.length : null));

  return (
    <div
      className="fixed inset-0 flex flex-col z-50"
      style={{ backgroundColor: "rgba(10,18,35,0.96)", backdropFilter: "blur(6px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div>
          <p style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium mb-0.5">
            Gallery
          </p>
          <h3 className="text-white">{category}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative group rounded-lg overflow-hidden aspect-square focus:outline-none"
            >
             
              <Image
                sizes="(max-width: 768px) 50vw, 25vw"
                src={img.url}
                alt={img.caption}
                fill
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity leading-snug">
                  {img.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div
            className="max-w-3xl w-full mx-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            <Image
              src={images[lightbox].url}
              alt={images[lightbox].caption}
              width={1080}      // matches ?w=1080 in your Unsplash URLs
              height={720}      // reasonable aspect ratio estimate
              className="w-full max-h-[70vh] object-contain rounded-lg"
              style={{ height: 'auto' }}   // ← lets CSS max-h take over
              sizes="(max-width: 768px) 100vw, 896px"
            />

            <p className="text-gray-300 text-sm mt-3">{images[lightbox].caption}</p>
            <p className="text-gray-500 text-xs mt-1">
              {lightbox + 1} / {images.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
