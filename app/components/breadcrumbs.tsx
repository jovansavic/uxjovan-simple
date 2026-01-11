'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbsProps {
  /** Override the last segment label (e.g., article title instead of slug) */
  currentTitle?: string
}

export function Breadcrumbs({ currentTitle }: BreadcrumbsProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // Only show breadcrumbs on nested pages (depth >= 2)
  // e.g., /blog/article-slug but NOT /blog or /
  if (segments.length < 2) {
    return null
  }

  // Build breadcrumb items
  const items = segments.slice(0, -1).map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    return { href, label }
  })

  // Back link goes to parent
  const backHref = items.length > 0 ? items[items.length - 1].href : '/'

  // Current page (last segment)
  const currentLabel = currentTitle || segments[segments.length - 1]

  return (
    <div className="sticky top-0 z-40 -mx-6 mb-4 bg-white dark:bg-black">
      <nav className="px-6 py-3">
        <div className="flex items-center gap-3 text-sm">
        {/* Back button with icon and text */}
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </Link>

        {/* Divider */}
        <span className="text-neutral-300 dark:text-neutral-700">|</span>

        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Home */}
          <Link
            href="/"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors shrink-0"
          >
            Home
          </Link>

          {/* Middle segments */}
          {items.map(({ href, label }) => (
            <span key={href} className="flex items-center gap-2 shrink-0">
              <span className="text-neutral-300 dark:text-neutral-600">/</span>
              <Link
                href={href}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {label}
              </Link>
            </span>
          ))}

          {/* Current page */}
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-neutral-300 dark:text-neutral-600 shrink-0">/</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate">
              {currentLabel}
            </span>
          </span>
        </div>
        </div>
      </nav>
    </div>
  )
}
