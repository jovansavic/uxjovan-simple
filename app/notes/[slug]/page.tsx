import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getNotesPosts } from 'app/notes/utils'
import { baseUrl } from 'app/sitemap'
import { TableOfContents } from 'app/components/toc'
import { MobileTableOfContents } from 'app/components/toc/mobile'
import { Breadcrumbs } from 'app/components/breadcrumbs'

export async function generateStaticParams() {
  let posts = getNotesPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getNotesPosts().find((post) => post.slug === slug)
  if (!post) {
    return {}
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const postKeywords = (post.metadata as { keywords?: string }).keywords
  const ogImage = image
    ? image.startsWith('http') ? image : `${baseUrl}${image}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    keywords: postKeywords ? postKeywords.split(',').map(k => k.trim()) : ['Design', 'UX', 'UI', 'Product Design'],
    authors: [{ name: 'Jovan Savic', url: 'https://jovan.design' }],
    creator: 'Jovan Savic',
    publisher: 'Jovan Savic',
    alternates: {
      canonical: `${baseUrl}/notes/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      modifiedTime: publishedTime,
      url: `${baseUrl}/notes/${post.slug}`,
      siteName: 'Jovan Savic',
      authors: ['Jovan Savic'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@uxjovan',
      site: '@uxjovan',
    },
    other: {
      'article:published_time': publishedTime,
      'article:author': 'Jovan Savic',
    },
  }
}

export default async function Notes({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getNotesPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="relative pb-20 xl:pb-0">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NotesPosting',
            '@id': `${baseUrl}/notes/${post.slug}#article`,
            headline: post.metadata.title,
            name: post.metadata.title,
            description: post.metadata.summary,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            image: {
              '@type': 'ImageObject',
              url: post.metadata.image
                ? (post.metadata.image.startsWith('http') ? post.metadata.image : `${baseUrl}${post.metadata.image}`)
                : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
              width: 1200,
              height: 630,
            },
            url: `${baseUrl}/notes/${post.slug}`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/notes/${post.slug}`,
            },
            author: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: 'Jovan Savic',
              url: 'https://jovan.design',
              sameAs: [
                'https://x.com/uxjovan',
                'https://linkedin.com/in/uxjovan',
                'https://figma.com/@uxjovan',
              ],
            },
            publisher: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: 'Jovan Savic',
              url: baseUrl,
            },
            isPartOf: {
              '@type': 'Notes',
              '@id': `${baseUrl}/notes#notes`,
              name: 'Jovan Savic Notes',
              url: `${baseUrl}/notes`,
            },
            inLanguage: 'en-US',
            copyrightYear: new Date(post.metadata.publishedAt).getFullYear(),
            copyrightHolder: {
              '@type': 'Person',
              name: 'Jovan Savic',
            },
          }),
        }}
      />
      
      {/* Table of Contents - Fixed on right side for xl screens */}
      <div className="hidden xl:block fixed right-[max(2rem,calc(50%-45rem))] top-32 w-56">
        <TableOfContents content={post.content} />
      </div>

      {/* Mobile Table of Contents - Bottom sheet */}
      <MobileTableOfContents content={post.content} />

      {/* Breadcrumbs */}
      <Breadcrumbs currentTitle={post.metadata.shortTitle || post.metadata.title} />

      <h1 className="title font-bold text-3xl tracking-tight">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
