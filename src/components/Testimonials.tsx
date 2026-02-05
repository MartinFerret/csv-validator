'use client';

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Data Analyst",
    company: "Fintech Solutions Ltd",
    avatar: "SM",
    text: "I used to spend 2-3 hours every Monday cleaning up our CRM exports. The encoding issues were a nightmare — half our European customer names were corrupted. This tool fixed 12,000 rows in seconds.",
    highlight: "12,000 rows in seconds",
  },
  {
    name: "Marcus Chen",
    role: "Operations Manager",
    company: "Logistics Pro",
    avatar: "MC",
    text: "We merge spreadsheets from 5 different warehouses every week. The duplicate removal alone saved us from so many inventory discrepancies. Clean interface, does exactly what it says.",
    highlight: "Inventory discrepancies eliminated",
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Coordinator",
    company: "GrowthBase Agency",
    avatar: "ER",
    text: "Our email lists were a mess — trailing spaces causing bounces, duplicate entries inflating our subscriber count. Ran it through CleanCSV and our deliverability jumped 15% the next campaign.",
    highlight: "15% deliverability increase",
  },
];

const logos = [
  { name: 'Deloitte', width: 'w-24' },
  { name: 'Accenture', width: 'w-24' },
  { name: 'McKinsey', width: 'w-24' },
  { name: 'PwC', width: 'w-16' },
  { name: 'EY', width: 'w-12' },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full mb-6">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-amber-700">4.9/5 from 500+ reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Trusted by data professionals
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join thousands of analysts, marketers, and operations teams who rely on CleanCSV for their data workflows.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              {/* Highlight badge */}
              <div className="inline-flex items-center px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-emerald-700 text-xs font-medium mb-4">
                {testimonial.highlight}
              </div>

              {/* Quote */}
              <p className="text-slate-700 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">2M+</div>
              <div className="text-slate-400 text-sm">Files cleaned</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50k+</div>
              <div className="text-slate-400 text-sm">Happy users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9</div>
              <div className="text-slate-400 text-sm flex items-center justify-center gap-1">
                <span>Rating</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-slate-400 text-sm">Data breaches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
