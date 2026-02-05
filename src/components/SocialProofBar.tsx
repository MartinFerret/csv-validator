'use client';

export default function SocialProofBar() {
  const painPoints = [
    {
      problem: '"Why doesn\'t this match my bank?"',
      solution: 'Clear gross → fees → net breakdown',
    },
    {
      problem: '"Which payout is this payment in?"',
      solution: 'Grouped by payout with dates',
    },
    {
      problem: '"These column names make no sense"',
      solution: 'Human-readable column names',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E3E8EE]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider mb-3">
            The Problem
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mb-4">
            Stripe exports are confusing. We know.
          </h2>
          <p className="text-[#425466] max-w-2xl mx-auto">
            You&apos;ve stared at those CSVs. Trying to figure out what&apos;s gross, what&apos;s net,
            which fee is which. Your accountant asks questions. You don&apos;t have answers.
          </p>
        </div>

        {/* Pain points → Solutions */}
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="bg-[#F6F9FC] rounded-xl p-6 border border-[#E3E8EE] hover:shadow-lg transition-shadow"
            >
              <div className="text-[#FF5C5C] font-medium text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Before
              </div>
              <p className="text-[#0A2540] font-medium mb-4 italic">{item.problem}</p>
              <div className="border-t border-[#E3E8EE] pt-4">
                <div className="text-[#00D924] font-medium text-sm mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  After
                </div>
                <p className="text-[#425466]">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stripe export types we handle */}
        <div className="mt-12 pt-12 border-t border-[#E3E8EE]">
          <p className="text-center text-sm text-[#8898AA] mb-6">
            Works with all Stripe export types
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Payments', 'Balance Transactions', 'Payouts', 'Refunds', 'Customers', 'Invoices'].map((type) => (
              <span
                key={type}
                className="px-4 py-2 bg-[#F6F9FC] border border-[#E3E8EE] rounded-lg text-sm text-[#425466] font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
