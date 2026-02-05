'use client';

import { PRICE_AMOUNT } from '@/lib/config';

export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A2540] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#635BFF]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-sm">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
          </svg>
          <span className="text-sm font-medium text-white">For Stripe users who need clarity</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Stop guessing where
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-[#00D4FF]">
            your money went
          </span>
        </h2>
        <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
          Upload your Stripe export. Get a file your accountant can actually understand.
          No subscription. No account. Just ${PRICE_AMOUNT} per file.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#635BFF] to-[#00D4FF] text-white rounded-xl text-lg font-semibold shadow-2xl hover:shadow-[#635BFF]/30 hover:scale-[1.02] transition-all duration-200"
        >
          Transform My Stripe Export
          <svg
            className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>100% browser-based</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Your data stays private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Instant download</span>
          </div>
        </div>
      </div>
    </section>
  );
}
