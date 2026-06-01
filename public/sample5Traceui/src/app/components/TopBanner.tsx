import { X } from "lucide-react";
import { useState } from "react";

interface TopBannerProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export function TopBanner({
  message = "🏗️ Now offering island-wide delivery on all orders over Rs. 50,000 — ",
  linkText = "Learn more →",
  linkHref = "#",
}: TopBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white text-xs relative"
      style={{ backgroundColor: "#C9A227" }}
    >
      <p className="text-center leading-snug">
        {message}
        {linkText && (
          <a href={linkHref} className="underline font-semibold hover:opacity-80 transition-opacity">
            {linkText}
          </a>
        )}
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}
