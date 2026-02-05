'use client';

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Founder",
    company: "SaaS Metrics Co",
    avatar: "AT",
    text: "Month-end used to mean 3 hours of Excel hell matching Stripe payouts to my bank. Now it's a 2-minute job. My bookkeeper actually thanked me.",
    highlight: "3 hours → 2 minutes",
  },
  {
    name: "Marie Dubois",
    role: "Freelance Designer",
    company: "Paris, France",
    avatar: "MD",
    text: "I never understood why my Stripe deposits didn't match my invoices. This tool finally showed me the fees breakdown clearly. Worth every cent for the peace of mind.",
    highlight: "Finally understand fees",
  },
  {
    name: "James Chen",
    role: "Agency Owner",
    company: "Pixel & Code",
    avatar: "JC",
    text: "We process 200+ Stripe payments monthly for clients. The payout grouping feature alone saves us hours. No more hunting for which payment is in which bank transfer.",
    highlight: "200+ payments, hours saved",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider mb-3">
            Real Users
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">
            They fixed their Stripe headaches
          </h2>
          <p className="text-[#425466] text-lg max-w-2xl mx-auto">
            Join freelancers, founders, and agencies who stopped wrestling with Stripe exports.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-[#F6F9FC] rounded-2xl p-8 border border-[#E3E8EE] hover:bg-white hover:border-[#635BFF]/30 hover:shadow-xl hover:shadow-[#635BFF]/5 transition-all duration-300"
            >
              {/* Highlight badge */}
              <div className="inline-flex items-center px-2.5 py-1 bg-[#00D924]/10 border border-[#00D924]/20 rounded-md text-[#00D924] text-xs font-semibold mb-4">
                {testimonial.highlight}
              </div>

              {/* Quote */}
              <p className="text-[#425466] leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E3E8EE]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#635BFF] to-[#00D4FF] flex items-center justify-center text-white text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-[#0A2540]">{testimonial.name}</div>
                  <div className="text-sm text-[#8898AA]">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Who it's for */}
        <div className="bg-[#0A2540] rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Built for people like you</h3>
            <p className="text-white/60">Not accountants. Real business owners.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '💻', title: 'Freelancers', desc: 'Track income & fees clearly' },
              { icon: '🚀', title: 'SaaS Founders', desc: 'Reconcile subscriptions fast' },
              { icon: '🏢', title: 'Agencies', desc: 'Manage client payments' },
              { icon: '📊', title: 'Bookkeepers', desc: 'Get accountant-ready files' },
            ].map((persona, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-3">{persona.icon}</div>
                <div className="font-semibold text-white mb-1">{persona.title}</div>
                <div className="text-sm text-white/50">{persona.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
