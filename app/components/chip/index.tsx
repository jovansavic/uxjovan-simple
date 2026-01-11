import { ReactNode } from 'react'
import './index.css'

type ChipVariant =
  | 'gray'
  | 'blue'
  | 'purple'
  | 'amber'
  | 'red'
  | 'pink'
  | 'green'
  | 'teal'

interface ChipProps {
  children: ReactNode
  icon?: ReactNode
  variant?: ChipVariant
  href?: string
  className?: string
}

const variantStyles: Record<ChipVariant, string> = {
  gray: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:shadow-neutral-300/50 dark:hover:shadow-neutral-700/50',
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:shadow-blue-300/50 dark:hover:shadow-blue-700/50',
  purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:shadow-purple-300/50 dark:hover:shadow-purple-700/50',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:shadow-amber-300/50 dark:hover:shadow-amber-700/50',
  red: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 hover:shadow-red-300/50 dark:hover:shadow-red-700/50',
  pink: 'bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/50 hover:shadow-pink-300/50 dark:hover:shadow-pink-700/50',
  green: 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 hover:shadow-green-300/50 dark:hover:shadow-green-700/50',
  teal: 'bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/50 hover:shadow-teal-300/50 dark:hover:shadow-teal-700/50',
}

export function Chip({ children, icon, variant = 'gray', href, className = '' }: ChipProps) {
  const baseStyles = `
    inline-flex items-center gap-1.5
    px-2.5 py-1
    text-xs font-medium
    rounded-full
    transition-all duration-200 ease-out
    hover:scale-105 hover:shadow-md
    active:scale-100
    chip-animated
  `

  const content = (
    <>
      {icon && <span className="w-3.5 h-3.5 flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {content}
    </span>
  )
}

export function ChipGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap gap-1.5 ${className}`}>
      {children}
    </span>
  )
}
