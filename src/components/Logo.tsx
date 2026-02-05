'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'white';
}

export default function Logo({ size = 'md', showText = true, variant = 'default' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
    md: { icon: 36, text: 'text-xl', gap: 'gap-2.5' },
    lg: { icon: 44, text: 'text-2xl', gap: 'gap-3' },
  };

  const { icon, text, gap } = sizes[size];
  const textColor = variant === 'white' ? 'text-white' : 'text-[#0A2540]';

  return (
    <div className={`flex items-center ${gap}`}>
      {/* Logo Icon - Stripe-inspired */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="stripeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id="stripeGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A2540" />
              <stop offset="100%" stopColor="#1A3A5C" />
            </linearGradient>
          </defs>

          {/* Background shape - rounded square */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="url(#stripeGradient)"
          />

          {/* Stripe-style "S" shape abstraction - represents data flow */}
          <path
            d="M16 14h16c2 0 3 1 3 3v2c0 2-1 3-3 3H16c-2 0-3 1-3 3v2c0 2 1 3 3 3h16"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />

          {/* Arrow indicating export/transformation */}
          <path
            d="M20 24h8M25 20l4 4-4 4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Checkmark - clean/validated */}
          <circle cx="36" cy="12" r="6" fill="white" opacity="0.9" />
          <path
            d="M33 12l2 2 4-4"
            stroke="url(#stripeGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span className={`${text} font-bold ${textColor} tracking-tight`}>
          Stripe<span className="text-gradient">Clear</span>
        </span>
      )}
    </div>
  );
}

// Standalone icon for favicon use
export function LogoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#635BFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#faviconGradient)" />

      <path
        d="M20 24h8M25 20l4 4-4 4"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <circle cx="36" cy="12" r="6" fill="white" opacity="0.9" />
      <path
        d="M33 12l2 2 4-4"
        stroke="#635BFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
