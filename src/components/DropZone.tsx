'use client';

import { useCallback, useState, useEffect, useRef } from 'react';

interface DropZoneProps {
  onFileSelect: (file: File, content: string) => void;
  onLoadTestFile: () => void;
}

export default function DropZone({ onFileSelect, onLoadTestFile }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalDuration = 10;

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
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [isPlaying, currentTime]);

  const getScene = () => {
    if (currentTime < 2) return 'upload';
    if (currentTime < 4.5) return 'issues';
    if (currentTime < 7) return 'result';
    return 'download';
  };

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

  const scene = getScene();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full mb-6">
            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-slate-600">Enterprise-grade data processing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Fix broken CSV files
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              in seconds, not hours
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Repair encoding errors, eliminate duplicates, and clean formatting issues.
            <span className="text-slate-900 font-medium"> Your data never leaves your browser.</span>
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative rounded-2xl border-2
            transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center p-12
            ${isDragging
              ? 'border-blue-500 bg-blue-50/50 border-solid scale-[1.01] shadow-lg shadow-blue-500/10'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 border-dashed'
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
              <div className="w-12 h-12 border-[3px] border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium">Analyzing file...</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all ${isDragging ? 'bg-blue-100 scale-110' : 'bg-slate-100'}`}>
                <svg className={`w-8 h-8 transition-colors ${isDragging ? 'text-blue-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-xl font-semibold text-slate-900 mb-2">
                {isDragging ? 'Release to upload' : 'Drop your CSV file here'}
              </p>
              <p className="text-slate-500 mb-6">or click to browse your files</p>

              {/* Badges inline */}
              <div className="flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No server upload
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant results
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 font-medium">
                  <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No account needed
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Test file link */}
        <div className="text-center mt-4">
          <button
            onClick={onLoadTestFile}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Try with a sample file
          </button>
        </div>

        {/* Video Demo Section */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">See how it works</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {!isPlaying ? (
                /* Attractive Thumbnail */
                <div
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 cursor-pointer group overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30">
                      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20" />
                    </div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  {/* Floating CSV preview cards */}
                  <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="font-mono text-xs text-white/80">
                      <div className="text-red-300">MÃ¼ller, josÃ©</div>
                      <div className="text-amber-300">  spaces  </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 transform rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-400 text-xs font-medium">Fixed</span>
                    </div>
                    <div className="font-mono text-xs text-white/80">
                      <div className="text-green-300">Müller, josé</div>
                      <div className="text-green-300">spaces</div>
                    </div>
                  </div>

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Play button */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                      <button className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 group-hover:shadow-white/30">
                        <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">Watch the magic</h3>
                    <p className="text-white/60 text-sm">10 seconds to clean CSV</p>

                    {/* Feature pills */}
                    <div className="flex gap-3 mt-6">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs text-white/80 border border-white/20">
                        Fix Encoding
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs text-white/80 border border-white/20">
                        Remove Duplicates
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs text-white/80 border border-white/20">
                        Trim Spaces
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Video Player */
                <div className="absolute inset-0 bg-gray-50">
                  {/* Scene: Upload */}
                  {scene === 'upload' && (
                    <div className="absolute inset-0 flex items-center justify-center p-8 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border">
                        <div className="border-2 border-dashed border-green-500 bg-green-50 rounded-xl p-8 text-center">
                          <div className="w-14 h-14 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-3 shadow-lg shadow-green-500/30">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-green-700 font-semibold">data.csv uploaded</p>
                          <p className="text-green-600 text-sm mt-1">247 rows detected</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scene: Issues */}
                  {scene === 'issues' && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border">
                        <p className="font-bold text-gray-900 mb-4">Issues detected</p>
                        <div className="space-y-3">
                          {[
                            { color: '#EF4444', bg: '#FEF2F2', label: 'Encoding errors', count: '12 cells', icon: 'M12 9v2m0 4h.01' },
                            { color: '#F59E0B', bg: '#FFFBEB', label: 'Duplicate rows', count: '3 rows', icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' },
                            { color: '#3B82F6', bg: '#EFF6FF', label: 'Extra whitespace', count: '8 cells', icon: 'M4 6h16M4 12h16M4 18h7' },
                          ].map((issue, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl text-sm"
                              style={{
                                backgroundColor: issue.bg,
                                opacity: currentTime > 2.5 + i * 0.4 ? 1 : 0,
                                transform: currentTime > 2.5 + i * 0.4 ? 'translateX(0)' : 'translateX(-20px)',
                                transition: 'all 0.3s ease-out'
                              }}>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: issue.color + '20' }}>
                                  <svg className="w-4 h-4" style={{ color: issue.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={issue.icon} />
                                  </svg>
                                </div>
                                <span className="text-gray-700 font-medium">{issue.label}</span>
                              </div>
                              <span className="text-gray-500 text-xs bg-white px-2 py-1 rounded-full">{issue.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scene: Result */}
                  {scene === 'result' && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 animate-fade-in">
                      <div className="flex gap-4 w-full max-w-xl items-center">
                        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 border-2 border-red-100">
                          <p className="font-bold text-red-500 uppercase mb-3 text-xs tracking-wider">Before</p>
                          <div className="space-y-2 font-mono text-sm">
                            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg">MÃ¼ller</div>
                            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg">josÃ©@mail</div>
                            <div className="bg-amber-50 text-amber-600 px-3 py-2 rounded-lg">  spaces  </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>

                        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 border-2 border-green-200">
                          <p className="font-bold text-green-500 uppercase mb-3 text-xs tracking-wider">After</p>
                          <div className="space-y-2 font-mono text-sm">
                            <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg">Müller</div>
                            <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg">josé@mail</div>
                            <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg">spaces</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Scene: Download */}
                  {scene === 'download' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-green-50 to-white animate-fade-in">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30">
                          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-2">All clean!</p>
                        <p className="text-gray-500 mb-4">247 rows, 0 issues</p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all" style={{ width: `${(currentTime / totalDuration) * 100}%` }} />
                  </div>

                  {/* Close */}
                  <button
                    onClick={() => { setIsPlaying(false); setCurrentTime(0); }}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Decorative shadows */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl -z-10 opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
