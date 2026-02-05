'use client';

const steps = [
  {
    number: '01',
    title: 'Export from Stripe',
    description: 'Go to your Stripe Dashboard → Payments, Payouts, or Balance. Click "Export" and download the CSV.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Drop it here',
    description: 'Drag your Stripe CSV into our tool. It processes instantly in your browser - nothing is uploaded.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Download clean file',
    description: 'Get an accountant-ready CSV with clear columns: Date, Gross, Fees, Net, Payout ID, and more.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">
            Three steps. Ten seconds.
          </h2>
          <p className="text-lg text-[#425466] max-w-2xl mx-auto">
            No signup. No learning curve. Just cleaner Stripe data.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[calc(100%-200px)] h-0.5 bg-gradient-to-r from-transparent via-[#E3E8EE] to-transparent hidden md:block" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step number badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#635BFF] to-[#00D4FF] text-white mb-6 shadow-lg shadow-[#635BFF]/20">
                  {step.icon}
                </div>

                {/* Number pill */}
                <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0A2540] text-white text-xs font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#425466] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Export guide hint */}
        <div className="mt-16 bg-[#F6F9FC] rounded-2xl p-8 border border-[#E3E8EE]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#635BFF]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-[#0A2540] mb-1">Need help exporting from Stripe?</h4>
              <p className="text-[#425466] text-sm">
                In your Stripe Dashboard, go to any section (Payments, Payouts, etc.), set your date range, and click the "Export" button in the top right.
              </p>
            </div>
            <a
              href="https://stripe.com/docs/reporting/statements"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2 text-sm font-medium text-[#635BFF] border border-[#635BFF]/30 rounded-lg hover:bg-[#635BFF]/5 transition-colors"
            >
              Stripe docs →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
