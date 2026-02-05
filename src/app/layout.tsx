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
  metadataBase: new URL('https://clean-csv.com'),
  title: {
    default: "CleanCSV - Transform Stripe CSV Exports into Accountant-Ready Files",
    template: "%s | CleanCSV",
  },
  description: "Transform confusing Stripe CSV exports into clean, accountant-ready files. Clear gross/fees/net breakdown, payout grouping, timezone conversion. 100% private - your data never leaves your browser.",
  keywords: [
    "Stripe export",
    "Stripe CSV export",
    "Stripe export cleaner",
    "Stripe payout reconciliation",
    "Stripe fees breakdown",
    "Stripe accounting",
    "Stripe bookkeeping",
    "Stripe QuickBooks",
    "Stripe Xero",
    "clean Stripe export",
    "Stripe balance transactions",
    "Stripe payments export",
    "Stripe CSV converter",
    "Stripe export to Excel",
    "Stripe bank reconciliation",
    "Stripe gross net fees",
    "accountant Stripe export",
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
  // Verification tags - replace with your actual verification codes
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace after adding site to Google Search Console
    // yandex: 'YOUR_YANDEX_CODE',
    // bing: 'YOUR_BING_CODE',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clean-csv.com",
    siteName: "CleanCSV",
    title: "CleanCSV - Stripe Exports Made Accountant-Ready",
    description: "Transform messy Stripe CSV exports into clean files with clear gross/fees/net breakdown. 100% private browser processing.",
    images: [
      {
        url: "https://clean-csv.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CleanCSV - Transform Stripe Exports into Accountant-Ready Files",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanCSV - Stripe Exports Made Accountant-Ready",
    description: "Transform messy Stripe CSV exports into clean files with clear gross/fees/net breakdown. 100% private browser processing.",
    images: ["https://clean-csv.com/og-image.png"],
    creator: "@cleancsv",
  },
  alternates: {
    canonical: "https://clean-csv.com",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  category: "Technology",
  other: {
    'theme-color': '#635BFF',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // WebApplication Schema
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://clean-csv.com/#webapp",
    "name": "CleanCSV",
    "url": "https://clean-csv.com",
    "description": "Transform confusing Stripe CSV exports into accountant-ready files. Clear gross/fees/net breakdown, payout grouping, timezone conversion.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "9.99",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Gross, fees, and net amount breakdown",
      "Payout grouping for bank reconciliation",
      "Timezone conversion to local time",
      "Human-readable column names",
      "Refund linking to original payments",
      "100% browser-based processing",
      "No data upload to servers"
    ],
    "screenshot": "https://clean-csv.com/og-image.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Organization Schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://clean-csv.com/#organization",
    "name": "CleanCSV",
    "url": "https://clean-csv.com",
    "logo": "https://clean-csv.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "mferret.pro@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": []
  };

  // FAQ Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://clean-csv.com/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which Stripe export types are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CleanCSV supports all standard Stripe export types: Payments, Balance Transactions, Payouts, Refunds, Customers, and Invoices. Each export type gets optimized transformation rules."
        }
      },
      {
        "@type": "Question",
        "name": "How does the gross/fees/net breakdown work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We extract and calculate the gross payment amount, all applicable Stripe fees (processing, international, disputes), and the final net amount that hits your bank. Everything is converted to readable dollar amounts."
        }
      },
      {
        "@type": "Question",
        "name": "What is payout grouping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When Stripe sends money to your bank, they batch multiple payments into a single transfer. Our payout grouping feature shows you exactly which customer payments are included in each bank deposit."
        }
      },
      {
        "@type": "Question",
        "name": "Is my Stripe data safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your data never leaves your computer. All processing happens locally in your browser using JavaScript. We have no servers that receive, store, or process your Stripe exports."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this with QuickBooks or Xero?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The cleaned CSV output is designed to be compatible with all major accounting software. Human-readable column names, proper date formats, and clear currency amounts make importing straightforward."
        }
      },
      {
        "@type": "Question",
        "name": "How much does CleanCSV cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CleanCSV offers one-time payments with no subscription: $9.99 for a single file, $24.99 for a 3-file pack (17% savings), or $39.99 for a 5-file pack (20% savings). Credits never expire."
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://clean-csv.com"
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#635BFF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
