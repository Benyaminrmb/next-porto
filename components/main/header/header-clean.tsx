'use client'
import {useState} from 'react'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import {Menu, X} from 'lucide-react'
import {ModeToggle} from '@/components/main/mode-toggle'
import {LanguageSwitcher} from '@/components/ui/language-switcher'

export default function HeaderClean() {
  const [open, setOpen] = useState(false)
  const params = useParams<{locale: string}>()
  const locale = params.locale === 'fa' ? 'fa' : 'en'
  const links = [
    ['#work', locale === 'fa' ? 'پروژه‌ها' : 'Work'],
    ['#expertise', locale === 'fa' ? 'تخصص' : 'Expertise'],
    ['#experience', locale === 'fa' ? 'تجربه' : 'Experience'],
    ['#about', locale === 'fa' ? 'درباره' : 'About'],
  ]
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href={`/${locale}`}>
          {locale === 'fa' ? 'بنیامین بوالحسنی' : 'Benyamin Bolhassani'}
          <span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([path, label]) => (
            <Link key={path} href={`/${locale}${path}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <ModeToggle />
          <a className="contact-link" href="mailto:benyaminrmb@gmail.com">
            {locale === 'fa' ? 'تماس' : 'Contact'}
          </a>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav">
          {links.map(([path, label]) => (
            <Link
              onClick={() => setOpen(false)}
              key={path}
              href={`/${locale}${path}`}>
              {label}
            </Link>
          ))}
          <a href="mailto:benyaminrmb@gmail.com">
            {locale === 'fa' ? 'تماس' : 'Contact'}
          </a>
        </nav>
      )}
    </header>
  )
}
