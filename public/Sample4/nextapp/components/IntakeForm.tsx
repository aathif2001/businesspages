'use client';

import { useRef, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const PHONE = '+94771234567';

const serviceOptions = [
  { value: '', label: '— Select a service / product —' },
  { value: 'steel', label: '⚙️  Structural Steel & Rebar' },
  { value: 'cement', label: '🏗️  Cement & Aggregates' },
  { value: 'plumbing', label: '🔧  Plumbing & Electrical' },
  { value: 'other', label: '📦  Other / Multiple Categories' },
];

const volumeOptions = [
  'Small — Under 10MT / fewer than 100 bags',
  'Medium — 10–50MT / 100–500 bags',
  'Large — 50MT+ / 500+ bags',
  'Not sure yet — need guidance',
];

const urgencyOptions = [
  'Immediate — Within 1 week',
  'Standard — 2 to 4 weeks',
  'Planned — 1 to 3 months',
  'Just exploring options',
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  volume: string;
  urgency: string;
  notes: string;
  file: File | null;
}

type FieldErrors = Partial<Record<keyof FormData | 'submit', string>>;

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  volume: '',
  urgency: '',
  notes: '',
  file: null,
};

// ─── Progress dots ────────────────────────────────────────────────────────────
const STEPS = ['Contact', 'Details', 'Review'];

