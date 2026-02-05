import Header from '@/components/Header';
import CSVCleaner from '@/components/CSVCleaner';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import EnterpriseFeatures from '@/components/EnterpriseFeatures';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Header />
      <main>
        {/* 1. Hero + Primary Conversion (Tool) */}
        <CSVCleaner />

        {/* 2. Social Proof - Build instant trust */}
        <SocialProofBar />

        {/* 3. How It Works - Reduce friction, show simplicity */}
        <HowItWorks />

        {/* 4. Enterprise Features - Security & Trust */}
        <EnterpriseFeatures />

        {/* 5. Testimonials - Social proof from real users */}
        <Testimonials />

        {/* 6. Pricing - Transparent pricing */}
        <Pricing />

        {/* 7. FAQ - Handle objections */}
        <FAQ />

        {/* 8. Final CTA - Last chance to convert */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
