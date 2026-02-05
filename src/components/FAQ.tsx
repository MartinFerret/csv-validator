'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How does CleanCSV protect my data?',
    answer: 'CleanCSV processes your files entirely in your browser using JavaScript. Your data never leaves your computer and is never uploaded to any server. You can verify this by disconnecting from the internet after the page loads — the tool will continue to work perfectly. We have no access to your files, no logging, and no tracking.',
  },
  {
    question: 'How do I fix UTF-8 encoding errors?',
    answer: 'CleanCSV automatically detects and repairs UTF-8 encoding issues (mojibake). Common symptoms include characters like "Ã©" instead of "é", "Ã¼" instead of "ü", or "â€™" instead of apostrophes. Upload your file and our tool converts Windows-1252, ISO-8859-1, and other legacy encodings to proper UTF-8.',
  },
  {
    question: 'What file sizes can CleanCSV handle?',
    answer: 'Since all processing happens in your browser, CleanCSV can handle files with hundreds of thousands of rows on most modern computers. Processing happens in under 1 second, even for 50,000+ row files. For very large files (1M+ rows), we recommend splitting them into smaller chunks.',
  },
  {
    question: 'Can I use CleanCSV with Excel or Google Sheets?',
    answer: 'Yes. Export your spreadsheet as CSV first: in Excel, go to File → Save As → "CSV UTF-8". In Google Sheets, go to File → Download → "Comma-separated values". Then upload the CSV to CleanCSV, fix the issues, and re-import the cleaned file back into your spreadsheet app.',
  },
  {
    question: 'What CSV separators are supported?',
    answer: 'CleanCSV automatically detects comma (,), semicolon (;), and tab separators. You can also convert between formats — for example, import a semicolon-separated European CSV and export it as comma-separated for US systems.',
  },
  {
    question: 'Is CleanCSV compliant with GDPR and other regulations?',
    answer: 'Yes. Because your data never leaves your browser, CleanCSV is compliant with GDPR, CCPA, HIPAA, and other data protection regulations by design. There is no data to protect on our end because we never receive it.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 border border-slate-300 rounded-full mb-6">
            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-slate-600">Have questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about CleanCSV
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                openIndex === idx ? 'border-slate-300 shadow-lg' : 'border-slate-200'
              }`}
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleItem(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === idx}
              >
                <span className="font-medium text-slate-900 pr-4" itemProp="name">
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  openIndex === idx ? 'bg-slate-900 rotate-180' : 'bg-slate-100'
                }`}>
                  <svg
                    className={`w-4 h-4 transition-colors ${openIndex === idx ? 'text-white' : 'text-slate-600'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? 'max-h-96' : 'max-h-0'
                }`}
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed" itemProp="text">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-2">Still have questions?</p>
          <a href="mailto:support@cleancsv.io" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
