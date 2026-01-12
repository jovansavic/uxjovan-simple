import { BlogPosts } from 'app/components/posts'
import { Metadata } from 'next'
import { baseUrl } from 'app/sitemap'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and insights on product design, UX/UI best practices, design systems, Figma tips, and building great digital experiences.',
  keywords: [
    'Design Blog',
    'UX Articles',
    'UI Design Tips',
    'Product Design Insights',
    'Figma Tutorials',
    'Design Systems',
    'User Experience',
  ],
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: 'Blog — Jovan Sremacki',
    description: 'Articles and insights on product design, UX/UI best practices, design systems, and building great digital experiences.',
    url: `${baseUrl}/blog`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og?title=Blog`,
        width: 1200,
        height: 630,
        alt: 'Blog — Jovan Sremacki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Jovan Sremacki',
    description: 'Articles and insights on product design, UX/UI best practices, and design systems.',
    images: [`${baseUrl}/og?title=Blog`],
  },
}

export default function Page() {
  return (
    <section className="focus-group">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts />
    </section>
  )
}
