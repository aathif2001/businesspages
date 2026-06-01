'use client';

import { useEffect, useState } from 'react';

const PHONE = '+94771234567';
const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I'd like to get a quick quote for construction materials."
);

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠', href: '#home', external: false },
  { id: 'services', label: 'Services', icon: '📦', href: '#services', external: false },
  { id: 'trust', label: 'Trust', icon: '⭐', href: '#trust', external: false },
  { id: 'intake-form', label: 'Quote', icon: '📋', href: '#intake-form', external: false },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: '💬',
    href: `https://wa.me/${PHONE.replace('+', '')}?text=${WHATSAPP_MSG}`,
    external: true,
  },
] as const;

type NavId = (typeof navItems)[number]['id'];

export default function BottomNav() {
  const [activeId, setActiveId] = useState<NavId>('home');

  useEffect(() => {
    // Track active section using IntersectionObserver
    const sectionIds = navItems
      .filter((item) => !item.external)
      .map((item) => item.id);

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry closest to center that is intersecting
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(b.intersectionRatio - 0.5) - Math.abs(a.intersectionRatio - 0.5));

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id as NavId);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.5],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="bottom-nav"
      role="navigation"
      aria-label="Quick page navigation"
    >
      {navItems.map((item) => {
        const isExternal = item.external;
        const isActive = !isExternal && activeId === item.id;

        if (isExternal) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bottom-nav__item bottom-nav__item--whatsapp"
              id={`btn-bottom-${item.id}`}
              aria-label={`Contact via ${item.label}`}
            >
              <span className="bottom-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="bottom-nav__label">{item.label}</span>
            </a>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.href)}
            className={`bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
            id={`btn-bottom-${item.id}`}
            aria-label={`Navigate to ${item.label}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="bottom-nav__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
