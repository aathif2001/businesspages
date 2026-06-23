import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajith Perera",
    role: "Civil Engineer, Colombo",
    rating: 5,
    text: "Colombo Building Supplies has been our go-to for over 10 years. Their ready mix concrete quality is consistently excellent and delivery is always on time. Highly recommended.",
    initials: "RP",
  },
  {
    name: "Nimal Bandara",
    role: "Contractor, Kandy",
    rating: 5,
    text: "The team at CBS is incredibly professional. They understand our project timelines and always deliver quality materials. Their aggregate range is unmatched in the industry.",
    initials: "NB",
  },
  {
    name: "Sriyani Fernando",
    role: "Property Developer, Galle",
    rating: 5,
    text: "Exceptional service from inquiry to delivery. The billing process is transparent and their support team is always available. Will continue working with them for all future projects.",
    initials: "SF",
  },
];

export function TrustedSection() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F7F8FA" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
            <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
              Client Stories
            </span>
            <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
          </div>
          <h2 style={{ color: "#1C2B4A" }} className="mb-3">Trusted For Decades</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Hear what our long-standing clients say about working with Colombo Building Supplies.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill={s <= t.rating ? "#C9A227" : "none"}
                      style={{ color: "#C9A227" }}
                    />
                  ))}
                </div>
                <Quote size={20} style={{ color: "#C9A22740" }} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{t.text}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: "#1C2B4A" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ color: "#1C2B4A" }} className="text-sm font-semibold">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
