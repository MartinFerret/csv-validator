'use client';

import { useState, useEffect, useCallback } from 'react';
import { CSVData, CleaningResult, FileInfo } from '@/types';
import { csvToString } from '@/lib/csv-utils';
import { FREE_ROW_LIMIT, PRICING, PackType } from '@/lib/config';
import { getCredits, addCredits, useCredit, isSessionUsed } from '@/lib/credits';

interface ResultProps {
  fileInfo: FileInfo;
  cleanedData: CSVData;
  cleaningResult: CleaningResult;
  isPaid: boolean;
  paymentStatus: 'idle' | 'success' | 'cancelled' | 'error';
  onDownload: () => void;
  onCleanAnother: () => void;
}

export default function Result({
  fileInfo,
  cleanedData,
  cleaningResult,
  isPaid: initialIsPaid,
  paymentStatus,
  onDownload,
  onCleanAnother,
}: ResultProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPack, setSelectedPack] = useState<PackType>('single');
  const [credits, setCredits] = useState(0);
  const [showPackSelection, setShowPackSelection] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isPaid, setIsPaid] = useState(initialIsPaid);

  const isFree = cleanedData.rowCount <= FREE_ROW_LIMIT;
  const hasCredits = credits > 0;
  const canDownload = isFree || isPaid || hasCredits;

  // Load credits on mount
  useEffect(() => {
    setCredits(getCredits());
  }, []);

  // Verify session and add credits on payment success
  useEffect(() => {
    const verifyAndAddCredits = async () => {
      if (paymentStatus !== 'success') return;

      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');

      if (!sessionId || isSessionUsed(sessionId)) {
        setIsPaid(true);
        return;
      }

      setVerifying(true);

      try {
        const response = await fetch('/api/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          const newCredits = addCredits(data.files, sessionId);
          setCredits(newCredits);
          setIsPaid(true);
        }
      } catch (error) {
        console.error('Failed to verify session:', error);
      } finally {
        setVerifying(false);
      }
    };

    verifyAndAddCredits();
  }, [paymentStatus]);

  const handleDownload = useCallback(() => {
    // If using credits (not free and not just paid), consume one
    if (!isFree && !isPaid && hasCredits) {
      const used = useCredit();
      if (!used) {
        alert('Failed to use credit. Please try again.');
        return;
      }
      setCredits(prev => prev - 1);
    }

    const csvContent = csvToString(cleanedData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const cleanName = fileInfo.name.replace(/\.csv$/i, '') + '_clean.csv';
    link.href = url;
    link.download = cleanName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onDownload();
  }, [cleanedData, fileInfo.name, isFree, isPaid, hasCredits, onDownload]);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packType: selectedPack }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
    }
  };

  const renderHeader = () => {
    if (verifying) {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-[#635BFF]/10 to-white border-b border-[#E3E8EE]">
          <div className="w-14 h-14 mx-auto mb-4 border-4 border-[#E3E8EE] border-t-[#635BFF] rounded-full animate-spin"></div>
          <h2 className="text-xl font-bold text-[#0A2540]">Verifying payment...</h2>
        </div>
      );
    }

    if (isFree) {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-[#00D924]/10 to-white border-b border-[#E3E8EE]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#00D924] flex items-center justify-center animate-check-pop">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0A2540]">Your file is ready!</h2>
          <p className="text-[#425466] mt-1">{cleanedData.rowCount.toLocaleString()} rows cleaned successfully</p>
        </div>
      );
    }

    if (paymentStatus === 'success' && isPaid) {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-[#00D924]/10 to-white border-b border-[#E3E8EE]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#00D924] flex items-center justify-center animate-check-pop">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0A2540]">Payment successful!</h2>
          <p className="text-[#425466] mt-1">Your file is ready to download.</p>
          {credits > 0 && (
            <p className="text-sm text-[#635BFF] mt-2 font-medium">
              {credits} credit{credits !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      );
    }

    if (hasCredits) {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-[#635BFF]/10 to-white border-b border-[#E3E8EE]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#635BFF] flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0A2540]">File cleaned!</h2>
          <p className="text-[#425466] mt-1">{cleanedData.rowCount.toLocaleString()} rows ready to download</p>
          <p className="text-sm text-[#635BFF] mt-2 font-medium">
            Using 1 of your {credits} credit{credits !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }

    if (paymentStatus === 'cancelled') {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-amber-50 to-white border-b border-[#E3E8EE]">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#0A2540]">Payment cancelled</h2>
          <p className="text-[#425466] mt-1">No worries! You can try again when you&apos;re ready.</p>
        </div>
      );
    }

    return (
      <div className="px-6 py-6 text-center bg-gradient-to-b from-[#F6F9FC] to-white border-b border-[#E3E8EE]">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#E3E8EE] flex items-center justify-center">
          <svg className="w-7 h-7 text-[#8898AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#0A2540]">File cleaned!</h2>
        <p className="text-[#425466] mt-1">{cleanedData.rowCount.toLocaleString()} rows - Unlock to download</p>
      </div>
    );
  };

  const renderPackSelection = () => {
    const packs = Object.values(PRICING);

    return (
      <div className="space-y-3">
        {packs.map((pack) => (
          <button
            key={pack.id}
            onClick={() => setSelectedPack(pack.id as PackType)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedPack === pack.id
                ? 'border-[#635BFF] bg-[#635BFF]/5'
                : 'border-[#E3E8EE] hover:border-[#635BFF]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0A2540]">{pack.name}</span>
                  {pack.id === 'pack3' && (
                    <span className="text-xs bg-[#635BFF] text-white px-2 py-0.5 rounded-full font-medium">
                      BEST VALUE
                    </span>
                  )}
                </div>
                <div className="text-sm text-[#8898AA] mt-1">
                  {pack.files === 1 ? '1 file' : `${pack.files} files • $${pack.pricePerFile.toFixed(2)}/file`}
                  {pack.savingsPercent > 0 && (
                    <span className="text-[#00D924] ml-2">Save {pack.savingsPercent}%</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#0A2540]">${pack.price}</div>
                {selectedPack === pack.id && (
                  <div className="w-5 h-5 rounded-full bg-[#635BFF] flex items-center justify-center mt-1 ml-auto">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-[#E3E8EE] shadow-sm overflow-hidden">
          {renderHeader()}

          {/* Fixes applied */}
          <div className="px-6 py-5 border-b border-[#E3E8EE]">
            <h3 className="text-sm font-medium text-[#8898AA] uppercase tracking-wide mb-3">
              Fixes applied
            </h3>
            <ul className="space-y-2">
              {cleaningResult.appliedFixes.map((fix, idx) => (
                <li key={idx} className="flex items-center gap-2 text-[#425466] text-sm">
                  <svg className="w-4 h-4 text-[#00D924] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {fix}
                </li>
              ))}
              {cleaningResult.appliedFixes.length === 0 && (
                <li className="text-[#8898AA] text-sm">No changes were needed</li>
              )}
            </ul>
          </div>

          {/* Preview table */}
          <div className="px-6 py-5 border-b border-[#E3E8EE]">
            <h3 className="text-sm font-medium text-[#8898AA] uppercase tracking-wide mb-3">
              Preview
            </h3>
            <div className="relative overflow-x-auto rounded-lg border border-[#E3E8EE]">
              <table className="csv-table w-full">
                <thead>
                  <tr>
                    {cleanedData.headers.map((header, idx) => (
                      <th key={idx} className="bg-[#F6F9FC] text-[#0A2540] font-medium text-sm">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={!canDownload ? 'blur-sm select-none' : ''}>
                  {cleanedData.rows.slice(0, 5).map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="text-sm text-[#425466]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {!canDownload && (
                <div className="absolute inset-0 top-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#F6F9FC] flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#8898AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[#425466]">Unlock to download</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Download or Pay section */}
          <div className="px-6 py-6">
            {canDownload ? (
              <div className="text-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3
                           bg-gradient-to-r from-[#635BFF] to-[#00D4FF] text-white font-medium rounded-lg
                           hover:opacity-90 transition-opacity shadow-lg shadow-[#635BFF]/20"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Clean File
                </button>
                <p className="mt-2 text-sm text-[#8898AA]">
                  {fileInfo.name.replace(/\.csv$/i, '')}_clean.csv
                </p>
                {credits > 0 && !isFree && (
                  <p className="mt-1 text-xs text-[#635BFF]">
                    {credits - (isPaid ? 0 : 1)} credit{credits - (isPaid ? 0 : 1) !== 1 ? 's' : ''} will remain after download
                  </p>
                )}
                <button
                  onClick={onCleanAnother}
                  className="block w-full mt-4 text-[#8898AA] hover:text-[#0A2540] text-sm font-medium transition-colors"
                >
                  Clean another file
                </button>
              </div>
            ) : (
              <div className="text-center">
                {showPackSelection ? (
                  <>
                    <h3 className="font-semibold text-[#0A2540] mb-4">Choose your pack</h3>
                    {renderPackSelection()}

                    <button
                      onClick={handlePay}
                      disabled={isLoading}
                      className="w-full mt-6 inline-flex items-center justify-center gap-2 px-8 py-3
                               bg-gradient-to-r from-[#635BFF] to-[#00D4FF] text-white font-medium rounded-lg
                               hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
                               shadow-lg shadow-[#635BFF]/20"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                          </svg>
                          Pay ${PRICING[selectedPack].price} with Stripe
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setShowPackSelection(false)}
                      className="block w-full mt-4 text-[#8898AA] hover:text-[#0A2540] text-sm transition-colors"
                    >
                      ← Back
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowPackSelection(true)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3
                               bg-gradient-to-r from-[#635BFF] to-[#00D4FF] text-white font-medium rounded-lg
                               hover:opacity-90 transition-opacity
                               shadow-lg shadow-[#635BFF]/20"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Unlock for ${PRICING.single.price}
                    </button>

                    <p className="mt-3 text-sm text-[#8898AA]">
                      One-time payment • Files over {FREE_ROW_LIMIT} rows
                    </p>

                    <button
                      onClick={() => setShowPackSelection(true)}
                      className="mt-2 text-sm text-[#635BFF] hover:underline font-medium"
                    >
                      Need multiple files? View packs →
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#8898AA]">
                      <svg className="w-4 h-4 text-[#00D924]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure payment via Stripe
                    </div>

                    {paymentStatus === 'error' && (
                      <p className="mt-4 text-sm text-red-600">
                        Payment failed. Please try again.
                      </p>
                    )}

                    <button
                      onClick={onCleanAnother}
                      className="block w-full mt-6 text-[#8898AA] hover:text-[#0A2540] text-sm transition-colors"
                    >
                      Clean a different file
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Credits banner */}
        {credits > 0 && !canDownload && (
          <div className="mt-4 p-4 bg-[#635BFF]/10 border border-[#635BFF]/20 rounded-xl text-center">
            <p className="text-sm text-[#0A2540]">
              <span className="font-semibold">You have {credits} credit{credits !== 1 ? 's' : ''}</span>
              {' '}- this file will use one of them
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
