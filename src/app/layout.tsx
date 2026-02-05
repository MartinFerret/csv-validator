import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cleancsv.io'),
  title: {
    default: "CleanCSV - Fix Broken CSV Files Online | CSV Cleaner Tool",
    template: "%s | CleanCSV",
  },
  description: "Fix broken CSV files instantly. CleanCSV repairs encoding issues, removes duplicates, trims whitespace, and converts separators. 100% private - your data never leaves your browser.",
  keywords: [
    "CSV cleaner",
    "CSV cleaner online",
    "fix broken CSV file",
    "fix CSV encoding",
    "fix CSV encoding errors",
    "UTF-8 CSV fix",
    "UTF-8 converter",
    "remove duplicate rows CSV",
    "remove CSV duplicates",
    "CSV repair tool",
    "clean CSV file online",
    "CSV encoding fix",
    "mojibake fixer",
    "CSV whitespace remover",
    "trim CSV whitespace",
    "CSV separator converter",
    "broken CSV repair",
    "CSV data cleaning",
    "repair CSV file",
    "CSV file cleaner",
  ],
  authors: [{ name: "CleanCSV" }],
  creator: "CleanCSV",
  publisher: "CleanCSV",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cleancsv.io",
    siteName: "CleanCSV",
    title: "CleanCSV - Fix Broken CSV Files Online in Seconds",
    description: "Fix encoding issues, remove duplicates, and clean your CSV files instantly. 100% private - your data never leaves your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CleanCSV - Fix Broken CSV Files Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanCSV - Fix Broken CSV Files Online in Seconds",
    description: "Fix encoding issues, remove duplicates, and clean your CSV files instantly. 100% private - your data never leaves your browser.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://cleancsv.io",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/icon.svg',
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CleanCSV",
    "url": "https://cleancsv.io",
    "description": "Fix broken CSV files instantly. Repairs encoding issues, removes duplicates, trims whitespace. 100% private - your data never leaves your browser.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "featureList": [
      "Fix encoding issues (UTF-8 conversion)",
      "Remove duplicate rows",
      "Trim whitespace",
      "Convert separators",
      "100% browser-based processing",
      "No data upload required"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I fix a broken CSV file online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Drag and drop your CSV file onto CleanCSV. Our online CSV cleaner automatically detects encoding errors, duplicate rows, and whitespace issues. Preview the fixes, then download your cleaned file. No signup required."
        }
      },
      {
        "@type": "Question",
        "name": "How do I fix UTF-8 encoding errors in a CSV file?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CleanCSV automatically detects and repairs UTF-8 encoding issues (mojibake). Upload your file and our tool converts Windows-1252, ISO-8859-1, and other legacy encodings to proper UTF-8."
        }
      },
      {
        "@type": "Question",
        "name": "How do I remove duplicate rows from a CSV file?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CleanCSV identifies duplicate rows by comparing the entire content of each row. The tool keeps the first occurrence and removes subsequent duplicates, preserving your data order."
        }
      },
      {
        "@type": "Question",
        "name": "How does CleanCSV protect my data privacy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CleanCSV processes your files entirely in your browser using JavaScript. Your data never leaves your computer and is never uploaded to any server."
        }
      },
      {
        "@type": "Question",
        "name": "Can I clean a CSV file from Excel or Google Sheets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Export your spreadsheet as CSV first, upload it to CleanCSV to fix issues, then re-import the cleaned file back into your spreadsheet app."
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
