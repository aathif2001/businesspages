'use client';

const services = [
  {
    id: 'steel',
    icon: '⚙️',
    title: 'Structural Steel & Rebar',
    bullets: [
      'Fe500 & Fe550 Grade Rebar',
      'MS Angles, Channels & Flats',
      'H-Beams, I-Beams & RSJ',
      'Custom cut-to-length service',
    ],
    price: 'from LKR 85,000 / MT',
    badge: 'Most Popular',
  },
  {
    id: 'cement',
    icon: '🏗️',
    title: 'Cement & Aggregates',
    bullets: [
      'Holcim & Tokyo Cement (OPC/PPC)',
      'Quarry Dust & River Sand',
      'Metal: 6mm, 12mm, 20mm',
      'Ready-mix concrete supply',
    ],
    price: 'from LKR 1,850 / bag',
    badge: 'Best Value',
  },
  {
    id: 'plumbing',
    icon: '🔧',
    title: 'Plumbing & Electrical',
    bullets: [
      'PVC & CPVC pipe systems',
      'SLS-certified copper wiring',
      'Circuit breakers & DB panels',
      'Fixtures, fittings & accessories',
    ],
    price: 'from LKR 3,200 / set',
    badge: 'Complete Kits',
  },
];

export default function ServicesGrid() {
  const scrollToForm = (serviceId: string) => {
    const formEl = document.getElementById('intake-form');
    if (!formEl) return;
    formEl.scrollIntoView({ behavior: 'smooth' });
    // Pre-select the service in the intake form after scroll completes
    setTimeout(() => {
      const select = document.getElementById('service-select') as HTMLSelectElement | null;
      if (select && select.value !== serviceId) {
        select.value = serviceId;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 700);
  };

  return (
    <section id="services" className="services">
      <div className="section-header">
        <div className="section-eyebrow">What We Supply</div>
        <h2 className="section-title">Our Core Offerings</h2>
        <p className="section-subtitle">
          Trusted by contractors, developers &amp; project managers across Sri Lanka
        </p>
      </div>

      <div className="services__grid" role="list">
        {services.map((service) => (
          <article key={service.id} className="service-card" role="listitem">
            {service.badge && (
              <span className="service-card__badge" aria-label={`Badge: ${service.badge}`}>
                {service.badge}
              </span>
            )}

            <div className="service-card__icon" aria-hidden="true">
              {service.icon}
            </div>

            <h3 className="service-card__title">{service.title}</h3>

            <ul className="service-card__bullets" aria-label={`${service.title} features`}>
              {service.bullets.map((b) => (
                <li key={b} className="service-card__bullet">
                  {b}
                </li>
              ))}
            </ul>

            <div className="service-card__price" aria-label={`Starting price: ${service.price}`}>
              {service.price}
            </div>

            <button
              onClick={() => scrollToForm(service.id)}
              className="service-card__cta"
              id={`btn-request-${service.id}`}
              aria-label={`Request pricing for ${service.title}`}
            >
              Request Pricing →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
