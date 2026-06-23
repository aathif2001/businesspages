import { Phone } from "lucide-react";


export function Header() {

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#products" },
    { label: "Trust", href: "#stats" },
    { label: "Quote", href: "#quote", highlight: true },
    { label: "FAQ", href: "#faq" },
    { label: "Payment", href: "#billing" },
  ];

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
            {navItems.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <a href="tel:+94112345678" className="flex items-center gap-2.5">
                <Phone size={14} style={{ color: "#C9A227" }} />
                <span className="text-sm">+94 11 234 5678</span>
                </a>
            </div>
            <a href="sms:+94112345678?body=Hi,%20I%20would%20like%20more%20information.">
            <button
              style={{ backgroundColor: "#C9A227" }}
              className="text-white text-sm px-4 py-2 rounded hover:opacity-90 transition-opacity font-medium"
            >
              Message
            </button>
            </a>
          </div>
       
        </div>
      </div>
    </header>
  );
}
