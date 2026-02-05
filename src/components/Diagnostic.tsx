'use client';

import { useState } from 'react';
import { Issue, Separator, FileInfo, CSVData } from '@/types';

interface DiagnosticProps {
  fileInfo: FileInfo;
  data: CSVData;
  issues: Issue[];
  onIssueToggle: (id: string, enabled: boolean) => void;
  onSeparatorChange: (separator: Separator) => void;
  outputSeparator: Separator;
  onClean: () => void;
  onChangeFile: () => void;
  onPreview: () => void;
}

const severityConfig = {
  critical: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Critical',
    color: 'text-red-600',
  },
  medium: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Medium',
    color: 'text-amber-600',
  },
  minor: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
    label: 'Minor',
    color: 'text-gray-500',
  },
};

const separatorLabels: Record<Separator, string> = {
  ';': 'Semicolon (;)',
  ',': 'Comma (,)',
  '\t': 'Tab',
};

export default function Diagnostic({
  fileInfo,
  data,
  issues,
  onIssueToggle,
  onSeparatorChange,
  outputSeparator,
  onClean,
  onChangeFile,
  onPreview,
}: DiagnosticProps) {
  const [showOptions, setShowOptions] = useState(false);

  const hasEnabledIssues = issues.some(i => i.enabled);
  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const mediumCount = issues.filter(i => i.severity === 'medium').length;
  const minorCount = issues.filter(i => i.severity === 'minor').length;

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* File info header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{fileInfo.name}</p>
                  <p className="text-sm text-gray-500">
                    {data.rowCount.toLocaleString()} rows &middot; {data.columnCount} columns &middot; Separator: {separatorLabels[data.separator]}
                  </p>
                </div>
              </div>
              <button
                onClick={onChangeFile}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                Change file
              </button>
            </div>
          </div>

          {/* Issues list */}
          <div className="p-6">
            {issues.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">Your file looks clean</p>
                <p className="text-gray-500 mt-1">No issues detected</p>
              </div>
            ) : (
              <>
                {/* Summary bar */}
                <div className="flex items-center gap-6 mb-6 pb-4 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">
                    {issues.length} issue{issues.length > 1 ? 's' : ''} found
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    {criticalCount > 0 && (
                      <span className="flex items-center gap-1.5 text-red-600">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        {criticalCount} critical
                      </span>
                    )}
                    {mediumCount > 0 && (
                      <span className="flex items-center gap-1.5 text-amber-600">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        {mediumCount} medium
                      </span>
                    )}
                    {minorCount > 0 && (
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        {minorCount} minor
                      </span>
                    )}
                  </div>
                </div>

                {/* Issues table */}
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="pb-3 pr-4 w-10">Fix</th>
                        <th className="pb-3 pr-4">Issue</th>
                        <th className="pb-3 pr-4 w-24">Severity</th>
                        <th className="pb-3 text-right w-24">Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {issues.map((issue, index) => (
                        <tr
                          key={issue.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="py-3 pr-4">
                            <input
                              type="checkbox"
                              checked={issue.enabled}
                              onChange={(e) => onIssueToggle(issue.id, e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                          <td className="py-3 pr-4">
                            <span className="text-gray-900">{issue.description}</span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className={`inline-flex items-center gap-1.5 text-sm ${severityConfig[issue.severity].color}`}>
                              {severityConfig[issue.severity].icon}
                              {severityConfig[issue.severity].label}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              {issue.count.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Options section */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${showOptions ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Output options
              </button>

              {showOptions && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in-up">
                  <p className="text-sm font-medium text-gray-700 mb-3">Output separator</p>
                  <div className="flex flex-wrap gap-4">
                    {([';', ',', '\t'] as Separator[]).map((sep) => (
                      <label key={sep} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="separator"
                          checked={outputSeparator === sep}
                          onChange={() => onSeparatorChange(sep)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{separatorLabels[sep]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onPreview}
                className="flex-1 px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium
                         hover:bg-gray-50 transition-all duration-200
                         flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview changes
              </button>
              <button
                onClick={onClean}
                disabled={!hasEnabledIssues && issues.length > 0}
                className={`
                  flex-1 px-5 py-2.5 rounded-lg font-medium text-white
                  transition-all duration-200 flex items-center justify-center gap-2
                  ${hasEnabledIssues || issues.length === 0
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Clean file
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
