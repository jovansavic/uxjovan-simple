import Link from 'next/link'
import { HiEnvelope } from 'react-icons/hi2'

const emailSubject = encodeURIComponent('Hello from your website!')
const emailBody = encodeURIComponent(`
  Hi, Jovan. 
  <br/><br/>
  I was looking at your website and wanted to contact you because of [>WRITE_THE_REASON_HERE<]`)

const navItems = [
  { path: '/', name: 'home' },
  { path: '/notes', name: 'notes' },
]

export function Navbar() {
  return (
    <aside className="-ml-2 mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="focus-group flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className="focus-item transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Email chip */}
          <a
            href={`mailto:hi@uxjovan.com?subject=${emailSubject}&body=${emailBody}`}
            className="focus-item flex items-center gap-1.5 px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors text-neutral-700 dark:text-neutral-300"
          >
            <HiEnvelope className="w-3.5 h-3.5" />
            <span>hi@uxjovan.com</span>
          </a>
        </nav>
      </div>
    </aside>
  )
}
