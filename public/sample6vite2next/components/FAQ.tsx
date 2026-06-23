"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What types of concrete mixes do you offer?",
    a: "We offer a full range of ready mix concrete grades from M15 to M50, suitable for foundations, slabs, columns, beams, and high-strength structural applications. Custom mixes are available on request.",
  },
  {
    q: "Do you provide island-wide delivery?",
    a: "Yes, we deliver across all provinces in Sri Lanka. Our modern fleet of transit mixers and delivery trucks ensures timely and safe delivery to your project site, regardless of location.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Our minimum order for ready mix concrete is 3 cubic meters. For aggregates and building materials, minimum orders vary by product. Contact our sales team for specific requirements.",
  },
  {
    q: "How do I place a bulk order?",
    a: "You can place a bulk order by submitting a quote request through our website, calling our sales team directly, or visiting one of our branches. A dedicated account manager will assist you throughout the process.",
  },
  {
    q: "Are your materials quality certified?",
    a: "All our products meet Sri Lanka Standards Institution (SLSI) requirements. Our concrete mixes are tested at certified laboratories, and we maintain full quality documentation for every batch.",
  },
  {
    q: "Do you offer credit terms for contractors?",
    a: "Yes, we offer credit facilities for registered contractors and regular clients. Please contact our accounts team with your business registration details to apply for a credit account.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F7F8FA" }} id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
            <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
              FAQ
            </span>
            <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
          </div>
          <h2 style={{ color: "#1C2B4A" }} className="mb-3">Common Questions</h2>
          <p className="text-gray-500 text-sm">
            Everything you need to know before placing your order.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border overflow-hidden"
              style={{ borderColor: open === i ? "#C9A227" : "#e5e7eb" }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span style={{ color: "#1C2B4A" }} className="text-sm font-medium pr-4">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "#C9A227",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
