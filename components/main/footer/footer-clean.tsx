'use client'
import Link from 'next/link'
import {useParams} from 'next/navigation'
export default function FooterClean() {
  const params = useParams<{locale: string}>()
  const l = params.locale === 'fa' ? 'fa' : 'en'
  const name = l === 'fa' ? 'بنیامین بوالحسنی' : 'Benyamin Bolhassani'
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="wordmark" href={`/${l}`}>
            {name}
            <span>.</span>
          </Link>
          <p>
            {l === 'fa'
              ? 'مهندس نرم‌افزار فول‌استک و هوش مصنوعی.'
              : 'Full-stack software and AI engineer.'}
          </p>
        </div>
        <nav>
          <Link href={`/${l}/projects`}>
            {l === 'fa' ? 'پروژه‌ها' : 'Projects'}
          </Link>
          <Link href={`/${l}/resume`}>{l === 'fa' ? 'رزومه' : 'Resume'}</Link>
          <Link href={`/${l}#expertise`}>
            {l === 'fa' ? 'تخصص' : 'Expertise'}
          </Link>
        </nav>
        <div className="footer-contact">
          <a href="mailto:benyaminrmb@gmail.com">benyaminrmb@gmail.com</a>
          <a href="https://linkedin.com/in/benyaminrmb">LinkedIn</a>
          <a href="https://github.com/benyaminrmb">GitHub</a>
        </div>
      </div>
      <div className="shell copyright">
        © {new Date().getFullYear()} {name}
      </div>
    </footer>
  )
}
