'use client';

import { useState, useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Upload your file',
    description: 'Drag and drop your CSV file or click to browse. Your file stays on your computer.',
  },
  {
    number: '02',
    title: 'Review detected issues',
    description: 'CleanCSV analyzes your file and identifies encoding problems, duplicates, and more.',
  },
  {
    number: '03',
    title: 'Download cleaned file',
    description: 'Preview changes, select what to fix, then download your cleaned CSV instantly.',
  },
];

export default function HowItWorks() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const totalDuration = 12; // 12 seconds - fast paced!

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - currentTime * 1000;

      const animate = () => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        if (elapsed >= totalDuration) {
          setCurrentTime(0);
          setIsPlaying(false);
          return;
        }
        setCurrentTime(elapsed);
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isPlaying, currentTime]);

  // Scene timings (total 12s)
  const getScene = () => {
    if (currentTime < 1.5) return 'intro';
    if (currentTime < 3) return 'problem';
    if (currentTime < 5) return 'drop';
    if (currentTime < 7.5) return 'diagnostic';
    if (currentTime < 9) return 'result';
    if (currentTime < 10.5) return 'download';
    return 'cta';
  };

  const scene = getScene();

  // Calculate transition progress within each scene
  const getProgress = (sceneStart: number, sceneDuration: number) => {
    return Math.min(Math.max((currentTime - sceneStart) / sceneDuration, 0), 1);
  };

  // Easing function for smooth animations
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-6">
            <span className="text-sm font-medium text-slate-600">3 simple steps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            From broken to clean in seconds
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No learning curve. No complex settings. Just results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video/Demo area */}
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
              {!isPlaying ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group" onClick={() => setIsPlaying(true)}>
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-8 left-8 w-16 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
                    <span className="text-white/60 text-xs font-mono">CSV</span>
                  </div>
                  <div className="absolute bottom-12 right-8 w-20 h-12 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-xs font-mono">Clean</span>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="text-5xl font-black text-white mb-2 tracking-tight">CleanCSV</div>
                    <div className="text-white/60 text-sm mb-8">See how it works</div>

                    <button
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:shadow-white/20"
                      aria-label="Play demo video"
                    >
                      <svg className="w-7 h-7 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <p className="mt-4 text-white/50 text-xs">12 sec</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 overflow-hidden bg-gray-900">
                  {/* Scene: Intro - Logo zoom in */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: scene === 'intro' ? 1 : 0,
                      transform: scene === 'intro'
                        ? `scale(${0.5 + easeOutBack(getProgress(0, 0.8)) * 0.5})`
                        : 'scale(1.5)',
                      transition: 'opacity 0.2s ease-out',
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E40AF 100%)',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="text-6xl font-black text-white tracking-tight"
                        style={{
                          transform: `translateY(${(1 - easeOutExpo(getProgress(0, 0.6))) * 30}px)`,
                        }}
                      >
                        CleanCSV
                      </div>
                      <div
                        className="text-white/70 mt-2 text-lg"
                        style={{
                          opacity: easeOutExpo(getProgress(0.3, 0.5)),
                          transform: `translateY(${(1 - easeOutExpo(getProgress(0.3, 0.5))) * 20}px)`,
                        }}
                      >
                        Fix broken CSV files
                      </div>
                    </div>
                  </div>

                  {/* Scene: Problem - Slide in from right */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    style={{
                      opacity: scene === 'problem' ? 1 : 0,
                      transform: scene === 'problem'
                        ? `translateX(${(1 - easeOutExpo(getProgress(1.5, 0.4))) * 100}%)`
                        : scene === 'drop' ? 'translateX(-100%)' : 'translateX(100%)',
                      transition: scene === 'drop' ? 'transform 0.3s ease-in, opacity 0.2s' : 'opacity 0.2s',
                      background: '#f8fafc',
                    }}
                  >
                    <div
                      className="text-xl font-bold text-gray-900 mb-4"
                      style={{
                        transform: `scale(${0.8 + easeOutBack(getProgress(1.5, 0.4)) * 0.2})`,
                      }}
                    >
                      Your CSV is broken?
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-4 font-mono text-sm border border-gray-100">
                      <table className="border-collapse">
                        <tbody>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2 bg-gray-50 font-semibold">Name</td>
                            <td className="border border-gray-200 px-4 py-2 bg-gray-50 font-semibold">Email</td>
                          </tr>
                          <tr>
                            <td
                              className="border border-gray-200 px-4 py-2 bg-red-50 text-red-600"
                              style={{
                                animation: scene === 'problem' ? 'pulse 0.5s ease-in-out infinite' : 'none',
                              }}
                            >MÃ¼ller</td>
                            <td
                              className="border border-gray-200 px-4 py-2 bg-red-50 text-red-600"
                              style={{
                                animation: scene === 'problem' ? 'pulse 0.5s ease-in-out infinite 0.1s' : 'none',
                              }}
                            >josÃ©@test.com</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-200 px-4 py-2 bg-amber-50 text-amber-600">  spaces  </td>
                            <td className="border border-gray-200 px-4 py-2 bg-amber-50 text-amber-600">duplicate</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Scene: Drop - Scale up */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-6"
                    style={{
                      opacity: scene === 'drop' ? 1 : 0,
                      transform: scene === 'drop'
                        ? `scale(${easeOutBack(getProgress(3, 0.5))})`
                        : 'scale(0.8)',
                      transition: 'opacity 0.2s',
                      background: '#f8fafc',
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-gray-100">
                      <div
                        className="border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300"
                        style={{
                          borderColor: currentTime > 4 ? '#22C55E' : '#E5E7EB',
                          backgroundColor: currentTime > 4 ? '#F0FDF4' : 'transparent',
                        }}
                      >
                        {currentTime < 4 ? (
                          <div style={{ animation: 'bounce 0.5s ease-in-out infinite' }}>
                            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div className="text-gray-500 font-medium">Drop CSV here</div>
                          </div>
                        ) : (
                          <div style={{ animation: 'scaleIn 0.3s ease-out' }}>
                            <div className="w-14 h-14 mx-auto rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="text-green-600 font-semibold mt-2">File loaded!</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Scene: Diagnostic - Issues pop in */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-4"
                    style={{
                      opacity: scene === 'diagnostic' ? 1 : 0,
                      transform: scene === 'diagnostic' ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'all 0.3s ease-out',
                      background: '#f8fafc',
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-md border border-gray-100">
                      <div className="text-base font-bold text-gray-900 mb-3">Issues detected</div>
                      <div className="space-y-2">
                        {[
                          { color: 'red', label: 'Broken encoding', count: '4 cells', delay: 0 },
                          { color: 'amber', label: 'Duplicate rows', count: '1 row', delay: 0.3 },
                          { color: 'blue', label: 'Extra whitespace', count: '2 cells', delay: 0.6 },
                        ].map((issue, i) => {
                          const issueProgress = getProgress(5 + issue.delay, 0.3);
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              style={{
                                opacity: easeOutExpo(issueProgress),
                                transform: `translateX(${(1 - easeOutBack(issueProgress)) * -50}px)`,
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full bg-${issue.color}-500`}
                                  style={{ backgroundColor: issue.color === 'red' ? '#EF4444' : issue.color === 'amber' ? '#F59E0B' : '#3B82F6' }}
                                />
                                <span className="text-sm text-gray-700 font-medium">{issue.label}</span>
                              </div>
                              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium">{issue.count}</span>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        className="w-full mt-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm shadow-lg shadow-blue-600/30"
                        style={{
                          animation: currentTime > 6.5 ? 'pulse 0.5s ease-in-out' : 'none',
                        }}
                      >
                        Clean File
                      </button>
                    </div>
                  </div>

                  {/* Scene: Result - Split screen comparison */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-4"
                    style={{
                      opacity: scene === 'result' ? 1 : 0,
                      transition: 'opacity 0.2s',
                      background: '#f8fafc',
                    }}
                  >
                    <div className="flex gap-3 w-full max-w-lg">
                      <div
                        className="flex-1 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                        style={{
                          transform: `translateX(${(1 - easeOutExpo(getProgress(7.5, 0.3))) * -100}px)`,
                          opacity: easeOutExpo(getProgress(7.5, 0.3)),
                        }}
                      >
                        <div className="text-xs font-bold text-red-500 uppercase mb-2 tracking-wide">Before</div>
                        <table className="w-full font-mono text-xs">
                          <tbody>
                            <tr><td className="py-1.5 px-2 bg-red-50 rounded text-red-600">MÃ¼ller</td></tr>
                            <tr><td className="py-1.5 px-2 bg-red-50 rounded text-red-600 mt-1">josÃ©@test</td></tr>
                            <tr><td className="py-1.5 px-2 bg-amber-50 rounded text-amber-600 mt-1">  spaces  </td></tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Arrow */}
                      <div
                        className="flex items-center"
                        style={{
                          opacity: easeOutExpo(getProgress(7.8, 0.3)),
                          transform: `scale(${easeOutBack(getProgress(7.8, 0.3))})`,
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>

                      <div
                        className="flex-1 bg-white rounded-xl shadow-lg p-4 border border-green-200"
                        style={{
                          transform: `translateX(${(1 - easeOutExpo(getProgress(8, 0.3))) * 100}px)`,
                          opacity: easeOutExpo(getProgress(8, 0.3)),
                        }}
                      >
                        <div className="text-xs font-bold text-green-500 uppercase mb-2 tracking-wide">After</div>
                        <table className="w-full font-mono text-xs">
                          <tbody>
                            <tr><td className="py-1.5 px-2 bg-green-50 rounded text-green-700">Müller</td></tr>
                            <tr><td className="py-1.5 px-2 bg-green-50 rounded text-green-700 mt-1">josé@test</td></tr>
                            <tr><td className="py-1.5 px-2 bg-green-50 rounded text-green-700 mt-1">spaces</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Scene: Download - Success celebration */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: scene === 'download' ? 1 : 0,
                      transform: scene === 'download' ? 'scale(1)' : 'scale(0.9)',
                      transition: 'all 0.3s ease-out',
                      background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/40"
                        style={{
                          animation: scene === 'download' ? 'bounceIn 0.5s ease-out' : 'none',
                        }}
                      >
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-3">File ready!</div>
                      <div
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-xl shadow-blue-600/30"
                        style={{
                          animation: scene === 'download' ? 'slideUp 0.3s ease-out 0.2s both' : 'none',
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </div>
                    </div>
                  </div>

                  {/* Scene: CTA - Final call */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      opacity: scene === 'cta' ? 1 : 0,
                      transition: 'opacity 0.3s',
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1E40AF 100%)',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="text-4xl font-black text-white mb-6 tracking-tight"
                        style={{
                          animation: scene === 'cta' ? 'fadeInUp 0.4s ease-out' : 'none',
                        }}
                      >
                        Try it now
                      </div>
                      <div
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                        style={{
                          animation: scene === 'cta' ? 'scaleIn 0.4s ease-out 0.2s both' : 'none',
                        }}
                      >
                        Get Started
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div
                        className="text-white/60 mt-4 text-sm"
                        style={{
                          animation: scene === 'cta' ? 'fadeIn 0.4s ease-out 0.4s both' : 'none',
                        }}
                      >
                        100% private processing
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div
                      className="h-full bg-white/80 transition-none"
                      style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                    />
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => { setIsPlaying(false); setCurrentTime(0); }}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gray-200 rounded-xl -z-10" />
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
