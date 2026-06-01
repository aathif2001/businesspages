import { Layers, Mountain, Truck, Hammer, Droplets, Package, Eye, Download } from "lucide-react";
import { useState } from "react";
import { GalleryModal } from "./GalleryModal";

const offerings = [
  {
    icon: Layers,
    title: "Ready Mix Concrete",
    description:
      "High-grade ready mix concrete tailored for residential, commercial, and industrial construction needs.",
    tag: "Most Popular",
  },
  {
    icon: Mountain,
    title: "Aggregate & Sand",
    description:
      "Premium quality aggregates and construction sand sourced from certified quarries across the island.",
    tag: null,
  },
  {
    icon: Truck,
    title: "Bulk Delivery",
    description:
      "Reliable on-time bulk delivery services with a modern fleet to your construction site anywhere in Sri Lanka.",
    tag: null,
  },
  {
    icon: Hammer,
    title: "Construction Tools",
    description:
      "A comprehensive range of professional construction tools and equipment for every stage of your project.",
    tag: null,
  },
  {
    icon: Droplets,
    title: "Waterproofing Solutions",
    description:
      "Advanced waterproofing products and solutions to protect your structures from moisture and weather damage.",
    tag: null,
  },
  {
    icon: Package,
    title: "Building Materials",
    description:
      "Full range of bricks, blocks, tiles, steel, and finishing materials from trusted local and international brands.",
    tag: null,
  },
];

export function CoreOfferings() {
  const [galleryCategory, setGalleryCategory] = useState<string | null>(null);

  return (
    <>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
              <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
                What We Offer
              </span>
              <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
            </div>
            <h2 style={{ color: "#1C2B4A" }} className="mb-3">Our Core Offerings</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Everything you need for a successful construction project, delivered with precision and care.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="relative border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow group flex flex-col"
                  style={{ backgroundColor: "#FAFAFA" }}
                >
                  {item.tag && (
                    <span
                      className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "#C9A227" }}
                    >
                      {item.tag}
                    </span>
                  )}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: "#1C2B4A" }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 style={{ color: "#1C2B4A" }} className="mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{item.description}</p>

                  {/* CTA buttons */}
                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => setGalleryCategory(item.title)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-semibold border transition-all hover:shadow-sm active:scale-95"
                      style={{ borderColor: "#1C2B4A", color: "#1C2B4A", backgroundColor: "transparent" }}
                    >
                      <Eye size={13} />
                      View
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: "#C9A227" }}
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "#";
                        link.download = `${item.title.replace(/\s+/g, "_")}_Pricing.pdf`;
                        link.click();
                      }}
                    >
                      <Download size={13} />
                      Download Pricing
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {galleryCategory && (
        <GalleryModal
          category={galleryCategory}
          onClose={() => setGalleryCategory(null)}
        />
      )}
    </>
  );
}
