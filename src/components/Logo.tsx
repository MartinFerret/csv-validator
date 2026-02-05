'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'white';
}

export default function Logo({ size = 'md', showText = true, variant = 'default' }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  };

  const { icon, text } = sizes[size];
  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900';

  return (
    <div className="flex items-center gap-2.5">
      {/* Logo Icon */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Background shape - rounded square with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="50%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
              <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
            </filter>
          </defs>

          {/* Main rounded square */}
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="12"
            fill="url(#logoGradient)"
          />

          {/* Shine overlay */}
          <rect
            x="4"
            y="4"
            width="40"
            height="20"
            rx="12"
            fill="url(#shineGradient)"
          />

          {/* CSV grid lines - stylized spreadsheet */}
          <g opacity="0.3">
            <line x1="18" y1="12" x2="18" y2="36" stroke="white" strokeWidth="1.5" />
            <line x1="30" y1="12" x2="30" y2="36" stroke="white" strokeWidth="1.5" />
            <line x1="12" y1="20" x2="36" y2="20" stroke="white" strokeWidth="1.5" />
            <line x1="12" y1="28" x2="36" y2="28" stroke="white" strokeWidth="1.5" />
          </g>

          {/* Sparkle/clean effect - top right */}
          <g>
            <circle cx="34" cy="14" r="3" fill="white" opacity="0.9" />
            <line x1="34" y1="9" x2="34" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="34" y1="17" x2="34" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="29" y1="14" x2="31" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="37" y1="14" x2="39" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Checkmark - center/bottom */}
          <path
            d="M16 25L21 30L32 19"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Animated pulse ring (optional, subtle) */}
        <div className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Text */}
      {showText && (
        <span className={`${text} font-semibold ${textColor} tracking-tight`}>
          Clean<span className={variant === 'white' ? 'text-blue-400' : 'text-blue-600'}>CSV</span>
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
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#faviconGradient)" />

      {/* Grid lines */}
      <g opacity="0.3">
        <line x1="18" y1="12" x2="18" y2="36" stroke="white" strokeWidth="1.5" />
        <line x1="30" y1="12" x2="30" y2="36" stroke="white" strokeWidth="1.5" />
        <line x1="12" y1="20" x2="36" y2="20" stroke="white" strokeWidth="1.5" />
        <line x1="12" y1="28" x2="36" y2="28" stroke="white" strokeWidth="1.5" />
      </g>

      {/* Sparkle */}
      <circle cx="34" cy="14" r="3" fill="white" opacity="0.9" />
      <line x1="34" y1="9" x2="34" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="17" x2="34" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="29" y1="14" x2="31" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="37" y1="14" x2="39" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Checkmark */}
      <path
        d="M16 25L21 30L32 19"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
