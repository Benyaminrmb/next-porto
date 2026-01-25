'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@heroui/react';
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';

export default function FooterClean() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  const socialLinks = [
    { icon: Github, href: 'https://github.com/benyaminrmb', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/benyaminrmb', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:benyaminrmb@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { title: locale === 'fa' ? 'پروژه‌ها' : 'Projects', href: `/${locale}/projects` },
    { title: locale === 'fa' ? 'بلاگ' : 'Blog', href: `/${locale}/blog` },
    { title: locale === 'fa' ? 'درباره من' : 'About', href: `/${locale}/about` },
    { title: locale === 'fa' ? 'تجربه' : 'Experience', href: `/${locale}/experience` },
  ];

  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="section-container-wide relative py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-black font-bold text-lg">B</span>
                </div>
              </div>
              <span className="font-semibold text-lg text-white">Benyamin</span>
            </Link>
            <p className="text-white/40 text-sm max-w-sm mb-6">
              {locale === 'fa'
                ? 'توسعه‌دهنده فول‌استک با تمرکز بر ساخت تجربیات دیجیتال زیبا و کاربردی.'
                : 'Full-stack developer focused on building beautiful and functional digital experiences.'}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  as="a"
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  isIconOnly
                  variant="flat"
                  size="sm"
                  className="bg-white/[0.03] border border-white/[0.08] hover:border-primary/30 hover:bg-primary/10 transition-all"
                >
                  <social.icon className="h-4 w-4 text-white/60" />
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {locale === 'fa' ? 'صفحات' : 'Pages'}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {locale === 'fa' ? 'تماس' : 'Contact'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:benyaminrmb@gmail.com"
                  className="text-white/40 hover:text-primary text-sm transition-colors"
                >
                  benyaminrmb@gmail.com
                </a>
              </li>
              <li>
                <span className="text-white/40 text-sm">
                  {locale === 'fa' ? 'تهران، ایران' : 'Tehran, Iran'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/30">
              <span>© {new Date().getFullYear()}</span>
              <span>Benyamin Bolhassani</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {locale === 'fa' ? 'ساخته شده با' : 'Made with'}
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/30">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {locale === 'fa' ? 'آماده همکاری' : 'Available for work'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
