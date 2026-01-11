import { SiInstagram, SiDribbble, SiBehance, SiFigma } from 'react-icons/si'
import { RiTwitterXFill, RiGlobalLine } from 'react-icons/ri'

const socialLinks = [
  { href: 'https://www.behance.net/uxjovan', icon: SiBehance, label: 'Behance' },
  { href: 'https://dribbble.com/uxjovan', icon: SiDribbble, label: 'Dribbble' },
  { href: 'https://www.instagram.com/uxjovan/', icon: SiInstagram, label: 'Instagram' },
  { href: 'https://x.com/uxjovan/', icon: RiTwitterXFill, label: 'X' },
  { href: 'https://www.figma.com/@uxjovan', icon: SiFigma, label: 'Figma' },
  { href: 'https://jovan.design', icon: RiGlobalLine, label: 'jovan.design' },
]

export default function Footer() {
  return (
    <footer className="mb-16 mt-16">
      {/* Social Links */}
      <div className="flex items-center gap-4 mb-8">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-500">
        © {new Date().getFullYear()} Jovan
      </p>
    </footer>
  )
}
