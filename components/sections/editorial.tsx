import Image from 'next/image'
import Link from 'next/link'
import {ArrowUpRight, Download, Github, Linkedin, Mail} from 'lucide-react'
import type {PortfolioData} from '@/lib/data'
import type {BlogPostMeta} from '@/lib/blog'

const copy = {
  en: {
    selected: 'Selected work',
    view: 'View project',
    all: 'All projects',
    expertise: 'How I can help',
    experience: 'Experience',
    about: 'About me',
    contact: 'Have something in mind?',
    contactText:
      'I’m open to full-time roles and a small number of freelance projects. If you think we could work well together, send me a note.',
    work: 'See my work',
    email: 'Send an email',
    available: 'Available for new and remote roles',
    resume: 'Full résumé',
    download: 'Download PDF',
    projects: 'Projects',
    projectsSub:
      'A selection of products and systems I’ve worked on, what I built, and the decisions behind them.',
    aboutTitle:
      'I build software that is clear, fast, and easy to keep working on.',
    experienceTitle: 'More than six years building and improving web products.',
    now: 'Now',
    stack: 'Stack',
    brain: 'Notes',
    writing: 'Writing',
    read: 'Read article',
    education: 'Education',
  },
  fa: {
    selected: 'پروژه‌های منتخب',
    view: 'مشاهده پروژه',
    all: 'همه پروژه‌ها',
    expertise: 'چه کارهایی انجام می‌دهم',
    experience: 'تجربه کاری',
    about: 'درباره من',
    contact: 'موضوعی برای همکاری دارید؟',
    contactText:
      'برای موقعیت‌های تمام‌وقت و تعداد محدودی پروژه فریلنس آماده‌ام. اگر فکر می‌کنید می‌توانیم همکاری خوبی داشته باشیم، برایم بنویسید.',
    work: 'دیدن پروژه‌ها',
    email: 'ارسال ایمیل',
    available: 'آماده همکاری در موقعیت‌های جدید و دورکاری',
    resume: 'رزومه کامل',
    download: 'دریافت PDF',
    projects: 'پروژه‌ها',
    projectsSub:
      'منتخبی از محصول‌ها و سیستم‌هایی که روی آن‌ها کار کرده‌ام؛ سهم من در ساخت و تصمیم‌هایی که پشت هرکدام بوده است.',
    aboutTitle: 'نرم‌افزاری می‌سازم که روشن، سریع و قابل توسعه باشد.',
    experienceTitle: 'بیش از شش سال تجربه در ساخت و بهبود محصولات وب.',
    now: 'اکنون',
    stack: 'ابزارها',
    brain: 'یادداشت‌ها',
    writing: 'نوشته‌ها',
    read: 'مطالعه مقاله',
    education: 'تحصیلات',
  },
}

function C({locale}: {locale: string}) {
  return copy[locale === 'fa' ? 'fa' : 'en']
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <header className="page-intro">
      <p className="kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="lede">{description}</p>}
    </header>
  )
}

