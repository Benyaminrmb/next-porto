'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Github, Linkedin, ArrowUpRight, MapPin, Clock } from 'lucide-react'

interface Contact {
  email: string
  github?: string
  linkedin?: string
  location?: string
}

interface ContactBentoProps {
  contact: Contact
}

export function ContactBento({ contact }: ContactBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  const socialLinks = [
    contact.github    && { href: contact.github,    Icon: Github,   label: 'GitHub' },
    contact.linkedin  && { href: contact.linkedin,  Icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${contact.email}`, Icon: Mail, label: 'Email' },
  ].filter(Boolean) as { href: string; Icon: typeof Mail; label: string }[]

  return (
    <section className="pb-20">
      <div className="page-container">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="eyebrow">{locale === 'fa' ? 'تماس' : 'Contact'}</span>
          <hr className="flex-1" style={{ borderColor: 'var(--clr-border)' }} />
        </div>

        <div className="bento-grid">

          {/* ── CTA card ── */}
          <div className="col-span-12 lg:col-span-8 bento bento-tall flex flex-col relative">
            <span className="x tl" />
            <span className="x tr" />
            <span className="x bl dim" />
            <span className="x br dim" />

            <span className="bento-kind">
              {locale === 'fa' ? 'همکاری' : 'Let\'s work together'}
            </span>

            <h2
              className="text-[clamp(1.5rem,4vw,2.8rem)] font-semibold mb-4"
              style={{ color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.2 }}
            >
              {locale === 'fa'
                ? 'ایده‌ای دارید؟ با من صحبت کنید'
                : "Have a project in mind?\nLet's build it."}
            </h2>

            <p className="bento-desc max-w-md mb-8" style={{ fontSize: '15px' }}>
              {locale === 'fa'
                ? 'آماده شنیدن ایده‌های شما هستم. پروژه‌های فریلنسری، همکاری تیمی یا مشاوره فنی.'
                : 'Open to freelance projects, team collaborations, and technical consulting. Response within 24 hours.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${contact.email}`} className="btn-accent">
                <Mail className="h-4 w-4" />
                {locale === 'fa' ? 'ارسال ایمیل' : 'Send an email'}
              </a>
              {socialLinks.filter(l => l.label !== 'Email').map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>

            <div className="bento-foot flex flex-wrap gap-4">
              {contact.location && (
                <span className="bento-meta">
                  <MapPin className="h-3 w-3" />
                  {locale === 'fa' ? 'تهران، ایران' : contact.location}
                </span>
              )}
              <span className="bento-meta">
                <Clock className="h-3 w-3" />
                {locale === 'fa' ? 'پاسخ ظرف ۲۴ ساعت' : 'Response within 24h'}
              </span>
            </div>
          </div>

          {/* ── Social links column ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="bento bento-link flex items-center justify-between"
                style={{ minHeight: 'auto', padding: '16px 20px' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-md"
                    style={{ background: 'var(--bg-3)', border: '1px solid var(--clr-border)' }}
                  >
                    <Icon className="h-4 w-4" style={{ color: 'var(--fg-3)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{label}</p>
                    <p className="bento-meta" style={{ fontSize: '11px' }}>
                      {label === 'Email' ? contact.email : `/${label.toLowerCase()}`}
                    </p>
                  </div>
                </div>
                <span className="bento-arrow static" style={{ position: 'static', color: 'var(--fg-4)' }}>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}

            {/* Availability card */}
            <div className="bento bento-gridded flex flex-col justify-between" style={{ minHeight: 'auto' }}>
              <span className="bento-kind">
                {locale === 'fa' ? 'وضعیت' : 'Status'}
              </span>
              <div className="flex items-center gap-2.5 mt-2">
                <span className="status-dot" />
                <span className="text-sm" style={{ color: 'var(--fg-2)' }}>
                  {locale === 'fa' ? 'آماده همکاری' : 'Available for work'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
