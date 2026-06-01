import type { Metadata, Viewport } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Colombo Building Supplies | Premier Construction Materials Sri Lanka',
  description:
    'Over 26 years supplying premium construction materials across Sri Lanka. Structural steel, cement, aggregates, plumbing & electrical supplies. Bulk orders welcome. Island-wide delivery.',
  keywords: [
    'construction materials Sri Lanka',
    'building supplies Colombo',
    'steel rebar Sri Lanka',
    'cement supplier Colombo',
    'bulk construction materials',
    'hardware supplier Sri Lanka',
  ],
  openGraph: {
    title: 'Colombo Building Supplies',
    description: 'Premier Construction Materials & Hardware — Serving Sri Lanka since 1998',
    type: 'website',
    locale: 'en_LK',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A1628',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏗️</text></svg>" />
      </head>
      <body>
        <div className="page-container">{children}</div>
      </body>
    </html>
  );
}
