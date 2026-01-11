'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TocItem {
  id: string
  text: string
  level: number
}

export function MobileTableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Parse headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const matches: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')

      matches.push({ id, text, level })
    }

    setHeadings(matches)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setIsExpanded(false)
  }

  const activeHeading = headings.find(h => h.id === activeId)

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* Fixed bottom bar - shows current section */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-8">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 flex items-center justify-between shadow-lg"
        >
          <span className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            On this page
          </span>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate ml-4 max-w-[60%] text-right">
            {activeHeading?.text || headings[0]?.text}
          </span>
        </button>
      </div>

      {/* Bottom sheet overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsExpanded(false)}
              className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Bottom sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="xl:hidden fixed bottom-0 left-4 right-4 z-50 bg-white dark:bg-neutral-900 rounded-t-2xl max-h-[70vh] overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800 border-b-0"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-4 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  On this page
                </h4>
              </div>

              {/* Scrollable TOC list */}
              <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-4">
                <ul className="space-y-1">
                  {headings.map(({ id, text, level }) => (
                    <li key={id} className={level === 3 ? 'ml-4' : ''}>
                      <button
                        onClick={() => scrollToHeading(id)}
                        className={`
                          text-left w-full py-2 px-3 rounded-lg text-sm
                          transition-colors duration-150
                          ${
                            activeId === id
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }
                        `}
                      >
                        {text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
