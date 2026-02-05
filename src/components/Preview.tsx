'use client';

import { useMemo } from 'react';
import { CSVData, Issue, Separator } from '@/types';
import { cleanCSV, fixEncoding } from '@/lib/csv-utils';

interface PreviewProps {
  originalData: CSVData;
  issues: Issue[];
  outputSeparator: Separator;
  onClose: () => void;
}

interface DiffLine {
  type: 'unchanged' | 'removed' | 'added' | 'modified';
  lineNumber: number;
  originalContent?: string;
  newContent?: string;
  changes?: { original: string; fixed: string; column: number }[];
}

export default function Preview({ originalData, issues, outputSeparator, onClose }: PreviewProps) {
  const cleanedResult = cleanCSV(originalData, issues, outputSeparator);
  const cleanedData = cleanedResult.cleaned;

  // Build diff lines
  const diffLines = useMemo(() => {
    const lines: DiffLine[] = [];
    const maxRows = Math.min(20, Math.max(originalData.rowCount, cleanedData.rowCount));

    // Track which original rows were removed (duplicates)
    const duplicateIssue = issues.find(i => i.id === 'duplicates' && i.enabled);
    const seenRows = new Set<string>();
    const removedIndices = new Set<number>();

    if (duplicateIssue) {
      originalData.rows.forEach((row, idx) => {
        const key = row.join('|||');
        if (seenRows.has(key)) {
          removedIndices.add(idx);
        } else {
          seenRows.add(key);
        }
      });
    }

    let cleanedIdx = 0;

    for (let i = 0; i < Math.min(maxRows, originalData.rowCount); i++) {
      const originalRow = originalData.rows[i];
      const originalContent = originalRow.join(originalData.separator);

      if (removedIndices.has(i)) {
        // This row was removed as duplicate
        lines.push({
          type: 'removed',
          lineNumber: i + 2, // +2 for 1-indexed and header
          originalContent,
        });
      } else {
        const cleanedRow = cleanedData.rows[cleanedIdx];
        if (cleanedRow) {
          const newContent = cleanedRow.join(outputSeparator);

          // Check for cell-level changes
          const changes: { original: string; fixed: string; column: number }[] = [];
          originalRow.forEach((cell, colIdx) => {
            const cleanedCell = cleanedRow[colIdx] || '';
            if (cell !== cleanedCell) {
              changes.push({ original: cell, fixed: cleanedCell, column: colIdx });
            }
          });

          if (changes.length > 0) {
            lines.push({
              type: 'modified',
              lineNumber: i + 2,
              originalContent,
              newContent,
              changes,
            });
          } else if (originalContent !== newContent) {
            // Separator change only
            lines.push({
              type: 'modified',
              lineNumber: i + 2,
              originalContent,
              newContent,
            });
          } else {
            lines.push({
              type: 'unchanged',
              lineNumber: i + 2,
              originalContent,
            });
          }
          cleanedIdx++;
        }
      }
    }

    return lines;
  }, [originalData, cleanedData, issues, outputSeparator]);

  // Count changes
  const stats = useMemo(() => {
    const removed = diffLines.filter(l => l.type === 'removed').length;
    const modified = diffLines.filter(l => l.type === 'modified').length;
    return { removed, modified, total: removed + modified };
  }, [diffLines]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Preview Changes</h2>
            <div className="flex items-center gap-3 text-sm">
              {stats.modified > 0 && (
                <span className="flex items-center gap-1.5 text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  {stats.modified} modified
                </span>
              )}
              {stats.removed > 0 && (
                <span className="flex items-center gap-1.5 text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  {stats.removed} removed
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* File info bar */}
        <div className="px-6 py-3 bg-gray-100 border-b border-gray-200 flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-mono text-gray-700">data.csv</span>
          <span className="text-xs text-gray-500">
            {originalData.rowCount} rows → {cleanedData.rowCount} rows
          </span>
        </div>

        {/* Diff content */}
        <div className="flex-1 overflow-auto">
          <div className="font-mono text-sm">
            {/* Header row */}
            <div className="flex border-b border-gray-200 bg-gray-50 sticky top-0">
              <div className="w-12 flex-shrink-0 px-2 py-2 text-gray-400 text-right text-xs border-r border-gray-200">
                1
              </div>
              <div className="w-8 flex-shrink-0 px-2 py-2 text-gray-400 text-center border-r border-gray-200">
              </div>
              <div className="flex-1 px-4 py-2 text-gray-600 bg-gray-50">
                {cleanedData.headers.join(outputSeparator)}
              </div>
            </div>

            {/* Diff lines */}
            {diffLines.map((line, idx) => (
              <div key={idx}>
                {line.type === 'removed' && (
                  <div className="flex bg-red-50 border-b border-red-100">
                    <div className="w-12 flex-shrink-0 px-2 py-2 text-red-400 text-right text-xs border-r border-red-200 bg-red-100">
                      {line.lineNumber}
                    </div>
                    <div className="w-8 flex-shrink-0 px-2 py-2 text-red-600 text-center border-r border-red-200 bg-red-100 font-bold">
                      −
                    </div>
                    <div className="flex-1 px-4 py-2 text-red-700">
                      <span className="bg-red-200/50 px-1 rounded">{line.originalContent}</span>
                      <span className="ml-3 text-red-400 text-xs">(duplicate)</span>
                    </div>
                  </div>
                )}

                {line.type === 'modified' && (
                  <>
                    {/* Old line */}
                    <div className="flex bg-red-50 border-b border-red-100">
                      <div className="w-12 flex-shrink-0 px-2 py-2 text-red-400 text-right text-xs border-r border-red-200 bg-red-100">
                        {line.lineNumber}
                      </div>
                      <div className="w-8 flex-shrink-0 px-2 py-2 text-red-600 text-center border-r border-red-200 bg-red-100 font-bold">
                        −
                      </div>
                      <div className="flex-1 px-4 py-2 text-red-700">
                        {line.changes && line.changes.length > 0 ? (
                          <span>
                            {line.originalContent?.split(originalData.separator).map((cell, i) => {
                              const change = line.changes?.find(c => c.column === i);
                              return (
                                <span key={i}>
                                  {i > 0 && <span className="text-gray-400">{originalData.separator}</span>}
                                  {change ? (
                                    <span className="bg-red-200 px-1 rounded">{change.original}</span>
                                  ) : (
                                    <span>{cell}</span>
                                  )}
                                </span>
                              );
                            })}
                          </span>
                        ) : (
                          <span>{line.originalContent}</span>
                        )}
                      </div>
                    </div>
                    {/* New line */}
                    <div className="flex bg-green-50 border-b border-green-100">
                      <div className="w-12 flex-shrink-0 px-2 py-2 text-green-400 text-right text-xs border-r border-green-200 bg-green-100">
                        {line.lineNumber}
                      </div>
                      <div className="w-8 flex-shrink-0 px-2 py-2 text-green-600 text-center border-r border-green-200 bg-green-100 font-bold">
                        +
                      </div>
                      <div className="flex-1 px-4 py-2 text-green-700">
                        {line.changes && line.changes.length > 0 ? (
                          <span>
                            {line.newContent?.split(outputSeparator).map((cell, i) => {
                              const change = line.changes?.find(c => c.column === i);
                              return (
                                <span key={i}>
                                  {i > 0 && <span className="text-gray-400">{outputSeparator}</span>}
                                  {change ? (
                                    <span className="bg-green-200 px-1 rounded">{change.fixed}</span>
                                  ) : (
                                    <span>{cell}</span>
                                  )}
                                </span>
                              );
                            })}
                          </span>
                        ) : (
                          <span>{line.newContent}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {line.type === 'unchanged' && (
                  <div className="flex border-b border-gray-100 hover:bg-gray-50">
                    <div className="w-12 flex-shrink-0 px-2 py-2 text-gray-400 text-right text-xs border-r border-gray-200">
                      {line.lineNumber}
                    </div>
                    <div className="w-8 flex-shrink-0 px-2 py-2 text-gray-300 text-center border-r border-gray-200">
                    </div>
                    <div className="flex-1 px-4 py-2 text-gray-600">
                      {line.originalContent}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* More rows indicator */}
            {originalData.rowCount > 20 && (
              <div className="flex border-b border-gray-200 bg-blue-50">
                <div className="w-12 flex-shrink-0 px-2 py-3 border-r border-blue-200 bg-blue-100"></div>
                <div className="w-8 flex-shrink-0 px-2 py-3 border-r border-blue-200 bg-blue-100 text-blue-500 text-center">
                  ⋮
                </div>
                <div className="flex-1 px-4 py-3 text-blue-600 text-sm">
                  {originalData.rowCount - 20} more rows...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with summary */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              {cleanedResult.appliedFixes.map((fix, idx) => (
                <span key={idx} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {fix}
                </span>
              ))}
              {cleanedResult.appliedFixes.length === 0 && (
                <span className="text-gray-500">No changes to apply</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
