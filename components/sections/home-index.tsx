'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Mail } from 'lucide-react'

interface Project {
  slug: string
  title: string
  tags?: string[]
}

interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
}

interface BrainItem {
  kind: 'idea' | 'youtube' | 'build'
  title: string
  body: string
  date: string
}

interface HomeIndexProps {
  name: string
  description: string
  availability?: string
  email: string
  projects: Project[]
  posts: Post[]
  brain: BrainItem[]
}

const IX_KEYS = ['about', 'work', 'blog', 'brain', 'now', 'stack', 'resume', 'contact'] as const

const IX_COPY: Record<string, { en: { title: string; desc: string; meta: string }; fa: { title: string; desc: string; meta: string } }> = {
  about: {
    en: { title: 'About', desc: 'Long-form intro — who I am, what I value, how I got here.', meta: 'INTRO' },
    fa: { title: 'درباره', desc: 'معرفی بلند — من کی هستم، به چه چیزی اهمیت می‌دهم، چطور به اینجا رسیدم.', meta: 'معرفی' },
  },
  work: {
    en: { title: 'Work', desc: 'Selected projects I have shipped — client work and side projects.', meta: 'PROJECTS' },
    fa: { title: 'پروژه‌ها', desc: 'پروژه‌های منتخبی که تحویل داده‌ام — کار برای کارفرما و پروژه‌های جانبی.', meta: 'پروژه' },
  },
  blog: {
    en: { title: 'Blog', desc: 'Essays, notes, and project logs — mostly on Laravel and shipping.', meta: 'POSTS' },
    fa: { title: 'بلاگ', desc: 'مقاله‌ها، یادداشت‌ها و گزارش پروژه‌ها — عمدتاً درباره لاراول و تحویل محصول.', meta: 'مقاله' },
  },
  brain: {
    en: { title: 'Brain', desc: 'Ideas, video concepts, and tools I want to build. Half-thoughts.', meta: 'IDEAS' },
    fa: { title: 'ذهن', desc: 'ایده‌ها، مفاهیم ویدیویی و ابزارهایی که می‌خواهم بسازم. نیمه‌فکرها.', meta: 'ایده' },
  },
  now: {
    en: { title: 'Now', desc: 'A live snapshot of what I am working on, reading, and building.', meta: 'UPDATED' },
    fa: { title: 'اکنون', desc: 'عکس لحظه‌ای زنده از آنچه روی آن کار می‌کنم، می‌خوانم و می‌سازم.', meta: 'به‌روزرسانی' },
  },
  stack: {
    en: { title: 'Stack', desc: 'The tools, software, and habits behind how I build and ship.', meta: '/USES' },
    fa: { title: 'استک', desc: 'ابزارها، نرم‌افزارها و عادت‌هایی که پشت ساخت و تحویل کارهایم هستند.', meta: '/uses' },
  },
  resume: {
    en: { title: 'Resume', desc: 'The full long-form CV — experience, education, skills.', meta: 'CV' },
    fa: { title: 'رزومه', desc: 'رزومه کامل — تجربه، تحصیلات، مهارت‌ها.', meta: 'رزومه' },
  },
  contact: {
    en: { title: 'Contact', desc: 'Get in touch — direct email or social links.', meta: 'GET IN TOUCH' },
    fa: { title: 'تماس', desc: 'در ارتباط باشید — ایمیل مستقیم یا شبکه‌های اجتماعی.', meta: 'تماس' },
  },
}

const LED_LABEL: Record<string, { en: string; fa: string; cls: string }> = {
  essay:   { en: 'ESSAY', fa: 'مقاله', cls: 'essay' },
  note:    { en: 'NOTE', fa: 'یادداشت', cls: 'note' },
  log:     { en: 'LOG', fa: 'گزارش', cls: 'log' },
  idea:    { en: 'IDEA', fa: 'ایده', cls: 'idea' },
  youtube: { en: 'VIDEO', fa: 'ویدیو', cls: 'youtube' },
  build:   { en: 'BUILD', fa: 'ساخت', cls: 'build' },
  work:    { en: 'SHIPPED', fa: 'تحویل شد', cls: 'work' },
}

