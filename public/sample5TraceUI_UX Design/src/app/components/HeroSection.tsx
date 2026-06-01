import { ChevronRight, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative w-full py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F1C33 0%, #1C2B4A 50%, #0F1C33 100%)" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8" style={{ backgroundColor: "#C9A227" }} />
            <span style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium">
              Premium Building Materials
            </span>
          </div>

          <h1 className="text-white mb-4" style={{ fontSize: "2.5rem", lineHeight: "1.2", fontWeight: 700 }}>
            Your Trusted Source for
            <br />
            <span style={{ color: "#C9A227" }}>Quality Building</span> Supplies
          </h1>

          <p className="text-gray-300 mb-8 text-base leading-relaxed max-w-lg">
            Colombo Building Supplies has been delivering premium construction materials across
            Sri Lanka for decades. From concrete to aggregates, we power every project with
            reliability and excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              style={{ backgroundColor: "#C9A227" }}
              className="text-white px-6 py-3 rounded flex items-center gap-2 hover:opacity-90 transition-opacity font-medium"
            >
              Explore Our Products
              <ChevronRight size={16} />
            </button>
            <button className="border border-gray-500 text-white px-6 py-3 rounded hover:border-white transition-colors font-medium text-sm">
              Request a Quote
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="#C9A227" style={{ color: "#C9A227" }} />
              ))}
              <span className="text-gray-400 text-xs ml-2">4.9/5 Customer Rating</span>
            </div>
            <div className="h-4 w-px bg-gray-600" />
            <span className="text-gray-400 text-xs">208+ Projects Delivered</span>
            <div className="h-4 w-px bg-gray-600" />
            <span className="text-gray-400 text-xs">Trusted Since 1989</span>
          </div>
        </div>
      </div>
    </section>
  );
}
