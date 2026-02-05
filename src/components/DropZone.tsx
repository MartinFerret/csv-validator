'use client';

import { useCallback, useState } from 'react';

interface DropZoneProps {
  onFileSelect: (file: File, content: string) => void;
  onLoadTestFile: () => void;
}

export default function DropZone({ onFileSelect, onLoadTestFile }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, []);

  const processFile = async (file: File) => {
    setIsLoading(true);
    try {
      const content = await file.text();
      onFileSelect(file, content);
    } catch {
      console.error('Error reading file');
    } finally {
      setIsLoading(false);
    }
  };

  const exportTypes = [
    { name: 'Payments', icon: '💳' },
    { name: 'Payouts', icon: '🏦' },
    { name: 'Balance', icon: '📊' },
    { name: 'Refunds', icon: '↩️' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero background - Stripe dark gradient */}
      <div className="absolute inset-0 bg-[#0A2540]">
        {/* Gradient mesh */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#635BFF] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00D4FF] rounded-full blur-[150px]" />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Stripe badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
            </svg>
            <span className="text-sm font-medium text-white">Built for Stripe exports</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Your Stripe exports are
            <br />
            <span className="text-gradient-accent">a mess.</span>
            {' '}We fix that.
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-4">
            Transform confusing Stripe CSV exports into clean,
            <span className="text-white font-medium"> accountant-ready</span> files.
            Gross, fees, net - finally clear.
          </p>
          <p className="text-sm text-white/50">
            One-time payment per file. No subscription. No account needed.
          </p>
        </div>

        {/* Export types supported */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {exportTypes.map((type) => (
            <div
              key={type.name}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
            >
              <span>{type.icon}</span>
              <span className="text-sm text-white/80">{type.name}</span>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative rounded-2xl border-2 backdrop-blur-xl
            transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center p-12
            ${isDragging
              ? 'border-[#635BFF] bg-[#635BFF]/20 border-solid scale-[1.02] shadow-2xl shadow-[#635BFF]/20'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }
          `}
        >
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-12 h-12 border-[3px] border-white/20 border-t-[#635BFF] rounded-full animate-spin"></div>
              <p className="text-white/80 font-medium">Analyzing your Stripe export...</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all ${isDragging ? 'bg-[#635BFF] scale-110' : 'bg-white/10'}`}>
                <svg className={`w-10 h-10 transition-colors ${isDragging ? 'text-white' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-white mb-2">
                {isDragging ? 'Release to upload' : 'Drop your Stripe CSV here'}
              </p>
              <p className="text-white/50 mb-8">or click to browse your files</p>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
                  <svg className="w-4 h-4 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  100% in browser
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
                  <svg className="w-4 h-4 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant result
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70">
                  <svg className="w-4 h-4 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Accountant-ready
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Test file link */}
        <div className="text-center mt-6">
          <button
            onClick={onLoadTestFile}
            className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
          >
            Try with a sample Stripe export
          </button>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">$9.99</div>
            <div className="text-sm text-white/50">Per file, no subscription</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">&lt;10s</div>
            <div className="text-sm text-white/50">Processing time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">0</div>
            <div className="text-sm text-white/50">Data stored on servers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
