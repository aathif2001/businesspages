'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 26, suffix: '+', label: 'Years in Business' },
  { value: 10000, suffix: '+', label: 'Orders Delivered' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 9, suffix: '/9', label: 'Provinces Served' },
];

const testimonials = [
  {
    id: 't001',
    name: 'Roshan Perera',
    role: 'Site Manager, Perera Construction',
    rating: 5,
    comment:
      'Outstanding service! Ordered 50MT of steel rebar and it was delivered within 48 hours. Quality is top-notch and pricing is very competitive compared to the market.',
  },
  {
    id: 't002',
    name: 'Amara Silva',
    role: 'Property Developer, AS Realty',
    rating: 5,
    comment:
      "Been using CBS for over 5 years. Their credit terms and bulk discounts have saved our company millions. Highly recommended for any large-scale project.",
  },
  {
    id: 't003',
    name: 'Kasun Fernando',
    role: 'Principal Contractor, KF Builders',
    rating: 5,
    comment:
      'Plumbing & electrical packages are perfectly priced for our project scale. MOQ is flexible for smaller sites too. Communication is always prompt and professional.',
  },
  {
    id: 't004',
    name: 'Nilufar Rasheed',
    role: 'Project Manager, Rasheed Associates',
    rating: 5,
    comment:
      'Island-wide delivery is a game-changer for us. Materials arrive on time every single time, keeping our projects on schedule. The quote system saved hours of calls.',
  },
];

function useCountUp(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

function StatItem({ stat, isVisible }: { stat: (typeof stats)[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible);
  return (
    <div className="trust__stat">
      <div className="trust__stat-number" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="trust__stat-label">{stat.label}</div>
    </div>
  );
}

export default function TrustWall() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" className="trust">
      <div className="section-header">
        <div className="section-eyebrow">Why Choose Us</div>
        <h2 className="section-title">Trusted for Decades</h2>
        <p className="section-subtitle">Real results from real clients across Sri Lanka</p>
      </div>

      {/* ── Animated Stats ── */}
      <div className="trust__stats" ref={statsRef} role="list" aria-label="Company statistics">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>

      {/* ── Testimonials ── */}
      <div className="trust__testimonials" role="list" aria-label="Customer testimonials">
        {testimonials.map((t) => (
          <article key={t.id} className="testimonial-card" role="listitem">
            <div
              className="testimonial-card__stars"
              aria-label={`${t.rating} out of 5 stars`}
              role="img"
            >
              {'★'.repeat(t.rating)}
              {'☆'.repeat(5 - t.rating)}
            </div>
            <p className="testimonial-card__comment">"{t.comment}"</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar" aria-hidden="true">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="testimonial-card__name">{t.name}</div>
                <div className="testimonial-card__role">{t.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Certifications ── */}
      <div className="trust__certs" role="list" aria-label="Certifications and memberships">
        <div className="trust__cert-badge" role="listitem">
          <span aria-hidden="true">🏆</span> ISO 9001 Certified
        </div>
        <div className="trust__cert-badge" role="listitem">
          <span aria-hidden="true">✅</span> ICTAD Registered
        </div>
        <div className="trust__cert-badge" role="listitem">
          <span aria-hidden="true">⭐</span> Google Verified Business
        </div>
      </div>
    </section>
  );
}
