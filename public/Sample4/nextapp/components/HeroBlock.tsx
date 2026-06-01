'use client';

import { useEffect, useState } from 'react';

const PHONE = '+94771234567';
const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I'd like to get a quote for construction materials. Please assist me."
);

export default function HeroBlock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use a short timeout to reliably trigger after hydration
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const scrollToForm = () => {
    document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background layers */}
      <div className="hero__bg-gradient" aria-hidden="true" />
      <div className="hero__bg-dots" aria-hidden="true" />

      <div className="hero__content">
        {/* ── Avatar ── */}
        <div className={`hero__avatar-wrap${visible ? ' hero__avatar-wrap--visible' : ''}`}>
          <div className="hero__avatar" role="img" aria-label="Colombo Building Supplies logo">
            🏗️
          </div>
          <div className="hero__avatar-ring" aria-hidden="true" />
        </div>

        {/* ── Business Identity ── */}
        <div className={`hero__info${visible ? ' hero__info--visible' : ''}`}>
          <h1 className="hero__title">Colombo Building Supplies</h1>
          <span className="hero__tag">Premium Construction Materials &amp; Hardware</span>
          <div className="hero__location">
            <span aria-hidden="true">📍</span>
            Colombo 03, Sri Lanka — Serving Clients Nationwide
          </div>
        </div>

        {/* ── About ── */}
        <p className={`hero__about${visible ? ' hero__about--visible' : ''}`}>
          Sri Lanka's trusted name in construction supplies since 1998. Premium materials,
          island-wide delivery, and bulk order discounts for contractors, developers &amp;
          project managers.
        </p>

        {/* ── Specialty Pills ── */}
        <div className={`hero__pills${visible ? ' hero__pills--visible' : ''}`} role="list">
          <span className="hero__pill" role="listitem">✓ Bulk Orders Welcome</span>
          <span className="hero__pill" role="listitem">✓ Island-Wide Delivery</span>
          <span className="hero__pill" role="listitem">✓ Project Credit Terms</span>
        </div>

        {/* ── Quick Actions ── */}
        <div className={`hero__actions${visible ? ' hero__actions--visible' : ''}`}>
          <a
            href={`tel:${PHONE}`}
            className="hero__action-btn hero__action-btn--call"
            id="btn-call-hero"
            aria-label="Call us now"
          >
            <span className="hero__action-icon" aria-hidden="true">📞</span>
            Call Now
          </a>
          <a
            href={`https://wa.me/${PHONE.replace('+', '')}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__action-btn hero__action-btn--whatsapp"
            id="btn-whatsapp-hero"
            aria-label="Contact via WhatsApp"
          >
            <span className="hero__action-icon" aria-hidden="true">💬</span>
            WhatsApp
          </a>
        </div>

        {/* ── Primary CTA ── */}
        <button
          onClick={scrollToForm}
          className={`hero__cta${visible ? ' hero__cta--visible' : ''}`}
          id="btn-get-quote-hero"
          aria-label="Scroll to quote request form"
        >
          GET YOUR FREE QUOTE ↓
        </button>
      </div>
    </section>
  );
}
