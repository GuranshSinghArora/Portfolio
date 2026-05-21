'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FolderOpen, FileText, Mail, Home } from 'lucide-react'

const navItems = [
  { href: '/',          label: 'Home',     icon: Home },
  { href: '/projects',  label: 'Projects', icon: FolderOpen },
  { href: '/resume',    label: 'Resume',   icon: FileText },
  { href: '/contact',   label: 'Contact',  icon: Mail },
]

export default function Navbar() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md border-b'
          : 'bg-transparent'
      }`}
      style={{
        background: scrolled ? 'rgba(5, 10, 20, 0.55)' : 'transparent',
        borderColor: scrolled ? 'rgba(59,130,246,0.08)' : 'transparent',
      }}
    >

      {/* Logo */}
      <Link href="/" className="font-syne font-extrabold text-xl tracking-tight text-text hover:text-accent transition-colors">
        Guransh<span className="text-accent">.</span>
      </Link>

      {/* Icon nav — right side */}
      <div className="flex items-center gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link key={href} href={href} className={`nav-icon-btn ${active ? 'active' : ''}`}>
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
