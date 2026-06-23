import {StatsSection} from "../components/StatsSection";
import {HeroSection} from "../components/HeroSection";
import {FloatingNav} from "../components/FloatingNav";
import {Footer} from "../components/Footer";
import {TrustedSection} from "../components/TrustedSection";
import {CoreOfferings} from "../components/CoreOfferings";
import {FAQ} from "../components/FAQ";
import {FloatingContactFABs} from "../components/FloatingContactFABs";
import {QuoteForm} from "../components/QuoteForm";
import {Header} from "../components/Header";
import {BillingSection} from "../components/BillingSection";
import {BannerCarousel} from "../components/BannerCarousel";

export default function Home() {
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
