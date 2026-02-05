'use client';

import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A2540]">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <Logo size="lg" variant="white" />
            </div>
            <p className="text-white/50 mb-8 max-w-sm leading-relaxed">
              Transform confusing Stripe exports into accountant-ready CSVs.
              Your data stays in your browser - no uploads, no servers, no compromise.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                <svg className="w-4 h-4 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-medium text-white/70">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                <svg className="w-4 h-4 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs font-medium text-white/70">Zero Upload</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { label: 'How it Works', id: 'how-it-works' },
                { label: 'Features', id: 'features' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'FAQ', id: 'faq' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stripe Exports */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Supported Exports</h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>Payments</li>
              <li>Balance Transactions</li>
              <li>Payouts</li>
              <li>Refunds</li>
              <li>Invoices</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>

            <h3 className="text-sm font-semibold text-white mt-8 mb-4">Contact</h3>
            <a href="mailto:mferret.pro@gmail.com" className="text-[#635BFF] hover:underline text-sm">
              mferret.pro@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} CleanCSV. All rights reserved.
            </p>
            <p className="text-sm text-white/30 flex items-center gap-2">
              <span>Built for</span>
              <svg className="w-4 h-4 text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
              </svg>
              <span>Stripe users</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
