import { getBlogPosts } from 'app/blog/utils'
import type { MetadataRoute } from 'next'

export const baseUrl = 'https://www.uxjovan.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  return [...routes, ...blogs]
}