function ProjectCard({
  project,
  locale,
  featured = false,
}: {
  project: PortfolioData['projects'][number]
  locale: string
  featured?: boolean
}) {
  const t = C({locale})
  return (
    <article className={`project-card ${featured ? 'project-featured' : ''}`}>
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="project-image">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.description}`}
          fill
          sizes={
            featured
              ? '(max-width: 800px) 100vw, 66vw'
              : '(max-width: 800px) 100vw, 50vw'
          }
        />
      </Link>
      <div className="project-copy">
        <div className="project-meta">
          <span>
            {[project.company, project.role, project.year]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </div>
        <h3>
          <Link href={`/${locale}/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags?.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        {project.link && (
          <a
            className="project-url"
            href={project.link}
            target="_blank"
            rel="noreferrer">
            {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        )}
        <Link
          className="text-link"
          href={`/${locale}/projects/${project.slug}`}>
          {t.view} <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export function HomeEditorial({
  data,
  locale,
}: {
  data: PortfolioData
  locale: string
}) {
  const t = C({locale})
  const projects = data.projects.slice(0, 3)
  const expertise =
    locale === 'fa'
      ? [
          [
            'ابزارهای هوش مصنوعی',
            'عامل‌ها و اتوماسیون را جایی به کار می‌برم که زمان کار واقعی تیم را کم کنند، نه فقط برای نمایش.',
          ],
          [
            'بک‌اند و معماری سیستم',
            'API، سیستم‌های ماژولار، چندمستاجری و پایگاه‌داده‌هایی می‌سازم که بعد از رشد محصول هم قابل فهم بمانند.',
          ],
          [
            'ساخت و تحویل محصول',
            'دامنه را یاد می‌گیرم، سؤال می‌پرسم و قبل از نوشتن کد مطمئن می‌شوم مسئله درست را حل می‌کنیم.',
          ],
        ]
      : [
          [
            'AI tools and automation',
            'I use agents and automation when they save the team real time—not just because they are interesting to demo.',
          ],
          [
            'Backend and system design',
            'APIs, modular systems, multi-tenancy, and databases that remain understandable as the product grows.',
          ],
          [
            'Building the right thing',
            'I learn the domain, ask questions, and make sure we are solving the right problem before adding more code.',
          ],
        ]
  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero-status">
            <span className="status-pip" />
            {data.availability || t.available}
          </div>
          <p className="hero-role">{data.title}</p>
          <h1>
            {locale === 'fa' ? (
              'بنیامین بوالحسنی'
            ) : (
              <>
                Benyamin
                <br />
                <em>Bolhassani.</em>
              </>
            )}
          </h1>
          <p className="hero-deck">{data.description}</p>
          <div className="actions">
            <Link className="button primary" href={`/${locale}/projects`}>
              {t.work}
              <ArrowUpRight size={17} />
            </Link>
            <a className="button" href={`mailto:${data.contact.email}`}>
              {t.email}
              <Mail size={17} />
            </a>
            <a
              className="icon-link"
              href={data.contact.linkedin}
              aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
          </div>
        </div>
      </section>
      <section className="stats-strip">
        <div className="shell stats">
          {Object.entries(data.stats).map(([key, value]) => (
            <div key={key}>
              <strong>{value}</strong>
              <span>{key.replace(/([A-Z])/g, ' $1')}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section shell document-section">
        <div className="section-head">
          <div>
            <p className="kicker">01 — {t.selected}</p>
            <h2>
              {locale === 'fa'
                ? 'چند پروژه که ارزش دیدن دارند.'
                : 'A few projects worth opening.'}
            </h2>
          </div>
          <Link className="text-link" href={`/${locale}/projects`}>
            {t.all}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="featured-grid">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              locale={locale}
              featured={i === 0}
            />
          ))}
        </div>
      </section>
      <section className="section expertise">
        <div className="shell">
          <p className="kicker">02 — {t.expertise}</p>
          <div className="expertise-grid">
            {expertise.map((x, i) => (
              <article key={x[0]}>
                <span>0{i + 1}</span>
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell split-section">
        <div>
          <p className="kicker">03 — {t.experience}</p>
          <h2>{t.experienceTitle}</h2>
          <Link className="text-link" href={`/${locale}/experience`}>
            {t.resume}
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mini-timeline">
          {data.workExperience.slice(0, 3).map((x) => (
            <article key={x.id}>
              <div>
                <strong>{x.title}</strong>
                <span>{x.company}</span>
              </div>
              <time>{x.period}</time>
            </article>
          ))}
        </div>
      </section>
      <section className="section shell about-split">
        <div>
          <p className="kicker">04 — {t.about}</p>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div>
          <p className="large-copy">{data.description}</p>
          <div className="secondary-links">
            <Link href={`/${locale}/blog`}>{t.writing}</Link>
            <Link href={`/${locale}/now`}>{t.now}</Link>
            <Link href={`/${locale}/stack`}>{t.stack}</Link>
            <Link href={`/${locale}/brain`}>{t.brain}</Link>
          </div>
        </div>
      </section>
      <ContactBlock data={data} locale={locale} />
    </>
  )
}

export function ContactBlock({
  data,
  locale,
}: {
  data: PortfolioData
  locale: string
}) {
  const t = C({locale})
  return (
    <section id="contact" className="contact-block">
      <div className="shell">
        <p className="kicker">05 — {locale === 'fa' ? 'تماس' : 'Contact'}</p>
        <h2>{t.contact}</h2>
        <p>{t.contactText}</p>
        <div className="actions">
          <a className="button inverse" href={`mailto:${data.contact.email}`}>
            <Mail size={17} />
            {data.contact.email}
          </a>
          <a href={data.contact.linkedin}>
            <Linkedin size={17} />
            LinkedIn
          </a>
          <a href={data.contact.github}>
            <Github size={17} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export function ProjectsEditorial({
  data,
  locale,
}: {
  data: PortfolioData
  locale: string
}) {
  const t = C({locale})
  return (
    <div className="page shell">
      <PageIntro
        eyebrow="01 — Portfolio"
        title={t.projects}
        description={t.projectsSub}
      />
      <div className="project-list">
        {data.projects.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} />
        ))}
      </div>
    </div>
  )
}

export function AboutEditorial({
  data,
  locale,
}: {
  data: PortfolioData
  locale: string
}) {
  const t = C({locale})
  return (
    <div className="page shell">
      <PageIntro
        eyebrow={locale === 'fa' ? 'درباره' : 'About'}
        title={t.aboutTitle}
        description={data.description}
      />
      <div className="editorial-grid">
        <section>
          <h2>{locale === 'fa' ? 'روش کار من' : 'How I work'}</h2>
          <p className="large-copy">
            {locale === 'fa'
              ? 'اول سعی می‌کنم مسئله را درست بفهمم. بعد راه‌حلی می‌سازم که برای کاربر ساده باشد و برای تیمی که قرار است نگهداری‌اش کند دردسر نسازد.'
              : 'I try to understand the problem before choosing the tools. Then I build something that feels simple to use and does not become a headache for the team maintaining it.'}
          </p>
        </section>
        <section>
          <h2>{locale === 'fa' ? 'مهارت‌ها' : 'Capabilities'}</h2>
          {data.skillGroups?.map((g) => (
            <div className="skill-row" key={g.group}>
              <h3>{g.group}</h3>
              <p>{g.items.join(' · ')}</p>
            </div>
          ))}
        </section>
      </div>
      <ContactBlock data={data} locale={locale} />
    </div>
  )
}

export function ExperienceEditorial({
  data,
  locale,
  resume = false,
}: {
  data: PortfolioData
  locale: string
  resume?: boolean
}) {
  const t = C({locale})
  return (
    <div className="page shell">
      <PageIntro
        eyebrow={resume ? 'Curriculum vitae' : t.experience}
        title={t.experienceTitle}
        description={data.description}
      />
      {resume && (
        <a className="button" href="/resume.pdf" download>
          <Download size={17} />
          {t.download}
        </a>
      )}
      <section className="timeline-section">
        <h2>{t.experience}</h2>
        {data.workExperience.map((x) => (
          <article className="timeline-item" key={x.id}>
            <div className="timeline-date">{x.period}</div>
            <div>
              <h3>{x.title}</h3>
              <p className="company">{x.company}</p>
              <ul>
                {x.description.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="tags">
                {x.technologies?.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="timeline-section">
        <h2>{t.education}</h2>
        {data.education.map((x) => (
          <article className="timeline-item" key={x.id}>
            <div className="timeline-date">{x.period}</div>
            <div>
              <h3>{x.title}</h3>
              <p className="company">{x.company}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export function SimpleDataPage({
  type,
  data,
  locale,
}: {
  type: 'now' | 'stack' | 'brain'
  data: PortfolioData
  locale: string
}) {
  const t = C({locale})
  const title = type === 'now' ? t.now : type === 'stack' ? t.stack : t.brain
  return (
    <div className="page shell">
      <PageIntro
        eyebrow={`/${type}`}
        title={title}
        description={
          type === 'now'
            ? locale === 'fa'
              ? 'تصویری زنده از چیزهایی که این روزها روی آن‌ها کار می‌کنم.'
              : 'A live snapshot of what I’m working on and thinking about.'
            : type === 'stack'
              ? locale === 'fa'
                ? 'ابزارها و روش‌هایی که با آن‌ها محصول می‌سازم.'
                : 'The tools and practices behind how I build and ship.'
              : locale === 'fa'
                ? 'ایده‌ها، آزمایش‌ها و چیزهایی که شاید بسازم.'
                : 'Ideas, experiments, and things I might build.'
        }
      />
      <div className="data-list">
        {type === 'now' &&
          data.now?.items.map((x) => (
            <article key={x.label}>
              <p className="kicker">{x.label}</p>
              <h2>{x.value}</h2>
            </article>
          ))}
        {type === 'stack' &&
          data.stack?.map((x) => (
            <article key={x.group}>
              <h2>{x.group}</h2>
              {x.items.map((i) => (
                <div className="definition" key={i.k}>
                  <strong>{i.k}</strong>
                  <span>{i.v}</span>
                </div>
              ))}
            </article>
          ))}
        {type === 'brain' &&
          data.brain?.map((x) => (
            <article key={x.title}>
              <p className="kicker">
                {x.kind} · {x.date}
              </p>
              <h2>{x.title}</h2>
              <p>{x.body}</p>
            </article>
          ))}
      </div>
    </div>
  )
}

export function BlogEditorial({
  posts,
  locale,
}: {
  posts: BlogPostMeta[]
  locale: string
}) {
  const t = C({locale})
  return (
    <div className="page shell">
      <PageIntro
        eyebrow="Journal"
        title={t.writing}
        description={
          locale === 'fa'
            ? 'یادداشت‌هایی درباره مهندسی نرم‌افزار، معماری و ساخت محصول.'
            : 'Notes on software engineering, architecture, and building products.'
        }
      />
      <div className="post-list">
        {posts.map((p) => (
          <article key={p.slug}>
            <time>
              {new Date(p.date).toLocaleDateString(
                locale === 'fa' ? 'fa-IR' : 'en-US',
                {year: 'numeric', month: 'long', day: 'numeric'}
              )}
            </time>
            <div>
              <h2>
                <Link href={`/${locale}/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p>{p.description}</p>
              <Link className="text-link" href={`/${locale}/blog/${p.slug}`}>
                {t.read}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
