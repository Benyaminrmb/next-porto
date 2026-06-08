'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ModeToggle } from '@/components/main/mode-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { Github, Menu, X } from 'lucide-react'

const NAV_SHORTCUTS: Record<string, string> = {
  about: 'A',
  projects: 'P',
  blog: 'B',
  experience: 'E',
  resume: 'R',
  now: 'N',
  stack: 'S',
  brain: 'K',
}

export default function HeaderClean() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')

  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isRTL = locale === 'fa'

  const primaryLinks = [
    { key: 'about',    title: t('about'),    href: `/${locale}/about` },
    { key: 'projects', title: t('projects'), href: `/${locale}/projects` },
    { key: 'blog',     title: t('blog'),     href: `/${locale}/blog` },
    { key: 'brain',    title: t('brain'),    href: `/${locale}/brain` },
  ]

  const secondaryLinks = [
    { key: 'experience', title: t('experience'), href: `/${locale}/experience` },
    { key: 'resume',     title: t('resume'),     href: `/${locale}/resume` },
    { key: 'now',        title: t('now'),        href: `/${locale}/now` },
    { key: 'stack',      title: t('stack'),      href: `/${locale}/stack` },
  ]

  const navLinks = [...primaryLinks, ...secondaryLinks]

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: 'color-mix(in oklab, var(--bg) 80%, transparent)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: '1px solid var(--clr-border)',
      }}
    >
      <div className="page-container">
        <nav className="flex items-center gap-7 h-[56px]">

          {/* ── Brand ── */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 flex-shrink-0 text-sm font-semibold"
            style={{ color: 'var(--fg-2)', letterSpacing: '-0.01em' }}
            aria-label="Home"
          >
            <span className="brand-mark">B</span>
            <span className="hidden sm:inline">Benyamin Bolhassani</span>
            <span
              className="hidden sm:inline font-normal"
              style={{ color: 'var(--fg-4)', fontSize: 11, fontFamily: 'var(--font-geist-mono, ui-monospace, monospace)' }}
            >
              {isRTL ? '/ نمونه‌کار' : '/ portfolio'}
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1 ms-auto">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: isActive(link.href) ? 'var(--fg)' : undefined,
                  background: isActive(link.href) ? 'var(--bg-3)' : undefined,
                  borderColor: isActive(link.href) ? 'var(--clr-border)' : 'transparent',
                }}
              >
                {link.title}
                {!isRTL && <kbd>{NAV_SHORTCUTS[link.key]}</kbd>}
              </Link>
            ))}
            <span className="nav-divider hidden lg:block" />
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link nav-link-sm hidden lg:flex"
                style={{
                  color: isActive(link.href) ? 'var(--fg)' : undefined,
                  background: isActive(link.href) ? 'var(--bg-3)' : undefined,
                  borderColor: isActive(link.href) ? 'var(--clr-border)' : 'transparent',
                }}
              >
                {link.title}
                {!isRTL && <kbd>{NAV_SHORTCUTS[link.key]}</kbd>}
              </Link>
            ))}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2 ms-auto md:ms-0">
            <span className="status-dot hidden md:inline-flex" />
            <span className="hidden md:inline eyebrow" style={{ color: 'var(--fg-4)' }}>
              {locale === 'fa' ? 'در دسترس' : 'Available'}
            </span>

            <LanguageSwitcher />
            <ModeToggle />

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="icon-btn hidden sm:grid"
              title="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="icon-btn md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      {isMenuOpen && (
        <div
          className="md:hidden"
          style={{ borderTop: '1px solid var(--clr-border)', background: 'var(--bg-2)' }}
        >
          <div className="page-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors"
                style={{
                  color: isActive(link.href) ? 'var(--fg)' : 'var(--fg-3)',
                  background: isActive(link.href) ? 'var(--bg-3)' : 'transparent',
                }}
              >
                {link.title}
                {isActive(link.href) && (
                  <span className="chip chip-accent text-[10px]">
                    {locale === 'fa' ? 'فعال' : 'Active'}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
