'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { ModeToggle } from '@/components/main/mode-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderClean() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');

  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: t('projects'), href: `/${locale}/projects` },
    { title: t('blog'), href: `/${locale}/blog` },
    { title: t('about'), href: `/${locale}/about` },
    { title: t('experience'), href: `/${locale}/experience` },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="section-container-wide">
        <nav
          className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-black/60 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/20'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
              {/* Logo box */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center">
                <span className="text-black font-bold text-lg">B</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-lg tracking-tight text-white">
                Benyamin
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[11px] text-white/50 font-medium uppercase tracking-wider">
                  {locale === 'fa' ? 'آماده همکاری' : 'Available'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] rounded-full p-1.5 border border-white/[0.06]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                    transition={{ type: "spring" as const, bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.title}</span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.03] rounded-full p-1 border border-white/[0.06]">
              <LanguageSwitcher />
              <div className="w-px h-5 bg-white/10" />
              <ModeToggle />
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              className="md:hidden bg-white/[0.05] border border-white/[0.08]"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3"
            >
              <div className="bg-black/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-3 shadow-2xl">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.href)
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary border border-primary/20'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