function shortDate(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', { month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

function monthDate(ym: string, locale: string) {
  try {
    const [y, m] = ym.split('-')
    return new Date(`${y}-${m}-01`).toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', { month: 'short', year: 'numeric' })
  } catch {
    return ym
  }
}

export function HomeIndex({ name, description, availability, email, projects, posts, brain }: HomeIndexProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isFa = locale === 'fa'

  const today = new Date().toLocaleDateString(isFa ? 'fa-IR' : 'en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  }).toUpperCase()
  const editionNo = new Date().getFullYear() - 2020
  const featured = posts[0]
  const pinned = projects[0]
  const firstName = isFa ? name : name.split(' ')[0]

  const ledger = [
    ...posts.map((p) => ({
      date: shortDate(p.date, locale),
      ts: new Date(p.date).getTime(),
      kind: 'essay',
      title: p.title,
      route: `/${locale}/blog/${p.slug}`,
    })),
    ...brain.map((b) => ({
      date: monthDate(b.date, locale),
      ts: new Date(b.date + '-01').getTime(),
      kind: b.kind,
      title: b.title,
      route: `/${locale}/brain`,
    })),
    ...(pinned ? [{
      date: monthDate('2026-04', locale),
      ts: new Date('2026-04-15').getTime(),
      kind: 'work',
      title: isFa ? `${pinned.title} نسخه ۲ منتشر شد` : `${pinned.title} v2 launched`,
      route: `/${locale}/projects/${pinned.slug}`,
    }] : []),
  ].sort((a, b) => b.ts - a.ts).slice(0, 6)

  return (
    <section className="pt-[88px] pb-16">
      <div className="page-container" style={{ maxWidth: 760 }}>

        {/* ── Masthead ── */}
        <div className="mast">
          <span>{name.toUpperCase()}</span>
          <span className="mast-rule" />
          <span>{today}</span>
          <span className="mast-rule" />
          <span className="vol">{`VOL. 06 / №${editionNo}`}</span>
        </div>

        {/* ── Greeting ── */}
        <section className="greeting relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, var(--grid-dot) 1.3px, transparent 0)',
              backgroundSize: '20px 20px',
              maskImage: 'linear-gradient(180deg, transparent, black 30%, black 70%, transparent)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent, black 30%, black 70%, transparent)',
            }}
          />
          <div className="relative z-[1]">
            <div className="greeting-eyebrow">{isFa ? 'یک شاخص شخصی · خوش آمدید' : 'A PERSONAL INDEX · WELCOME'}</div>
            <div className="greeting-hi">{isFa ? 'سلام —' : 'Hi —'}</div>
            <h1 className="greeting-name">
              {isFa ? `من ${firstName}` : `I'm ${firstName}`}
              <span className="accent">.</span>
            </h1>
            <p className="greeting-tag">{description}</p>
            <div className="greeting-quick">
              <Link href={`/${locale}/projects`} className="q accent">→ {isFa ? 'مشاهده پروژه‌ها' : 'View work'}</Link>
              <span className="sep">·</span>
              <Link href={`/${locale}/about`} className="q">{isFa ? 'درباره من' : 'About me'}</Link>
              <span className="sep">·</span>
              <Link href={`/${locale}/blog`} className="q">{isFa ? 'بلاگ را بخوانید' : 'Read the blog'}</Link>
              <span className="sep">·</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </section>

        {/* ── Letter ── */}
        <section className="letter">
          <div className="letter-meta">
            <span>{isFa ? 'از' : 'FROM'}<b>{isFa ? 'تهران، ایران' : 'Tehran, Iran'}</b></span>
            <span className="dot-sep">·</span>
            <span>GMT<b>+3:30</b></span>
            <span className="dot-sep">·</span>
            <span>{isFa ? 'وضعیت' : 'STATUS'}<b style={{ color: '#22c55e' }}>● {availability ?? (isFa ? 'در دسترس' : 'Available')}</b></span>
            {pinned && (
              <>
                <span className="dot-sep">·</span>
                <span>{isFa ? 'سنجاق‌شده' : 'PINNED'}<b>{pinned.title}</b></span>
              </>
            )}
          </div>
          <div className="letter-body">
            <p>
              {isFa ? (
                <>
                  این سایت را مثل یک روزنامه دست‌ساز کوچک ببینید که هر وقت حرفی برای گفتن دارم منتشر می‌شود.{' '}
                  <Link href={`/${locale}/blog`}>بلاگ</Link> نوشته‌های بلند است؛ صفحه{' '}
                  <Link href={`/${locale}/brain`}>ذهن</Link> نیمه‌فکرها و ایده‌های ساخته‌نشده است.
                </>
              ) : (
                <>
                  Think of this site as a small, hand-set newspaper that prints whenever I have something worth saying. The{' '}
                  <Link href={`/${locale}/blog`}>blog</Link> is the long writing; the{' '}
                  <Link href={`/${locale}/brain`}>brain</Link> page is the half-thoughts and unbuilt ideas.
                </>
              )}
            </p>
            <p>
              {isFa ? (
                <>
                  برای جنبه‌های عملی: <Link href={`/${locale}/projects`}>کار</Link> فهرست چیزهایی است که تحویل داده‌ام،{' '}
                  <Link href={`/${locale}/resume`}>رزومه</Link> سوابق کامل را دارد، و{' '}
                  <Link href={`/${locale}/now`}>اکنون</Link> پاسخ صادقانه به «این ماه چیکار می‌کنی؟» است.
                </>
              ) : (
                <>
                  For the practical stuff: <Link href={`/${locale}/projects`}>work</Link> lists what I&apos;ve shipped,{' '}
                  <Link href={`/${locale}/resume`}>resume</Link> has the long-form CV, and{' '}
                  <Link href={`/${locale}/now`}>/now</Link> is the honest &quot;what are you doing this month?&quot;
                </>
              )}
            </p>
            <p>
              {isFa ? (
                <>هر فصل تعداد کمی پروژه می‌پذیرم. اگر باید صحبت کنیم، صندوق ورودی من <a href={`mailto:${email}`}>باز</a> است.</>
              ) : (
                <>Taking a small number of projects each quarter. If we should talk, my inbox is <a href={`mailto:${email}`}>open</a>.</>
              )}
            </p>
            <p className="signoff">{isFa ? `— ${firstName}` : `— ${firstName}`}</p>
          </div>
        </section>

        {/* ── Index ── */}
        <header className="sec-head">
          <span className="num">01</span>
          <h2>{isFa ? 'شاخص' : 'The index'}</h2>
          <span className="rule" />
          <span className="cnt">{isFa ? `${IX_KEYS.length} مورد` : `${IX_KEYS.length} entries`}</span>
        </header>
        <ul className="ix-list">
          {IX_KEYS.map((key, i) => {
            const copy = IX_COPY[key][isFa ? 'fa' : 'en']
            return (
              <li key={key}>
                <Link href={`/${locale}/${key}`} className="ix-row">
                  <span className="ix-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ix-title">{copy.title}</span>
                  <span className="ix-desc">{copy.desc}</span>
                  <span className="ix-meta">{copy.meta}</span>
                  <ArrowUpRight className="ix-arrow h-3 w-3" />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* ── Featured ── */}
        {featured && (
          <>
            <header className="sec-head">
              <span className="num">02</span>
              <h2>{isFa ? 'این شماره' : 'This issue'}</h2>
              <span className="rule" />
              <span className="cnt">{isFa ? 'نوشته منتخب' : 'Featured writing'}</span>
            </header>
            <Link href={`/${locale}/blog/${featured.slug}`} className="feature">
              <div className="feature-meta">
                <span className="pill">● {(isFa ? 'مقاله' : 'ESSAY')}</span>
                <span>{isFa ? 'تاریخ' : 'POSTED'}<b>{shortDate(featured.date, locale)}</b></span>
                <span>{isFa ? 'مدت مطالعه' : 'READ'}<b>{featured.readingTime} {isFa ? 'دقیقه' : 'min'}</b></span>
                {featured.tags?.length > 0 && <span>{isFa ? 'برچسب' : 'TAGGED'}<b>{featured.tags.join(', ')}</b></span>}
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <div className="feature-foot">
                <span className="read">{isFa ? 'مطالعه نوشته' : 'Read the piece'} <ArrowUpRight className="h-3 w-3" /></span>
              </div>
            </Link>
          </>
        )}

        {/* ── Ledger ── */}
        {ledger.length > 0 && (
          <>
            <header className="sec-head">
              <span className="num">{featured ? '03' : '02'}</span>
              <h2>{isFa ? 'فعالیت‌های اخیر' : 'Recent activity'}</h2>
              <span className="rule" />
              <span className="cnt">{isFa ? `${ledger.length} مورد` : `${ledger.length} entries`}</span>
            </header>
            <div className="ledger">
              {ledger.map((row, i) => {
                const lbl = LED_LABEL[row.kind] ?? { en: row.kind.toUpperCase(), fa: row.kind, cls: row.kind }
                return (
                  <Link key={i} href={row.route} className="led-row">
                    <span className="led-date">{row.date}</span>
                    <span className={`led-kind ${lbl.cls}`}>{isFa ? lbl.fa : lbl.en}</span>
                    <span className="led-title">{row.title}</span>
                    <ArrowUpRight className="led-arrow h-3 w-3" />
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {/* ── Closing ── */}
        <section className="closing">
          <div className="fin">{isFa ? '—— پایان ——' : '—— FIN ——'}</div>
          <h3>{isFa ? 'ممنون که خواندید. هر وقت خواستید پیام بدهید.' : 'Thanks for reading. Drop a line whenever.'}</h3>
          <p>
            {isFa
              ? 'این شاخص تقریباً هر ماه یک‌بار بازنویسی می‌شود — وقتی چیز جالبی منتشر شود، بیشتر. شماره بعدی وقتی چیزی برای چاپ باشد منتشر می‌شود.'
              : "This index is rewritten roughly once a month — more often when something interesting ships. The next issue lands when there's something worth printing."}
          </p>
          <div className="closing-actions">
            <Link href={`/${locale}/contact`} className="btn-accent">
              {isFa ? 'ارسال خلاصه پروژه' : 'Send a brief'} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <a href={`mailto:${email}`} className="btn-ghost">
              <Mail className="h-3.5 w-3.5" /> {isFa ? 'ایمیل' : 'Email'}
            </a>
            <Link href={`/${locale}/about`} className="btn-ghost">{isFa ? 'درباره من' : 'About me'}</Link>
          </div>
          <div className="closing-info">
            <span>{isFa ? 'نسخه' : 'EDITION'}<b>{`VOL. 06 / №${editionNo}`}</b></span>
            <span>{isFa ? 'ساخته‌شده با' : 'BUILT WITH'}<b>Next.js & React</b></span>
            <span>{isFa ? 'ارسال‌شده از' : 'SHIPPED FROM'}<b>{isFa ? 'تهران' : 'Tehran'}</b></span>
            <span>{isFa ? 'شماره بعدی' : 'NEXT ISSUE'}<b>{isFa ? 'هرگاه چیزی منتشر شود' : 'When something ships'}</b></span>
          </div>
        </section>
      </div>
    </section>
  )
}
