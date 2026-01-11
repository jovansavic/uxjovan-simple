import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="flex flex-col gap-1">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="group block py-4 -mx-4 px-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
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
              
              {/* Read more link */}
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Read article →
              </span>
            </div>
          </Link>
        ))}
    </div>
  )
}
