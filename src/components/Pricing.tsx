'use client';

import { PRICING } from '@/lib/config';

export default function Pricing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">
            One file. One price. No subscription.
          </h2>
          <p className="text-[#425466] text-lg max-w-xl mx-auto">
            Pay only when you need it. No monthly fees eating into your margins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Single File */}
          <div className="bg-[#F6F9FC] rounded-2xl p-8 border border-[#E3E8EE]">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#8898AA] uppercase tracking-wider mb-3">
                {PRICING.single.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#0A2540]">${PRICING.single.price}</span>
              </div>
              <p className="text-[#425466] text-sm mt-2">Per export file</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Any Stripe export type',
                'Full transformation',
                'Instant download',
                'No account required',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#425466]">
                  <svg className="w-4 h-4 text-[#635BFF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full py-3 px-6 border border-[#E3E8EE] rounded-xl text-[#0A2540] font-semibold hover:bg-white hover:border-[#635BFF] transition-all"
            >
              Clean one file
            </button>
          </div>

          {/* 3-Pack - Recommended */}
          <div className="bg-[#0A2540] rounded-2xl p-8 relative transform md:scale-105 shadow-2xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#635BFF] to-[#00D4FF] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                BEST VALUE
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#8898AA] uppercase tracking-wider mb-3">
                {PRICING.pack3.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">${PRICING.pack3.price}</span>
                <span className="text-[#00D924] text-sm font-medium">Save ${PRICING.pack3.savings.toFixed(0)}</span>
              </div>
              <p className="text-white/60 text-sm mt-2">${PRICING.pack3.pricePerFile.toFixed(2)} per file</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                `Process ${PRICING.pack3.files} export files`,
                'Use anytime (no expiry)',
                'All features included',
                'Priority processing',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <svg className="w-4 h-4 text-[#00D4FF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full py-3 px-6 bg-gradient-to-r from-[#635BFF] to-[#00D4FF] rounded-xl text-white font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Get 3-pack
            </button>
          </div>

          {/* 5-Pack */}
          <div className="bg-[#F6F9FC] rounded-2xl p-8 border border-[#E3E8EE]">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#8898AA] uppercase tracking-wider mb-3">
                {PRICING.pack5.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0A2540]">${PRICING.pack5.price}</span>
                <span className="text-[#00D924] text-sm font-medium">Save ${PRICING.pack5.savings.toFixed(0)}</span>
              </div>
              <p className="text-[#425466] text-sm mt-2">${PRICING.pack5.pricePerFile.toFixed(2)} per file</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                `Process ${PRICING.pack5.files} export files`,
                'Use anytime (no expiry)',
                'All features included',
                'Bulk processing support',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#425466]">
                  <svg className="w-4 h-4 text-[#635BFF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full py-3 px-6 border border-[#E3E8EE] rounded-xl text-[#0A2540] font-semibold hover:bg-white hover:border-[#635BFF] transition-all"
            >
              Get 5-pack
            </button>
          </div>
        </div>

        {/* Why this price */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4">Why ${PRICING.single.price}?</h3>
          <p className="text-[#425466] leading-relaxed">
            Because your time is worth more than ${PRICING.single.price}. If you spend even 30 minutes wrestling with
            Stripe exports-reformatting columns, calculating fees, matching payouts-you&apos;re losing money.
            This tool does it in seconds and gives you a file your accountant can actually use.
          </p>
        </div>

        {/* Trust */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-[#8898AA] text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure payment via Stripe</span>
          </div>
          <span className="hidden sm:block text-[#E3E8EE]">•</span>
          <div className="flex items-center gap-2">
            <span>Visa, Mastercard, Amex, Apple Pay</span>
          </div>
        </div>
      </div>
    </section>
  );
}
