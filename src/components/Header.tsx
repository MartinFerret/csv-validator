'use client';

import Logo from './Logo';

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E3E8EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Logo size="md" />
          </a>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-4 py-2 text-sm text-[#425466] hover:text-[#0A2540] hover:bg-[#F6F9FC] rounded-lg transition-all"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-4 py-2 text-sm text-[#425466] hover:text-[#0A2540] hover:bg-[#F6F9FC] rounded-lg transition-all"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-4 py-2 text-sm text-[#425466] hover:text-[#0A2540] hover:bg-[#F6F9FC] rounded-lg transition-all"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-4 py-2 text-sm text-[#425466] hover:text-[#0A2540] hover:bg-[#F6F9FC] rounded-lg transition-all"
            >
              FAQ
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Stripe badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#635BFF]/5 border border-[#635BFF]/20 rounded-lg">
              <svg className="w-4 h-4 text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
              </svg>
              <span className="text-xs font-medium text-[#635BFF]">For Stripe Users</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToTop}
              className="px-5 py-2 bg-[#635BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#5851EA] transition-all shadow-sm hover:shadow-md"
            >
              Clean My Export
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
