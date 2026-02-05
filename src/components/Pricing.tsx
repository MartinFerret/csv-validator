'use client';

export default function Pricing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-6">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-700">Simple pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Pay per file, not per month
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            No subscriptions. No hidden fees. Just clean data when you need it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Starter tier */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Starter</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900">$0</span>
              </div>
              <p className="text-slate-500 mt-3">Perfect for quick tests</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Files up to 50 rows',
                'All cleaning features',
                'Before/after preview',
                'Instant download',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full py-3 px-6 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-white hover:border-slate-400 transition-all"
            >
              Try it now
            </button>
          </div>

          {/* Pro tier */}
          <div className="bg-slate-900 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                RECOMMENDED
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Standard</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">$2.99</span>
                <span className="text-slate-400">/ file</span>
              </div>
              <p className="text-slate-400 mt-3">For production workloads</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                { text: 'Unlimited rows', highlight: true },
                { text: 'All cleaning features' },
                { text: 'Before/after preview' },
                { text: 'Instant download' },
                { text: 'No subscription required' },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={typeof feature === 'object' && feature.highlight ? 'text-white font-medium' : 'text-slate-300'}>
                    {typeof feature === 'object' ? feature.text : feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="w-full py-3 px-6 bg-white rounded-xl text-slate-900 font-semibold hover:bg-slate-100 transition-all"
            >
              Get started
            </button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure payment via Stripe</span>
          </div>
          <span className="hidden sm:block text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span>Visa, Mastercard, Amex, Apple Pay</span>
          </div>
        </div>
      </div>
    </section>
  );
}
