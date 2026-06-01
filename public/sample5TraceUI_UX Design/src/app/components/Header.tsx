import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = ["About", "Products", "Services", "Projects", "Contact"];

  return (
    <header style={{ backgroundColor: "#1C2B4A" }} className="w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{
                background: "#C9A227",
                clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              }}
            >
              <span className="text-white font-bold text-sm">CBS</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-semibold text-sm tracking-wide">Colombo Building</div>
              <div style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase">Supplies</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Phone size={14} style={{ color: "#C9A227" }} />
              <span>+94 11 234 5678</span>
            </div>
            <button
              style={{ backgroundColor: "#C9A227" }}
              className="text-white text-sm px-4 py-2 rounded hover:opacity-90 transition-opacity font-medium"
            >
              Message
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: "#1C2B4A" }} className="md:hidden border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link} href="#" className="block text-gray-300 hover:text-white text-sm py-1">
              {link}
            </a>
          ))}
          <div className="flex items-center gap-2 text-gray-300 text-sm pt-2">
            <Phone size={14} style={{ color: "#C9A227" }} />
            <span>+94 11 234 5678</span>
          </div>
          <button
            style={{ backgroundColor: "#C9A227" }}
            className="text-white text-sm px-4 py-2 rounded w-full font-medium"
          >
            Message
          </button>
        </div>
      )}
    </header>
  );
}
