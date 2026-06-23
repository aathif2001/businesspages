"use client";
import { Home, Package, FileText, HelpCircle, CreditCard } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Package, label: "Products", href: "#products" },
  { icon: FileText, label: "Quote", href: "#quote", highlight: true },
  { icon: HelpCircle, label: "FAQ", href: "#faq" },
  { icon: CreditCard, label: "Payment", href: "#billing" },
];


export function FloatingNav() {
  const [active, setActive] = useState(0);

  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full shadow-2xl"
        style={{
          backgroundColor: "#1C2B4A",
          boxShadow: "0 8px 32px rgba(15,28,51,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === i;

          if (item.highlight) {
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(i)}
                className="flex flex-col items-center justify-center mx-1"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#C9A227" }}
                >
                  <Icon size={20} className="text-white" />
                </div>
              </a>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(i)}
              className="flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-all"
              style={{
                backgroundColor: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                minWidth: 52,
              }}
            >
              <Icon
                size={18}
                style={{ color: isActive ? "#C9A227" : "rgba(255,255,255,0.55)" }}
              />
              <span
                className="text-[10px] mt-0.5 leading-none"
                style={{ color: isActive ? "#C9A227" : "rgba(255,255,255,0.45)" }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
