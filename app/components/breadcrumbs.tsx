'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface BreadcrumbsProps {
  /** Override the last segment label (e.g., article title instead of slug) */
  currentTitle?: string
}

export function Breadcrumbs({ currentTitle }: BreadcrumbsProps) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)

  // Only show breadcrumbs on nested pages (depth >= 2)
  // e.g., /blog/article-slug but NOT /blog or /
  if (segments.length < 2) {
    return null
  }

  // Use Intersection Observer to detect when we've scrolled past the original position
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is NOT intersecting (scrolled past), breadcrumb should be stuck
        setIsStuck(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

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

  const breadcrumbContent = (
    <nav className="max-w-xl mx-auto px-4 py-3">
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
  )

  return (
    <>
      {/* Sentinel element - when this scrolls out of view, breadcrumb becomes fixed */}
      <div ref={sentinelRef} className="h-0" />
      
      {/* Breadcrumb bar - in-flow when not stuck, fixed when stuck */}
      {isStuck ? (
        <>
          {/* Placeholder to prevent layout jump when breadcrumb becomes fixed */}
          <div className="h-12" />
          {/* Fixed breadcrumb */}
          <div className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
            {breadcrumbContent}
          </div>
        </>
      ) : (
        /* In-flow breadcrumb at its original position */
        <div className="bg-white dark:bg-black border-b border-neutral-100 dark:border-neutral-900">
          {breadcrumbContent}
        </div>
      )}
    </>
  )
}
