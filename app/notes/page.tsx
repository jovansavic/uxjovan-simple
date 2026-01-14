import { NotesPosts } from 'app/components/posts'
import { Metadata } from 'next'
import { baseUrl } from 'app/sitemap'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Articles and insights on product design, UX/UI best practices, design systems, Figma tips, and building great digital experiences.',
  keywords: [
    'Design Notes',
    'UX Articles',
    'UI Design Tips',
    'Product Design Insights',
    'Figma Tutorials',
    'Design Systems',
    'User Experience',
  ],
  alternates: {
    canonical: `${baseUrl}/notes`,
  },
  openGraph: {
    title: 'Notes — Jovan Savic',
    description: 'Articles and insights on product design, UX/UI best practices, design systems, and building great digital experiences.',
    url: `${baseUrl}/notes`,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og?title=Notes`,
        width: 1200,
        height: 630,
        alt: 'Notes - Jovan Savic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes - Jovan Savic',
    description: 'Articles and insights on product design, UX/UI best practices, and design systems.',
    images: [`${baseUrl}/og?title=Notes`],
  },
}

export default function Page() {
  return (
    <section className="focus-group">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Notes</h1>
      <NotesPosts />
    </section>
  )
}
