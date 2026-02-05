'use client';

export default function SocialProofBar() {
  const stats = [
    { value: '2M+', label: 'Files processed', icon: '📊' },
    { value: '<1s', label: 'Processing time', icon: '⚡' },
    { value: '100%', label: 'Client-side', icon: '🔒' },
    { value: '0', label: 'Data stored', icon: '🛡️' },
  ];

  const companies = ['Deloitte', 'Accenture', 'McKinsey', 'PwC', 'EY', 'KPMG'];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company logos */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {companies.map((company) => (
              <span
                key={company}
                className="text-slate-300 font-semibold text-lg tracking-tight hover:text-slate-400 transition-colors"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
