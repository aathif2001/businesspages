import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export function Footer() {

  const footerItems = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#products" },
    { label: "Trust", href: "#stats" },
    { label: "Quote", href: "#quote", highlight: true },
    { label: "FAQ", href: "#faq" },
    { label: "Payment", href: "#billing" },
  ];

  const products = [
    "Ready Mix Concrete",
    "Aggregate & Sand",
    "Building Materials",
    "Waterproofing",
    "Tools & Equipment",
  ];

  return (
    <footer style={{ backgroundColor: "#0F1C33" }} className="text-gray-300">
        
      {/* CTA banner */}
      <div style={{ backgroundColor: "#C9A227" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-base">Ready to start your next project?</p>
            <p className="text-white/80 text-sm">Get in touch and receive a quote within 24 hours.</p>
          </div>
          <a href="#quote">
          <button
            style={{ backgroundColor: "#0F1C33" }}
            className="text-white px-6 py-2.5 rounded hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap"
          >
            Request a Quote
          </button>
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  background: "#C9A227",
                  clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                }}
              >
                <span className="text-white font-bold text-xs">CBS</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-semibold text-sm">Colombo Building</div>
                <div style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase">Supplies</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Sri Lanka&apos;s trusted partner for premium building materials and construction supplies since 1989.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaLinkedin, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerItems.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: "#C9A227" }}>›</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: "#C9A227" }}>›</span> {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <a href="https://maps.app.goo.gl/QM7nR296Z766dBqb8" className="flex items-center gap-2.5">
                <MapPin size={14} style={{ color: "#C9A227" }} className="mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  42 Galle Road, Colombo 03, Sri Lanka
                </span>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <a href="tel:+94112345678" className="flex items-center gap-2.5">
                <Phone size={14} style={{ color: "#C9A227" }} />
                <span className="text-gray-400 text-sm">+94 11 234 5678</span>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <a href="mailto:info@colombobs.lk" className="flex items-center gap-2.5">
                <Mail size={14} style={{ color: "#C9A227" }} />
                <span className="text-gray-400 text-sm">info@colombobs.lk</span>
                </a>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-gray-500 text-xs">Business Hours</p>
              <p className="text-gray-300 text-sm mt-1">Mon – Fri: 7:30am – 5:30pm</p>
              <p className="text-gray-300 text-sm">Sat: 7:30am – 1:00pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-5 px-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © 2026 Colombo Building Supplies. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
