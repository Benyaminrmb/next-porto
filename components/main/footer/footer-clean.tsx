'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function FooterClean() {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  const navLinks = [
    { title: locale === 'fa' ? 'پروژه‌ها'  : 'Projects',   href: `/${locale}/projects` },
    { title: locale === 'fa' ? 'بلاگ'      : 'Blog',        href: `/${locale}/blog` },
    { title: locale === 'fa' ? 'درباره'    : 'About',       href: `/${locale}/about` },
    { title: locale === 'fa' ? 'تجربه'     : 'Experience',  href: `/${locale}/experience` },
  ]

  const socialLinks = [
    { href: 'https://github.com/benyaminrmb',    Icon: Github,   label: 'GitHub' },
    { href: 'https://linkedin.com/in/benyaminrmb', Icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:benyaminrmb@gmail.com',      Icon: Mail,     label: 'Email' },
  ]

  return (
    <footer style={{ borderTop: '1px solid var(--clr-border)', background: 'var(--bg-2)' }}>
      <div className="page-container">

        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">

          {/* Brand */}
          <div className="col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-4">
              <div
                className="flex items-center justify-center w-[28px] h-[28px] rounded-[6px] text-sm font-semibold flex-shrink-0"
                style={{
                  background: 'var(--fg)',
                  color: 'var(--bg)',
                  fontFamily: 'ui-monospace, monospace',
                  letterSpacing: '-0.04em',
                }}
              >
                B
              </div>
              <span className="font-medium text-sm" style={{ color: 'var(--fg-2)' }}>
                Benyamin Bolhassani
              </span>
            </Link>

            <p className="text-sm mb-5 max-w-xs" style={{ color: 'var(--fg-4)', lineHeight: 1.6 }}>
              {locale === 'fa'
                ? 'توسعه‌دهنده فول‌استک متخصص در لاراول و اکوسیستم جاوااسکریپت.'
                : 'Full-stack developer specialising in Laravel and the JavaScript ecosystem.'}
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
                  style={{
                    border: '1px solid var(--clr-border)',
                    color: 'var(--fg-4)',
                    background: 'var(--bg-3)',
                  }}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="eyebrow mb-4">
              {locale === 'fa' ? 'صفحات' : 'Pages'}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--fg-3)' }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow mb-4">
              {locale === 'fa' ? 'تماس' : 'Contact'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:benyaminrmb@gmail.com"
                  className="text-sm transition-colors"
                  style={{ color: 'var(--fg-3)' }}
                >
                  benyaminrmb@gmail.com
                </a>
              </li>
              <li className="text-sm" style={{ color: 'var(--fg-4)' }}>
                {locale === 'fa' ? 'تهران، ایران' : 'Tehran, Iran'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5"
          style={{ borderTop: '1px solid var(--clr-border)' }}
        >
          <span className="bento-meta" style={{ fontSize: '12px' }}>
            © {new Date().getFullYear()} Benyamin Bolhassani
          </span>

          <div className="flex items-center gap-2">
            <span className="status-dot" style={{ width: '6px', height: '6px' }} />
            <span className="bento-meta" style={{ fontSize: '12px' }}>
              {locale === 'fa' ? 'آماده همکاری' : 'Available for work'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
