'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppState, Issue, Separator, CSVData, FileInfo, CleaningResult } from '@/types';
import { diagnoseCSV, cleanCSV, generateTestFile } from '@/lib/csv-utils';
import DropZone from './DropZone';
import Diagnostic from './Diagnostic';
import Preview from './Preview';
import Result from './Result';

type PaymentStatus = 'idle' | 'success' | 'cancelled' | 'error';

export default function CSVCleaner() {
  const [appState, setAppState] = useState<AppState>('initial');
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [rawContent, setRawContent] = useState<string>('');
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [outputSeparator, setOutputSeparator] = useState<Separator>(';');
  const [cleanedData, setCleanedData] = useState<CSVData | null>(null);
  const [cleaningResult, setCleaningResult] = useState<CleaningResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  // Check for payment status on URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentParam = params.get('payment');

    if (paymentParam === 'success') {
      setIsPaid(true);
      setPaymentStatus('success');
    } else if (paymentParam === 'cancelled') {
      setPaymentStatus('cancelled');
    }

    // Clean URL
    if (paymentParam) {
      const url = new URL(window.location.href);
      url.searchParams.delete('payment');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Restore state from sessionStorage if coming back from payment
  useEffect(() => {
    if (paymentStatus === 'success' || paymentStatus === 'cancelled') {
      const savedState = sessionStorage.getItem('cleancsv_state');
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          setFileInfo(state.fileInfo);
          setRawContent(state.rawContent);
          setCsvData(state.csvData);
          setIssues(state.issues);
          setOutputSeparator(state.outputSeparator);
          setCleanedData(state.cleanedData);
          setCleaningResult(state.cleaningResult);
          setAppState('cleaned');
        } catch {
          console.error('Failed to restore state');
        }
      }
    }
  }, [paymentStatus]);

  const handleFileSelect = useCallback((file: File, content: string) => {
    setFileInfo({
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
    });
    setRawContent(content);

    const diagnosis = diagnoseCSV(content);
    setCsvData(diagnosis.original);
    setIssues(diagnosis.issues);
    setOutputSeparator(diagnosis.detectedSeparator);
    setAppState('diagnosed');
    setCleanedData(null);
    setCleaningResult(null);
    setPaymentStatus('idle');
    setIsPaid(false);
  }, []);

  const handleLoadTestFile = useCallback(() => {
    const content = generateTestFile();
    const fakeFile = new File([content], 'test_data.csv', { type: 'text/csv' });
    handleFileSelect(fakeFile, content);
  }, [handleFileSelect]);

  const handleIssueToggle = useCallback((id: string, enabled: boolean) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { ...issue, enabled } : issue
      )
    );
  }, []);

  const handleClean = useCallback(() => {
    if (!csvData) return;

    setAppState('cleaning');

    // Small delay for animation
    setTimeout(() => {
      const result = cleanCSV(csvData, issues, outputSeparator);
      setCleanedData(result.cleaned);
      setCleaningResult(result);
      setAppState('cleaned');

      // Save state to sessionStorage for payment redirect
      sessionStorage.setItem('cleancsv_state', JSON.stringify({
        fileInfo,
        rawContent,
        csvData,
        issues,
        outputSeparator,
        cleanedData: result.cleaned,
        cleaningResult: result,
      }));
    }, 500);
  }, [csvData, issues, outputSeparator, fileInfo, rawContent]);

  const handleChangeFile = useCallback(() => {
    setAppState('initial');
    setFileInfo(null);
    setRawContent('');
    setCsvData(null);
    setIssues([]);
    setCleanedData(null);
    setCleaningResult(null);
    setShowPreview(false);
    setPaymentStatus('idle');
    setIsPaid(false);
    sessionStorage.removeItem('cleancsv_state');
  }, []);

  const handleDownload = useCallback(() => {
    // Download handled in Result component
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content based on state */}
      {appState === 'initial' && (
        <DropZone
          onFileSelect={handleFileSelect}
          onLoadTestFile={handleLoadTestFile}
        />
      )}

      {appState === 'diagnosed' && csvData && fileInfo && (
        <Diagnostic
          fileInfo={fileInfo}
          data={csvData}
          issues={issues}
          onIssueToggle={handleIssueToggle}
          onSeparatorChange={setOutputSeparator}
          outputSeparator={outputSeparator}
          onClean={handleClean}
          onChangeFile={handleChangeFile}
          onPreview={() => setShowPreview(true)}
        />
      )}

      {appState === 'cleaning' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6">
              <div className="w-full h-full border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Cleaning your file...</h2>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-blue-600 animate-shimmer rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </section>
      )}

      {appState === 'cleaned' && cleanedData && cleaningResult && fileInfo && (
        <Result
          fileInfo={fileInfo}
          cleanedData={cleanedData}
          cleaningResult={cleaningResult}
          isPaid={isPaid}
          paymentStatus={paymentStatus}
          onDownload={handleDownload}
          onCleanAnother={handleChangeFile}
        />
      )}

      {/* Preview modal */}
      {showPreview && csvData && (
        <Preview
          originalData={csvData}
          issues={issues}
          outputSeparator={outputSeparator}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
