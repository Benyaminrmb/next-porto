'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ModeToggle } from '@/components/main/mode-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Menu, X } from 'lucide-react';

export default function HeaderClean() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');

  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  const navLinks = [
    { title: t('projects'), href: `/${locale}/projects` },
    { title: t('blog'), href: `/${locale}/blog` },
    { title: t('about'), href: `/${locale}/about` },
    { title: t('experience'), href: `/${locale}/experience` },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6">
      <div className="section-container-wide">
        <nav className="flex items-center justify-between px-6 py-4">
          {/* Simple Text Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-white hover:text-white/80 transition-colors"
          >
            Benyamin
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-white font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Settings */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 px-6 py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive(link.href)
                      ? 'text-white font-medium'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
