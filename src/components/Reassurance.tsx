'use client';

export default function Reassurance() {
  const features = [
    {
      icon: '🔒',
      title: '100% Private',
      description: 'Your file never leaves your browser. Zero upload, zero storage, zero tracking.',
    },
    {
      icon: '⚡',
      title: 'Instant',
      description: 'Processing in seconds, even for 50,000+ row files.',
    },
    {
      icon: '✅',
      title: 'Reliable',
      description: 'Deterministic algorithms. What we show you is exactly what you get.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-12">
          Why trust us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#6B7280]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
