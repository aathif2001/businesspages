'use client';
import { useState } from "react";
import { PaymentModal } from "./PaymentModal";
import { ChevronRight } from "lucide-react";

const paymentMethods = [
  {
    name: "Bank Transfer",
    sub: "SWIFT / SLIPS",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    name: "Google Pay",
    sub: "GPay",
    icon: (
      <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none">
        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.4-.1-2.7-.5-4z" fill="#FFC107"/>
        <path d="M6.3 14.7l7 5.1C15.2 16.4 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00"/>
        <path d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.5C29.6 35.9 26.9 37 24 37c-6.1 0-10.7-3.1-11.8-8.5H4.4C7.7 39.9 15.2 45 24 45z" fill="#4CAF50"/>
        <path d="M44.5 20H24v8.5h11.8c-.6 2.7-2.3 5-4.8 6.5l6.6 5.5C41.4 37.5 45 31.3 45 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
      </svg>
    ),
  },
  {
    name: "Visa / Mastercard",
    sub: "Debit & Credit",
    icon: (
      <svg viewBox="0 0 48 32" className="w-6 h-4" fill="none">
        <rect width="48" height="32" rx="4" fill="#1A1F71"/>
        <text x="5" y="22" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">VISA</text>
        <circle cx="33" cy="16" r="8" fill="#EB001B" opacity="0.9"/>
        <circle cx="41" cy="16" r="8" fill="#F79E1B" opacity="0.9"/>
        <path d="M37 10.4a8 8 0 010 11.2 8 8 0 010-11.2z" fill="#FF5F00"/>
      </svg>
    ),
  },
  {
    name: "Apple Pay",
    sub: "iOS & Safari",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
  },
  {
    name: "Cheque",
    sub: "Account holders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M6 9h4M6 13h8"/>
      </svg>
    ),
  },
  {
    name: "Cash",
    sub: "On delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <circle cx="12" cy="14" r="2"/>
      </svg>
    ),
  },
  {
    name: "Credit Account",
    sub: "30-day terms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M9 12l2 2 4-4"/>
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    name: "Online Banking",
    sub: "Internet banking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
  },
];

export function BillingSection() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  return (
    <>
      <section className="py-20 px-4 bg-white" id="billing">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
                <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
                  Billing
                </span>
              </div>
              <h2 style={{ color: "#1C2B4A" }} className="mb-4">Billing Information</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                We offer flexible and transparent payment options to suit your project needs.
                All invoices are issued with full itemization and VAT breakdown.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-400 text-xs">
                  For billing inquiries, contact{" "}
                  <span style={{ color: "#C9A227" }} className="font-medium">accounts@colombobs.lk</span>
                  {" "}or call{" "}
                  <span style={{ color: "#C9A227" }} className="font-medium">+94 11 234 5678</span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div
              className="rounded-xl p-8 border border-gray-100"
              style={{ backgroundColor: "#F7F8FA" }}
            >
              <h3 style={{ color: "#1C2B4A" }} className="mb-1">Accepted Payment Methods</h3>
              <p className="text-gray-400 text-sm mb-5">
                Tap any method to view payment details.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.name}
                    onClick={() => setActiveMethod(method.name)}
                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-gray-100 hover:border-[#C9A227] hover:shadow-sm transition-all text-left group"
                  >
                    <div style={{ color: "#1C2B4A" }} className="shrink-0">
                      {method.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate" style={{ color: "#1C2B4A" }}>
                        {method.name}
                      </div>
                      <div className="text-gray-400 text-xs">{method.sub}</div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#C9A227" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeMethod && (
        <PaymentModal method={activeMethod} onClose={() => setActiveMethod(null)} />
      )}
    </>
  );
}

