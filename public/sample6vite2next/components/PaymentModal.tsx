'use client';
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface PaymentField {
  label: string;
  value: string;
  copyable?: boolean;
}

interface PaymentDetail {
  title: string;
  subtitle: string;
  note?: string;
  fields: PaymentField[];
}

export const paymentDetails: Record<string, PaymentDetail> = {
  "Bank Transfer": {
    title: "Bank Transfer",
    subtitle: "Transfer directly to our account and send proof of payment to accounts@colombobs.lk",
    fields: [
      { label: "Bank", value: "Bank of Ceylon", copyable: false },
      { label: "Branch", value: "Colombo Fort", copyable: false },
      { label: "Account Name", value: "Colombo Building Supplies (Pvt) Ltd", copyable: true },
      { label: "Account Number", value: "0010 3456 7891 0", copyable: true },
      { label: "Branch Code", value: "001", copyable: true },
      { label: "SWIFT / BIC", value: "BCEYLKLX", copyable: true },
    ],
  },
  "Google Pay": {
    title: "Google Pay",
    subtitle: "Send payment to the GPay ID below and include your name and quote reference in the note.",
    fields: [
      { label: "GPay UPI ID", value: "colombobs@okaxis", copyable: true },
      { label: "Merchant Name", value: "Colombo Building Supplies", copyable: true },
      { label: "Contact Number", value: "+94 11 234 5678", copyable: true },
    ],
    note: "Screenshot your payment confirmation and send to accounts@colombobs.lk",
  },
  "Visa / Mastercard": {
    title: "Visa / Mastercard",
    subtitle: "Card payments are processed manually by our accounts team. Contact us to arrange.",
    fields: [
      { label: "Accounts Team", value: "+94 11 234 5678", copyable: true },
      { label: "Email", value: "accounts@colombobs.lk", copyable: true },
      { label: "Working Hours", value: "Mon – Fri, 8:00am – 5:00pm", copyable: false },
    ],
    note: "Our team will securely process your card payment over the phone.",
  },
  "Apple Pay": {
    title: "Apple Pay",
    subtitle: "Send payment via Apple Pay to the details below and include your quote reference.",
    fields: [
      { label: "Apple Pay ID", value: "colombobs@icloud.com", copyable: true },
      { label: "Merchant Name", value: "Colombo Building Supplies", copyable: true },
      { label: "Contact Number", value: "+94 11 234 5678", copyable: true },
    ],
    note: "Share your payment receipt to accounts@colombobs.lk to confirm.",
  },
  "Cheque": {
    title: "Cheque Payment",
    subtitle: "Make your cheque payable to the details below and deliver to our Colombo office.",
    fields: [
      { label: "Payable To", value: "Colombo Building Supplies (Pvt) Ltd", copyable: true },
      { label: "Delivery Address", value: "42 Galle Road, Colombo 03, Sri Lanka", copyable: true },
      { label: "Office Hours", value: "Mon – Sat, 7:30am – 5:30pm", copyable: false },
    ],
  },
  "Cash": {
    title: "Cash on Delivery",
    subtitle: "Cash payments are accepted at our office or at point of delivery by our team.",
    fields: [
      { label: "Office Address", value: "42 Galle Road, Colombo 03, Sri Lanka", copyable: true },
      { label: "Office Hours", value: "Mon – Fri: 7:30am – 5:30pm", copyable: false },
      { label: "Saturday", value: "7:30am – 1:00pm", copyable: false },
      { label: "Contact", value: "+94 11 234 5678", copyable: true },
    ],
    note: "Our delivery team carries a receipt book. Always obtain an official receipt.",
  },
  "Credit Account": {
    title: "Credit Account",
    subtitle: "Apply for a 30-day credit account. Send your business credentials to get started.",
    fields: [
      { label: "Applications Email", value: "accounts@colombobs.lk", copyable: true },
      { label: "Required", value: "Company Reg. No. + BR Number", copyable: false },
      { label: "Processing Time", value: "3 – 5 business days", copyable: false },
    ],
  },
  "Online Banking": {
    title: "Online Banking",
    subtitle: "Log in to your internet banking portal and transfer to our account using the details below.",
    fields: [
      { label: "Bank", value: "Bank of Ceylon", copyable: false },
      { label: "Account Name", value: "Colombo Building Supplies (Pvt) Ltd", copyable: true },
      { label: "Account Number", value: "0010 3456 7891 0", copyable: true },
      { label: "Branch Code", value: "001", copyable: true },
      { label: "Reference", value: "Your Name + Quote No.", copyable: false },
    ],
    note: "Send your transaction confirmation to accounts@colombobs.lk after transfer.",
  },
};

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="flex items-center justify-between gap-3 rounded-lg px-4 py-3"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="min-w-0">
        <p className="text-gray-400 text-xs mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium break-all">{value}</p>
      </div>
      <button
        onClick={copy}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: copied ? "#22c55e22" : "rgba(201,162,39,0.18)" }}
        title="Copy to clipboard"
      >
        {copied
          ? <Check size={14} className="text-green-400" />
          : <Copy size={14} style={{ color: "#C9A227" }} />
        }
      </button>
    </div>
  );
}

function StaticField({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg px-4 py-3"
      style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
    >
      <p className="text-gray-400 text-xs mb-0.5">{label}</p>
      <p className="text-white text-sm">{value}</p>
    </div>
  );
}

interface PaymentModalProps {
  method: string;
  onClose: () => void;
}

export function PaymentModal({ method, onClose }: PaymentModalProps) {
  const detail = paymentDetails[method];
  if (!detail) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ backgroundColor: "rgba(10,18,35,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#1C2B4A" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <p style={{ color: "#C9A227" }} className="text-xs tracking-widest uppercase font-medium mb-0.5">
              Payment Details
            </p>
            <h3 className="text-white">{detail.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{detail.subtitle}</p>

          {detail.fields.map((field) =>
            field.copyable ? (
              <CopyField key={field.label} label={field.label} value={field.value} />
            ) : (
              <StaticField key={field.label} label={field.label} value={field.value} />
            )
          )}

          {detail.note && (
            <div
              className="rounded-lg px-4 py-3 mt-2"
              style={{ backgroundColor: "rgba(201,162,39,0.1)", borderLeft: "3px solid #C9A227" }}
            >
              <p className="text-gray-300 text-xs leading-relaxed">{detail.note}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C9A227" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
