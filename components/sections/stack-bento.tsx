'use client'

import { usePathname } from 'next/navigation'

interface StackBentoProps {
  stack: {
    group: string
    items: { k: string; v: string }[]
  }[]
}

export function StackBento({ stack }: StackBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8 max-w-xl">
          <span className="eyebrow">{locale === 'fa' ? 'استک' : 'Stack'}</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2 mb-3"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'ابزارهایی که سراغشان می‌روم.' : 'Tools I reach for.'}
          </h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-3)' }}>
            {locale === 'fa'
              ? 'استک، روش‌ها و عادت‌هایی که پشت ساخت و تحویل کارهایم هستند.'
              : 'The stack, practices, and habits behind how I build and ship.'}
          </p>
        </div>

        <div className="bento-grid">
          {stack.map((group, i) => (
            <div
              key={group.group}
              className="col-span-12 md:col-span-6 bento flex flex-col relative"
            >
              {i === 0 && <span className="x tl" />}
              <span className="bento-kind">{group.group}</span>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.k} className="flex items-baseline justify-between gap-4 pb-3" style={{ borderBottom: '1px dashed var(--clr-border)' }}>
                    <span className="bento-meta shrink-0">{item.k}</span>
                    <span className="text-sm text-end" style={{ color: 'var(--fg-2)' }}>{item.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
