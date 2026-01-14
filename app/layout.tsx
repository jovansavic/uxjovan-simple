import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const siteConfig = {
  name: 'Jovan Savic',
  title: 'Jovan Savic — Product (UX/UI) Designer',
  description: 'Product Designer specializing in UX/UI design, design systems, and user research. Creating intuitive digital experiences with Figma, React, and modern design tools. Based in Serbia, available worldwide.',
  url: baseUrl,
  ogImage: `${baseUrl}/og?title=Jovan%20Savic%20—%20Product%20Designer`,
  links: {
    twitter: 'https://x.com/uxjovan',
    github: 'https://github.com/uxjovan',
    linkedin: 'https://linkedin.com/in/uxjovan',
    figma: 'https://figma.com/@uxjovan',
    dribbble: 'https://dribbble.com/uxjovan',
    behance: 'https://behance.net/uxjovan',
  },
  author: {
    name: 'Jovan Savic',
    email: 'hi@uxjovan.com',
    url: 'https://jovan.design',
  },
  keywords: [
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'UX/UI Designer',
    'Design Systems',
    'User Experience',
    'User Interface',
    'Figma Designer',
    'React Designer',
    'Digital Product Design',
    'Web Design',
    'Mobile App Design',
    'Design Consultant',
    'Freelance Designer',
    'Serbia Designer',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/rss`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@uxjovan',
    site: '@uxjovan',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification tokens here
    // google: 'your-google-verification-token',
    // yandex: 'your-yandex-verification-token',
    // bing: 'your-bing-verification-token',
  },
  category: 'technology',
  other: {
    // LLM and AI crawler friendly metadata
    'ai-content-declaration': 'human-created',
    'content-language': 'en',
  },
}

const cx = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Jovan Savic',
        description: 'Product Designer specializing in UX/UI design, design systems, and user research.',
        publisher: {
          '@id': `${baseUrl}/#person`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/notes?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Jovan Savic',
        alternateName: ['uxjovan', 'Jovan'],
        description: 'Product Designer specializing in UX/UI design, design systems, and user research. Creating intuitive digital experiences.',
        url: baseUrl,
        image: {
          '@type': 'ImageObject',
          url: `${baseUrl}/og?title=Jovan%20Savic`,
          width: 1200,
          height: 630,
        },
        sameAs: [
          'https://x.com/uxjovan',
          'https://github.com/uxjovan',
          'https://linkedin.com/in/uxjovan',
          'https://figma.com/@uxjovan',
          'https://dribbble.com/uxjovan',
          'https://behance.net/uxjovan',
          'https://jovan.design',
        ],
        jobTitle: 'Product Designer',
        knowsAbout: [
          'UX Design',
          'UI Design',
          'Product Design',
          'Design Systems',
          'User Research',
          'Figma',
          'React',
          'Next.js',
          'Prototyping',
          'Wireframing',
        ],
        email: 'hi@uxjovan.com',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${baseUrl}/#profilepage`,
        url: baseUrl,
        name: 'Jovan Savic — Product Designer',
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@id': `${baseUrl}/#person`,
        },
        mainEntity: {
          '@id': `${baseUrl}/#person`,
        },
      },
    ],
  }

  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* RSS feed autodiscovery */}
        <link rel="alternate" type="application/rss+xml" title="Jovan Savic's Notes" href={`${baseUrl}/rss`} />
      </head>
      <body className="antialiased max-w-xl mx-auto px-4 mt-8">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
