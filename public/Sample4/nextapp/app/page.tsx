import HeroBlock from '@/components/HeroBlock';
import ServicesGrid from '@/components/ServicesGrid';
import TrustWall from '@/components/TrustWall';
import IntakeForm from '@/components/IntakeForm';
import FaqAccordion from '@/components/FaqAccordion';
import BillingFooter from '@/components/BillingFooter';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      <main>
        <HeroBlock />
        <ServicesGrid />
        <TrustWall />
        <IntakeForm />
        <FaqAccordion />
        <BillingFooter />
      </main>
      <BottomNav />
    </>
  );
}
