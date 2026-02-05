'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Which Stripe export types do you support?',
    answer: 'We support all standard Stripe export types: Payments, Balance Transactions, Payouts, Refunds, Customers, and Invoices. Each export type gets optimized transformation rules to show the most relevant data for reconciliation.',
  },
  {
    question: 'How does the gross/fees/net breakdown work?',
    answer: 'Stripe exports often show amounts in cents and bury fee information across multiple columns. We extract and calculate the gross payment amount, all applicable Stripe fees (processing, international, disputes), and the final net amount that hits your bank. Everything is converted to readable dollar amounts.',
  },
  {
    question: 'What is payout grouping?',
    answer: 'When Stripe sends money to your bank, they batch multiple payments into a single transfer. Our payout grouping feature shows you exactly which customer payments are included in each bank deposit, making reconciliation with your bank statement straightforward.',
  },
  {
    question: 'Is my Stripe data safe?',
    answer: 'Your data never leaves your computer. All processing happens locally in your browser using JavaScript. We have no servers that receive, store, or process your Stripe exports. You can verify this by disconnecting from the internet after the page loads - the tool continues to work.',
  },
  {
    question: 'Why are dates showing differently than in Stripe?',
    answer: 'Stripe exports timestamps in UTC timezone. We convert all dates to your local timezone automatically, so they match what you see in your Stripe Dashboard and make sense for your accounting records. No more date mismatches.',
  },
  {
    question: 'Can I use this with QuickBooks, Xero, or other accounting software?',
    answer: 'Yes. The cleaned CSV output is designed to be compatible with all major accounting software. Human-readable column names, proper date formats, and clear currency amounts make importing into QuickBooks, Xero, FreshBooks, or even Excel straightforward.',
  },
  {
    question: 'What if I have multiple Stripe accounts?',
    answer: 'Each file is processed independently, and there\'s no account linking. Simply export from each Stripe account and process them separately. The file packs work across any number of Stripe accounts.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Given the nature of the product (instant delivery of transformed files), we typically don\'t offer refunds. However, if the tool genuinely doesn\'t work for your export type, contact us and we\'ll make it right.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F9FC]" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">
            Common questions
          </h2>
          <p className="text-[#425466] text-lg">
            Everything you need to know about transforming Stripe exports
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                openIndex === idx ? 'border-[#635BFF]/30 shadow-lg shadow-[#635BFF]/5' : 'border-[#E3E8EE]'
              }`}
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleItem(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F6F9FC] transition-colors"
                aria-expanded={openIndex === idx}
              >
                <span className="font-medium text-[#0A2540] pr-4" itemProp="name">
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  openIndex === idx ? 'bg-[#635BFF] rotate-180' : 'bg-[#F6F9FC]'
                }`}>
                  <svg
                    className={`w-4 h-4 transition-colors ${openIndex === idx ? 'text-white' : 'text-[#8898AA]'}`}
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
                  <p className="text-[#425466] leading-relaxed" itemProp="text">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#8898AA] mb-2">Still have questions?</p>
          <a href="mailto:mferret.pro@gmail.com" className="text-[#635BFF] font-medium hover:underline transition-colors">
            Contact us →
          </a>
        </div>
      </div>
    </section>
  );
}
