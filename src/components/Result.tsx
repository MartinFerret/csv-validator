'use client';

import { useState } from 'react';
import { CSVData, CleaningResult, FileInfo } from '@/types';
import { csvToString } from '@/lib/csv-utils';
import { FREE_ROW_LIMIT, PRICE_AMOUNT } from '@/lib/config';

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
  isPaid,
  paymentStatus,
  onDownload,
  onCleanAnother,
}: ResultProps) {
  const [isLoading, setIsLoading] = useState(false);

  const isFree = cleanedData.rowCount <= FREE_ROW_LIMIT;
  const canDownload = isFree || isPaid;

  const handleDownload = () => {
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
  };

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  // Determine which header to show (only ONE)
  const renderHeader = () => {
    // Case 1: File is free - show success
    if (isFree) {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-green-50 to-white border-b border-gray-100">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center animate-check-pop">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your file is ready!</h2>
          <p className="text-gray-600 mt-1">{cleanedData.rowCount.toLocaleString()} rows cleaned successfully</p>
        </div>
      );
    }

    // Case 2: Not free, but payment succeeded
    if (paymentStatus === 'success' && isPaid) {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-green-50 to-white border-b border-gray-100">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center animate-check-pop">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Payment successful!</h2>
          <p className="text-gray-600 mt-1">Your file is ready to download.</p>
        </div>
      );
    }

    // Case 3: Not free, payment was cancelled
    if (paymentStatus === 'cancelled') {
      return (
        <div className="px-6 py-6 text-center bg-gradient-to-b from-amber-50 to-white border-b border-gray-100">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Payment cancelled</h2>
          <p className="text-gray-600 mt-1">No worries! You can try again when you&apos;re ready.</p>
        </div>
      );
    }

    // Case 4: Not free, not paid (idle or error) - show locked state
    return (
      <div className="px-6 py-6 text-center bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
          <svg className="w-7 h-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">File cleaned!</h2>
        <p className="text-gray-600 mt-1">{cleanedData.rowCount.toLocaleString()} rows - Unlock to download</p>
      </div>
    );
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Single header based on state */}
          {renderHeader()}

          {/* Fixes applied */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Fixes applied
            </h3>
            <ul className="space-y-2">
              {cleaningResult.appliedFixes.map((fix, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {fix}
                </li>
              ))}
              {cleaningResult.appliedFixes.length === 0 && (
                <li className="text-gray-500 text-sm">No changes were needed</li>
              )}
            </ul>
          </div>

          {/* Preview table */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
              Preview
            </h3>
            <div className="relative overflow-x-auto rounded-lg border border-gray-200">
              <table className="csv-table w-full">
                <thead>
                  <tr>
                    {cleanedData.headers.map((header, idx) => (
                      <th key={idx} className="bg-gray-50 text-gray-700 font-medium text-sm">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={!canDownload ? 'blur-sm select-none' : ''}>
                  {cleanedData.rows.slice(0, 5).map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="text-sm text-gray-600">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Paywall overlay */}
              {!canDownload && (
                <div className="absolute inset-0 top-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Unlock to download</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Download or Pay section */}
          <div className="px-6 py-6">
            {canDownload ? (
              /* FREE DOWNLOAD */
              <div className="text-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3
                           bg-blue-600 text-white font-medium rounded-lg
                           hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  {fileInfo.name.replace(/\.csv$/i, '')}_clean.csv
                </p>
                <button
                  onClick={onCleanAnother}
                  className="block w-full mt-4 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  Clean another file
                </button>
              </div>
            ) : (
              /* PAID DOWNLOAD */
              <div className="text-center">
                <button
                  onClick={handlePay}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3
                           bg-blue-600 text-white font-medium rounded-lg
                           hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-lg shadow-blue-600/20"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Unlock for ${PRICE_AMOUNT}
                    </>
                  )}
                </button>

                <p className="mt-3 text-sm text-gray-500">
                  One-time payment for files over {FREE_ROW_LIMIT} rows
                </p>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="block w-full mt-6 text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Clean a different file
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
