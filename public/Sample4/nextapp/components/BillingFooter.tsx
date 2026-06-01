'use client';

import { useState } from 'react';

// ── This token MUST match BANKING_TOKEN in server/.env ──
const REVEAL_TOKEN = 'reveal-token-change-me';

interface BankDetails {
  bankName: string;
  accountHolder: string;
  branch: string;
  accountNumber: string;
  swiftCode: string;
}

export default function BillingFooter() {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<BankDetails | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleReveal = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/reveal-banking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: REVEAL_TOKEN }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not retrieve banking details.');
      setDetails(data as BankDetails);
      setRevealed(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!details?.accountNumber) return;
    try {
      await navigator.clipboard.writeText(details.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = details.accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* ── BLOCK 6: Secure Billing ── */}
      <section id="billing" className="billing">
        <div className="section-header">
          <div className="section-eyebrow">Secure Payment</div>
          <h2 className="section-title">Billing Information</h2>
          <p className="section-subtitle">
            Bank transfer details are secured and only revealed after verification
          </p>
        </div>

        <div className="billing__card" role="region" aria-label="Banking details">
          {/* Always visible rows */}
          <div className="billing__row">
            <span className="billing__label">Bank</span>
            <span className="billing__value">Commercial Bank of Ceylon</span>
          </div>
          <div className="billing__row">
            <span className="billing__label">Account Holder</span>
            <span className="billing__value">Colombo Building Supplies (Pvt) Ltd</span>
          </div>

          {/* Secured rows */}
          <div className="billing__row">
            <span className="billing__label">Branch</span>
            <span
              className={`billing__value ${revealed ? 'billing__value--revealed' : 'billing__value--blurred'}`}
              aria-hidden={!revealed}
            >
              {revealed ? details?.branch : 'Colpetty Branch'}
            </span>
          </div>
          <div className="billing__row">
            <span className="billing__label">Account No.</span>
            <span
              className={`billing__value ${revealed ? 'billing__value--revealed' : 'billing__value--blurred'}`}
              aria-hidden={!revealed}
            >
              {revealed ? details?.accountNumber : '8001234567890'}
            </span>
          </div>

          {revealed && details?.swiftCode && (
            <div className="billing__row">
              <span className="billing__label">SWIFT / BIC</span>
              <span className="billing__value billing__value--revealed">{details.swiftCode}</span>
            </div>
          )}

          {/* Lock banner — visible only before reveal */}
          {!revealed && (
            <div className="billing__lock-banner" role="note">
              <span aria-hidden="true">🔒</span>
              <span>
                Private Details Locked. Fill out the quote form above or click below to
                verify &amp; reveal bank details.
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="form-error-banner" role="alert">
              ⚠️ {error}
            </div>
          )}

          {/* Action buttons */}
          {!revealed ? (
            <button
              onClick={handleReveal}
              className="billing__reveal-btn"
              disabled={loading}
              id="btn-reveal-banking"
              aria-label="Reveal secure banking details"
            >
              {loading ? '⏳ Verifying...' : '🔓 SHOW PAYMENT DETAILS'}
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="billing__copy-btn"
              id="btn-copy-account"
              aria-label="Copy account number to clipboard"
            >
              {copied ? '✅ Copied to Clipboard!' : '📋 Copy Account Number'}
            </button>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" role="contentinfo">
        <div className="footer__content">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo" role="img" aria-label="Colombo Building Supplies">
              🏗️
            </div>
            <div>
              <div className="footer__name">Colombo Building Supplies</div>
              <div className="footer__tagline">Est. 1998 — Trusted for Generations</div>
            </div>
          </div>

          <div className="footer__divider" aria-hidden="true" />

          {/* Details */}
          <address className="footer__details" style={{ fontStyle: 'normal' }}>
            <div className="footer__detail">
              <span aria-hidden="true">📍</span>
              142, Galle Road, Colombo 03, Sri Lanka
            </div>
            <div className="footer__detail">
              <span aria-hidden="true">📞</span>
              <a href="tel:+94771234567" style={{ color: 'inherit' }}>
                +94 77 123 4567
              </a>
            </div>
            <div className="footer__detail">
              <span aria-hidden="true">📧</span>
              <a href="mailto:info@colombobuildsupplies.lk" style={{ color: 'inherit' }}>
                info@colombobuildsupplies.lk
              </a>
            </div>
            <div className="footer__detail">
              <span aria-hidden="true">🕐</span>
              Monday – Saturday: 7:30 AM – 6:00 PM
            </div>
          </address>

          <div className="footer__divider" aria-hidden="true" />

          {/* Badges */}
          <div className="footer__badges" role="list" aria-label="Certifications">
            <span className="footer__badge" role="listitem">🏆 ISO 9001 Certified</span>
            <span className="footer__badge" role="listitem">✅ ICTAD Registered</span>
            <span className="footer__badge" role="listitem">⭐ 26 Years of Excellence</span>
            <span className="footer__badge" role="listitem">📦 VAT Registered</span>
          </div>

          <div className="footer__divider" aria-hidden="true" />

          {/* Copyright */}
          <p className="footer__copy">
            © {new Date().getFullYear()} Colombo Building Supplies (Pvt) Ltd. All rights reserved.
            <br />
            <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>
              BR No. PV 12345 • VAT Reg. 123456789-7000
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
