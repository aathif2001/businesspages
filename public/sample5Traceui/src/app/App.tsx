import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CoreOfferings } from "./components/CoreOfferings";
import { StatsSection } from "./components/StatsSection";
import { TrustedSection } from "./components/TrustedSection";
import { QuoteForm } from "./components/QuoteForm";
import { FAQ } from "./components/FAQ";
import { BillingSection } from "./components/BillingSection";
import { Footer } from "./components/Footer";
import { FloatingNav } from "./components/FloatingNav";
import { FloatingContactFABs } from "./components/FloatingContactFABs";
import { BannerCarousel } from "./components/BannerCarousel";

export default function App() {
  return (
    <div className="min-h-screen w-full pb-24 md:pb-0">
      <Header />
      <BannerCarousel />
      <HeroSection />
      <CoreOfferings />
      <StatsSection />
      <TrustedSection />
      <QuoteForm />
      <FAQ />
      <BillingSection />
      <Footer />
      <FloatingNav />
      <FloatingContactFABs />
    </div>
  );
}
