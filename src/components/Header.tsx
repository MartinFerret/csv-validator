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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
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
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              Security
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              FAQ
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Security indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-700">Client-side only</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToTop}
              className="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