// ─── Component ────────────────────────────────────────────────────────────────
export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Updater ──
  function update<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  // ── Validation ──
  function validateStep1(): boolean {
    const errs: FieldErrors = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Please enter a valid email address';
    if (formData.phone.trim().replace(/\D/g, '').length < 9)
      errs.phone = 'Please enter a valid phone number (min 9 digits)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: FieldErrors = {};
    if (!formData.service) errs.service = 'Please select a service or product category';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Navigation ──
  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  // ── Submit ──
  async function handleSubmit() {
    setLoading(true);
    setErrors({});
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('service', formData.service);
      fd.append('volume', formData.volume);
      fd.append('urgency', formData.urgency);
      fd.append('notes', formData.notes);
      if (formData.file) fd.append('attachment', formData.file);

      const res = await fetch('/api/leads', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed. Please try again.');
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  }

  // ── Service label helper ──
  const serviceLabel =
    serviceOptions.find((o) => o.value === formData.service)?.label.replace(/^.{2}\s+/, '') ||
    formData.service;

  // ─── SUCCESS STATE ──────────────────────────────────────────────────────────
  if (submitted) {
    const waText = encodeURIComponent(
      `Hi! I just submitted a quote request for ${serviceLabel}. My name is ${formData.name}.`
    );
    return (
      <section id="intake-form" className="intake">
        <div className="intake__success">
          <div className="intake__success-icon" role="img" aria-label="Success checkmark">
            ✅
          </div>
          <h2 className="intake__success-title">Quote Request Received!</h2>
          <p className="intake__success-subtitle">
            Thank you, <strong>{formData.name}</strong>. We'll review your request and
            respond within 2–4 business hours.
          </p>

          <div className="intake__timeline" aria-label="Next steps">
            {[
              {
                n: '1',
                title: 'Confirmation',
                desc: "You'll receive a confirmation via WhatsApp within 30 minutes",
              },
              {
                n: '2',
                title: 'Pricing Review',
                desc: 'Our team prepares a custom quote based on your requirements',
              },
              {
                n: '3',
                title: 'Quote Delivery',
                desc: 'Detailed quote sent via email & WhatsApp within 4 business hours',
              },
            ].map((item) => (
              <div className="intake__timeline-item" key={item.n}>
                <div className="intake__timeline-dot" aria-hidden="true">
                  {item.n}
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${PHONE.replace('+', '')}?text=${waText}`}
            className="intake__whatsapp-followup"
            target="_blank"
            rel="noopener noreferrer"
            id="btn-whatsapp-followup"
          >
            💬 Also Send via WhatsApp
          </a>
        </div>
      </section>
    );
  }

  // ─── PROGRESS BAR STYLE ─────────────────────────────────────────────────────
  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  // ─── FORM ───────────────────────────────────────────────────────────────────
  return (
    <section id="intake-form" className="intake">
      <div className="section-header">
        <div className="section-eyebrow">Get Started</div>
        <h2 className="section-title">Request Your Quote</h2>
        <p className="section-subtitle">Takes 2 minutes. We'll handle the rest.</p>
      </div>

      {/* Progress indicator */}
      <div
        className="intake__progress"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-label={`Step ${step} of ${STEPS.length}: ${STEPS[step - 1]}`}
        style={{ '--progress': `${progressPct}%` } as React.CSSProperties}
      >
        {STEPS.map((label, i) => {
          const s = i + 1;
          const isDone = step > s;
          const isActive = step === s;
          return (
            <div
              key={label}
              className={`intake__step${isActive ? ' intake__step--active' : ''}${isDone ? ' intake__step--done' : ''}`}
            >
              <div className="intake__step-dot">{isDone ? '✓' : s}</div>
              <span className="intake__step-label">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="intake__form">
        {/* ── STEP 1: Contact Info ── */}
        {step === 1 && (
          <div className="intake__fields">
            <div className="form-field">
              <label className="form-label" htmlFor="field-name">
                Full Name *
              </label>
              <input
                id="field-name"
                type="text"
                autoComplete="name"
                className={`form-input${errors.name ? ' form-input--error' : ''}`}
                placeholder="e.g. Roshan Perera"
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
              />
              {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="field-email">
                Email Address *
              </label>
              <input
                id="field-email"
                type="email"
                autoComplete="email"
                className={`form-input${errors.email ? ' form-input--error' : ''}`}
                placeholder="e.g. roshan@company.lk"
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
              />
              {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="field-phone">
                Phone / WhatsApp *
              </label>
              <input
                id="field-phone"
                type="tel"
                autoComplete="tel"
                className={`form-input${errors.phone ? ' form-input--error' : ''}`}
                placeholder="e.g. 077 123 4567"
                value={formData.phone}
                onChange={(e) => update('phone', e.target.value)}
              />
              {errors.phone && <span className="form-error" role="alert">{errors.phone}</span>}
            </div>
          </div>
        )}

        {/* ── STEP 2: Service & Details ── */}
        {step === 2 && (
          <div className="intake__fields">
            <div className="form-field">
              <label className="form-label" htmlFor="service-select">
                Service / Product Category *
              </label>
              <select
                id="service-select"
                className={`form-input form-select${errors.service ? ' form-input--error' : ''}`}
                value={formData.service}
                onChange={(e) => update('service', e.target.value)}
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.service && <span className="form-error" role="alert">{errors.service}</span>}
            </div>

            {/* Conditional fields — show only when a specific service is chosen */}
            {formData.service && (
              <>
                <div className="form-field">
                  <label className="form-label">Estimated Volume / Quantity</label>
                  <div className="form-radio-group" role="radiogroup" aria-label="Volume options">
                    {volumeOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`form-radio-label${formData.volume === opt ? ' form-radio-label--active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="volume"
                          value={opt}
                          checked={formData.volume === opt}
                          onChange={(e) => update('volume', e.target.value)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Urgency Level</label>
                  <div className="form-radio-group" role="radiogroup" aria-label="Urgency options">
                    {urgencyOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`form-radio-label${formData.urgency === opt ? ' form-radio-label--active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={opt}
                          checked={formData.urgency === opt}
                          onChange={(e) => update('urgency', e.target.value)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* File upload — for blueprints / site photos */}
                <div className="form-field">
                  <label className="form-label">
                    Attach Blueprint / Site Photo{' '}
                    <span style={{ fontWeight: 400, color: 'var(--clr-text-muted)' }}>
                      (Optional)
                    </span>
                  </label>
                  <div
                    className="form-upload"
                    onClick={() => fileRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                    aria-label="Click to upload a file"
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.dwg,.doc,.docx"
                      style={{ display: 'none' }}
                      aria-hidden="true"
                      onChange={(e) => update('file', e.target.files?.[0] ?? null)}
                    />
                    {formData.file ? (
                      <span className="form-upload__filename">📎 {formData.file.name}</span>
                    ) : (
                      <span className="form-upload__placeholder">
                        📤 Click to upload (PDF, JPG, PNG, DWG, DOC — max 10MB)
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="form-field">
              <label className="form-label" htmlFor="field-notes">
                Additional Notes{' '}
                <span style={{ fontWeight: 400, color: 'var(--clr-text-muted)' }}>(Optional)</span>
              </label>
              <textarea
                id="field-notes"
                className="form-input form-textarea"
                placeholder="Describe your project, delivery location, site address, or any special requirements..."
                value={formData.notes}
                onChange={(e) => update('notes', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}

        {/* ── STEP 3: Review ── */}
        {step === 3 && (
          <div className="intake__review">
            <div className="intake__review-card">
              <h3 className="intake__review-title">Review Your Request</h3>
              {[
                { label: 'Name', value: formData.name },
                { label: 'Email', value: formData.email },
                { label: 'Phone', value: formData.phone },
                { label: 'Service', value: serviceLabel },
                formData.volume ? { label: 'Volume', value: formData.volume } : null,
                formData.urgency ? { label: 'Urgency', value: formData.urgency } : null,
                formData.file ? { label: 'Attachment', value: `📎 ${formData.file.name}` } : null,
                formData.notes ? { label: 'Notes', value: formData.notes } : null,
              ]
                .filter(Boolean)
                .map((row) => (
                  <div
                    key={row!.label}
                    className={`intake__review-row${row!.label === 'Notes' ? ' intake__review-row--notes' : ''}`}
                  >
                    <span>{row!.label}</span>
                    <strong>{row!.value}</strong>
                  </div>
                ))}
            </div>

            {errors.submit && (
              <div className="form-error-banner" role="alert">
                ⚠️ {errors.submit}
              </div>
            )}
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="intake__nav">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="intake__btn-back"
              id="btn-form-back"
              aria-label="Go back to previous step"
            >
              ← Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="intake__btn-next"
              id={`btn-form-next-${step}`}
              aria-label="Continue to next step"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="intake__btn-submit"
              disabled={loading}
              id="btn-form-submit"
              aria-label="Submit your quote request"
            >
              {loading ? '⏳ Sending...' : '🚀 GET MY QUOTE'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
