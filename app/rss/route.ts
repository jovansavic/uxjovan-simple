import { baseUrl } from 'app/sitemap'
import { getNotesPosts } from 'app/notes/utils'
import { remark } from 'remark'
import html from 'remark-html'

// Site metadata for RSS feed
const siteConfig = {
  title: 'Jovan Savic — Product (UX/UI) Designer',
  description:
    'Product Designer specializing in UX/UI design, design systems, and user research. Sharing insights on design process, tools, and building better digital products.',
  author: {
    name: 'Jovan Savic',
    email: 'hi@uxjovan.com',
  },
  language: 'en-US',
  copyright: `© ${new Date().getFullYear()} Jovan Savic. All rights reserved.`,
  image: {
    url: `${baseUrl}/cover-old.png`,
    title: 'Jovan Savic',
    width: 128,
    height: 128,
  },
}

// Convert MDX/Markdown content to HTML for RSS
async function markdownToHtml(markdown: string): Promise<string> {
  // Remove MDX-specific syntax that remark can't handle
  const cleanedMarkdown = markdown
    // Remove import statements
    .replace(/^import\s+.*$/gm, '')
    // Remove export statements
    .replace(/^export\s+.*$/gm, '')
    // Convert MDX components to plain text or remove them
    .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '') // Self-closing components
    .replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '') // Components with children

  const result = await remark().use(html, { sanitize: false }).process(cleanedMarkdown)

  return result.toString()
}

// Escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Wrap content in CDATA to preserve HTML
function cdata(content: string): string {
  return `<![CDATA[${content}]]>`
}

export async function GET() {
  const allPosts = getNotesPosts()

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  })

  // Get the most recent post date for lastBuildDate
  const lastBuildDate = sortedPosts.length > 0 
    ? new Date(sortedPosts[0].metadata.publishedAt).toUTCString()
    : new Date().toUTCString()

  // Generate items with full content
  const itemsXml = await Promise.all(
    sortedPosts.map(async (post) => {
      const postUrl = `${baseUrl}/notes/${post.slug}`
      const pubDate = new Date(post.metadata.publishedAt).toUTCString()
      
      // Convert post content to HTML
      const htmlContent = await markdownToHtml(post.content)
      
      // Extract keywords for categories
      const metadata = post.metadata as { keywords?: string | string[] }
      let categories = ''
      if (metadata.keywords) {
        const keywordArray = Array.isArray(metadata.keywords) 
          ? metadata.keywords 
          : metadata.keywords.split(',').map(k => k.trim())
        categories = keywordArray
          .map(keyword => `        <category>${escapeXml(keyword)}</category>`)
          .join('\n')
      }

      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.metadata.summary || '')}</description>
      <content:encoded>${cdata(htmlContent)}</content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${siteConfig.author.email} (${siteConfig.author.name})</author>
${categories}
    </item>`
    })
  )

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss 
  version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/"
>
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${lastBuildDate}</pubDate>
    <copyright>${escapeXml(siteConfig.copyright)}</copyright>
    <generator>Next.js</generator>
    <managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>
    <webMaster>${siteConfig.author.email} (${siteConfig.author.name})</webMaster>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
    
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    
    <image>
      <url>${siteConfig.image.url}</url>
      <title>${escapeXml(siteConfig.image.title)}</title>
      <link>${baseUrl}</link>
      <width>${siteConfig.image.width}</width>
      <height>${siteConfig.image.height}</height>
      <description>${escapeXml(siteConfig.description)}</description>
    </image>

${itemsXml.join('\n\n')}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
