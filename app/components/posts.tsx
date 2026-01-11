import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

interface BlogPostsProps {
  limit?: number
}

export function BlogPosts({ limit }: BlogPostsProps) {
  let allBlogs = getBlogPosts()
  
  const sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })
  
  const displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs
  const hasMore = limit && sortedBlogs.length > limit

  return (
    <div className="flex flex-col gap-1">
      {displayedBlogs.map((post) => (
          <Link
            key={post.slug}
            className="focus-item group block py-4 -mx-4 px-4 rounded-xl"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col gap-1">
              {/* Date - smallest, most muted */}
              <p className="text-xs text-neutral-500 dark:text-neutral-500 tabular-nums uppercase tracking-wide">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              
              {/* Title - prominent, semi-bold */}
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.metadata.title}
              </h2>
              
              {/* Description - regular weight, muted */}
              {post.metadata.summary && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {post.metadata.summary}
                </p>
              )}
            </div>
          </Link>
        ))}
      
      {hasMore && (
        <Link
          href="/blog"
          className="focus-item group block py-4 -mx-4 px-4 rounded-xl"
        >
          <span className="text-sm font-medium text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            See more →
          </span>
        </Link>
      )}
    </div>
  )
}
