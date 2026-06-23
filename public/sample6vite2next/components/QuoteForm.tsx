'use client';
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const AUTO_MESSAGE = "I am interested in your services, i want to book a free consultation.";


export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: AUTO_MESSAGE,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 px-4 bg-white" id="quote">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
              <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
                Get Started
              </span>
            </div>
            <h2 style={{ color: "#1C2B4A" }} className="mb-4">Request Your Quote</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Fill in your details and our team will get back to you within 24 hours to arrange
              a free consultation tailored to your project.
            </p>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-xl p-8 border border-gray-100"
            style={{ backgroundColor: "#F7F8FA" }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} style={{ color: "#C9A227" }} className="mx-auto mb-4" />
                <h3 style={{ color: "#1C2B4A" }} className="mb-2">Request Sent!</h3>
                <p className="text-gray-500 text-sm">
                  Thank you, {form.name || "valued client"}. We&apos;ll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{ color: "#C9A227" }}
                  className="mt-6 text-sm underline hover:opacity-80"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#1C2B4A" }}>
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rajith Perera"
                      className="w-full px-3 py-2.5 rounded border border-gray-200 text-gray-900 bg-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: "#1C2B4A" }}>
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 rounded border border-gray-200 text-gray-900 bg-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#1C2B4A" }}>
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="w-full px-3 py-2.5 rounded border border-gray-200 text-gray-900 bg-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#1C2B4A" }}>
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2.5 rounded border border-gray-200 text-gray-900 bg-white text-sm focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
                  />
                  <p className="text-gray-400 text-xs mt-1">Pre-filled — feel free to add more details.</p>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: "#1C2B4A" }}
                  className="w-full text-white py-3 rounded hover:opacity-90 transition-opacity font-medium text-sm"
                >
                  Submit Quote Request
                </button>
                <p className="text-gray-400 text-xs text-center">
                  We&apos;ll respond within 24 hours. No commitment required.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
