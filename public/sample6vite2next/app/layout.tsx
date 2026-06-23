import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Colombo Building Supplies",
  description: "Sri Lanka's trusted partner for premium building materials since 1989.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
