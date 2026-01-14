import { NotesPosts } from 'app/components/posts'
import { Hero } from 'app/components/hero'
import { Metadata } from 'next'
import { baseUrl } from 'app/sitemap'

// Homepage uses default metadata from layout.tsx but we can add page-specific structured data
export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl,
  },
}

export default function Page() {
  return (
    <section className="focus-group">
      <div className="focus-item">
        <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
          Product (UX/UI) Designer
        </h1>
      </div>

      <div className="focus-item">
        <Hero />
      </div>

      <div className="my-8">
        <NotesPosts limit={3} />
      </div>
    </section>
  )
}
