'use client';

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="features">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-blue-600 font-medium mb-3">CSV Cleaning Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-xl">
            Fix the issues that break your spreadsheet imports
          </h2>
        </div>

        {/* Main features - Editorial layout */}
        <div className="space-y-24">
          {/* Feature 1: Encoding */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Most common issue
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fix CSV Encoding Errors
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Repair broken UTF-8 characters when Excel or Google Sheets mangles your accents
                and special characters. You know the drill: Müller becomes MÃ¼ller, café becomes cafÃ©.
              </p>
              <p className="text-gray-500">
                Our CSV cleaner automatically detects and repairs encoding issues - no technical knowledge required.
              </p>
            </div>
            <div className="bg-gray-950 rounded-2xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-500 text-xs ml-2">data.csv</span>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-gray-600 w-8">1</span>
                  <span><span className="text-red-400 line-through">MÃ¼ller</span> <span className="text-gray-600">→</span> <span className="text-green-400">Müller</span></span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-8">2</span>
                  <span><span className="text-red-400 line-through">cafÃ©</span> <span className="text-gray-600">→</span> <span className="text-green-400">café</span></span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-8">3</span>
                  <span><span className="text-red-400 line-through">FranÃ§ois</span> <span className="text-gray-600">→</span> <span className="text-green-400">François</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Duplicates */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gray-50 rounded-2xl p-8">
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 font-mono text-sm">row 1</span>
                  <span className="text-gray-900">john@email.com</span>
                  <span className="ml-auto text-green-600 text-sm">kept</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100 opacity-60">
                  <span className="text-gray-400 font-mono text-sm">row 2</span>
                  <span className="text-gray-500 line-through">john@email.com</span>
                  <span className="ml-auto text-red-500 text-sm">removed</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100 opacity-60">
                  <span className="text-gray-400 font-mono text-sm">row 3</span>
                  <span className="text-gray-500 line-through">john@email.com</span>
                  <span className="ml-auto text-red-500 text-sm">removed</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-400 font-mono text-sm">row 4</span>
                  <span className="text-gray-900">jane@email.com</span>
                  <span className="ml-auto text-green-600 text-sm">kept</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Remove Duplicate Rows from CSV
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Eliminate duplicate entries caused by copy-paste accidents, merged exports, or messy data.
                Duplicates inflate your row count and skew your analysis.
              </p>
              <p className="text-gray-500">
                First occurrence is kept. Duplicate rows are removed automatically.
              </p>
            </div>
          </div>

          {/* Feature 3: Whitespace */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Trim Whitespace from CSV Cells
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Remove leading spaces, trailing spaces, and double spaces that break VLOOKUP,
                cause false &quot;duplicate&quot; entries, and make data matching impossible.
              </p>
              <p className="text-gray-500">
                Every cell gets trimmed and cleaned - clean CSV data in one click.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <code className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg font-mono">
                    &quot;  John Doe  &quot;
                  </code>
                  <span className="text-gray-400">→</span>
                  <code className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-mono">
                    &quot;John Doe&quot;
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg font-mono">
                    &quot;New  York&quot;
                  </code>
                  <span className="text-gray-400">→</span>
                  <code className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-mono">
                    &quot;New York&quot;
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg font-mono text-sm">
                    &quot;email@test.com &quot;
                  </code>
                  <span className="text-gray-400">→</span>
                  <code className="bg-green-100 text-green-800 px-3 py-2 rounded-lg font-mono text-sm">
                    &quot;email@test.com&quot;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Quick facts */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Client-side processing</div>
              <div className="text-gray-400 text-sm mt-1">Your data never leaves your browser</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">&lt;1s</div>
              <div className="text-gray-600">Processing time</div>
              <div className="text-gray-400 text-sm mt-1">Even for 50,000+ row files</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
              <div className="text-gray-600">Account required</div>
              <div className="text-gray-400 text-sm mt-1">Just drop your file and go</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
