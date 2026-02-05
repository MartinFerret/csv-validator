'use client';

export default function EnterpriseFeatures() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Clear Financial Breakdown',
      description: 'Every transaction shows gross amount, Stripe fees, and net payout. No more guessing which number is which.',
      highlight: 'Gross → Fees → Net',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Payout Grouping',
      description: 'See exactly which payments are included in each bank payout. Match your bank statement in minutes, not hours.',
      highlight: 'Bank reconciliation ready',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Timezone Normalization',
      description: 'All dates converted to your local timezone. No more UTC confusion or date mismatches with your accounting software.',
      highlight: 'Local time, always',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Human-Readable Columns',
      description: 'Stripe column names like "balance_transaction" become "Transaction ID". Your accountant will thank you.',
      highlight: 'Clear naming',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      ),
      title: 'Refund Handling',
      description: 'Refunds clearly linked to original payments. See the impact on your revenue without manual cross-referencing.',
      highlight: 'Linked refunds',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: '100% Privacy',
      description: 'Your financial data never leaves your browser. We never see, store, or have access to your Stripe exports.',
      highlight: 'Zero upload',
    },
  ];

  return (
    <section className="py-24 bg-[#F6F9FC]" id="features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider mb-3">
            What We Fix
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">
            From confusing to accountant-ready
          </h2>
          <p className="text-[#425466] text-lg max-w-2xl mx-auto">
            We transform raw Stripe exports into clean, structured files that your accountant
            can actually use. No Excel formulas needed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 border border-[#E3E8EE] hover:border-[#635BFF]/30 hover:shadow-xl hover:shadow-[#635BFF]/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#635BFF] to-[#00D4FF] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="inline-flex items-center px-2.5 py-1 bg-[#635BFF]/10 rounded-md text-[#635BFF] text-xs font-semibold mb-3">
                {feature.highlight}
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">{feature.title}</h3>
              <p className="text-[#425466] text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Before/After Preview */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-[#0A2540] mb-3">See the difference</h3>
            <p className="text-[#425466]">Real Stripe export transformation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-white rounded-xl border border-[#E3E8EE] overflow-hidden">
              <div className="px-4 py-3 bg-[#FF5C5C]/10 border-b border-[#E3E8EE] flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5C5C]" />
                <span className="text-sm font-semibold text-[#0A2540]">Before: Raw Stripe Export</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="text-xs font-mono w-full">
                  <thead>
                    <tr className="text-[#8898AA]">
                      <th className="text-left py-2 pr-4">id</th>
                      <th className="text-left py-2 pr-4">amount</th>
                      <th className="text-left py-2 pr-4">fee</th>
                      <th className="text-left py-2 pr-4">created</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#425466]">
                    <tr><td className="py-1 pr-4">ch_3Ox...kJw</td><td className="py-1 pr-4">9900</td><td className="py-1 pr-4">317</td><td className="py-1 pr-4">1706745600</td></tr>
                    <tr><td className="py-1 pr-4">ch_3Ox...pLm</td><td className="py-1 pr-4">4900</td><td className="py-1 pr-4">172</td><td className="py-1 pr-4">1706832000</td></tr>
                    <tr><td className="py-1 pr-4">ch_3Ox...qNr</td><td className="py-1 pr-4">14900</td><td className="py-1 pr-4">461</td><td className="py-1 pr-4">1706918400</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* After */}
            <div className="bg-white rounded-xl border border-[#00D924]/30 overflow-hidden shadow-lg shadow-[#00D924]/10">
              <div className="px-4 py-3 bg-[#00D924]/10 border-b border-[#00D924]/20 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00D924]" />
                <span className="text-sm font-semibold text-[#0A2540]">After: Accountant-Ready</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="text-xs font-mono w-full">
                  <thead>
                    <tr className="text-[#8898AA]">
                      <th className="text-left py-2 pr-4">Date</th>
                      <th className="text-left py-2 pr-4">Gross</th>
                      <th className="text-left py-2 pr-4">Fees</th>
                      <th className="text-left py-2 pr-4">Net</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#0A2540]">
                    <tr><td className="py-1 pr-4">Feb 1, 2024</td><td className="py-1 pr-4 text-[#0A2540]">$99.00</td><td className="py-1 pr-4 text-[#FF5C5C]">-$3.17</td><td className="py-1 pr-4 text-[#00D924] font-semibold">$95.83</td></tr>
                    <tr><td className="py-1 pr-4">Feb 2, 2024</td><td className="py-1 pr-4 text-[#0A2540]">$49.00</td><td className="py-1 pr-4 text-[#FF5C5C]">-$1.72</td><td className="py-1 pr-4 text-[#00D924] font-semibold">$47.28</td></tr>
                    <tr><td className="py-1 pr-4">Feb 3, 2024</td><td className="py-1 pr-4 text-[#0A2540]">$149.00</td><td className="py-1 pr-4 text-[#FF5C5C]">-$4.61</td><td className="py-1 pr-4 text-[#00D924] font-semibold">$144.39</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
