'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Remove code blocks before parsing headings
    const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')
    
    // Parse headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const matches: TocItem[] = []
    const seenIds = new Set<string>()
    let match

    while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      let id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')

      // Deduplicate IDs
      if (seenIds.has(id)) {
        let counter = 2
        while (seenIds.has(`${id}-${counter}`)) {
          counter++
        }
        id = `${id}-${counter}`
      }
      seenIds.add(id)

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
      const offset = 100 // spacing above the heading
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="toc hidden xl:block">
      <div className="sticky top-24">
        <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 mb-3 uppercase tracking-wide">
          On this page
        </h4>
        <ul className="space-y-1.5 text-xs">
          {headings.map(({ id, text, level }) => (
            <li
              key={id}
              className={`
                ${level === 3 ? 'ml-4' : ''}
                transition-colors duration-200
              `}
            >
              <button
                onClick={() => scrollToHeading(id)}
                className={`
                  text-left w-full py-1 
                  hover:text-neutral-900 dark:hover:text-neutral-100
                  transition-colors duration-200
                  ${
                    activeId === id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }
                `}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
