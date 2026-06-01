'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 'moq',
    question: 'What is your minimum order quantity (MOQ)?',
    answer:
      'Our MOQ varies by product. For structural steel and rebar, the minimum is 1MT. For cement, we accept orders from 50 bags (approx. 2,500kg). For plumbing & electrical kits, we supply individual sets for smaller projects. Contact us for flexible arrangements on smaller quantities — we aim to accommodate every project size.',
  },
  {
    id: 'lead-times',
    question: 'What are your delivery lead times?',
    answer:
      'For standard Colombo and Western Province deliveries, lead time is 24–48 hours. For outstation and island-wide deliveries, please allow 2–5 working days depending on your location. Urgent delivery requests (within 24 hours) can be arranged for an additional logistics fee. We maintain a real-time inventory system to minimise delays.',
  },
  {
    id: 'payment',
    question: 'What payment terms do you accept?',
    answer:
      'We accept bank transfers, cheques, and cash payments. For established clients with a positive credit history, we offer 30-day and 60-day payment terms. New clients begin with advance payment and can apply for credit terms after 3 successful transactions. All payments are documented with official receipts and VAT-compliant invoices.',
  },
  {
    id: 'invoices',
    question: 'Do you provide formal quotations and VAT invoices?',
    answer:
      'Yes, absolutely. All orders come with official written quotations, delivery orders (DOs), and VAT-compliant tax invoices. We are a registered VAT entity. Quotations are typically delivered within 2–4 business hours after receiving your request. We also provide material test certificates and quality assurance documents on request.',
  },
  {
    id: 'bulk',
    question: 'Do you offer bulk discounts for large projects?',
    answer:
      'Yes — we provide tiered bulk pricing starting from 10MT of steel or 500 bags of cement. Project-based pricing is also available for developers and contractors who require ongoing supply throughout a construction project. Long-term supply agreements come with dedicated account managers, priority inventory allocation, and preferential pricing.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="faq">
      <div className="section-header">
        <div className="section-eyebrow">Quick Answers</div>
        <h2 className="section-title">Common Questions</h2>
        <p className="section-subtitle">
          Everything you need to know before calling us
        </p>
      </div>

      <div className="faq__list" role="list">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.id}
              className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
              role="listitem"
            >
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                id={`btn-faq-${faq.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                <span className="faq__chevron" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className="faq__answer"
                role="region"
                aria-labelledby={`btn-faq-${faq.id}`}
                style={{ maxHeight: isOpen ? '600px' : '0' }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
