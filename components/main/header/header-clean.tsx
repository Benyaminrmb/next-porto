'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { ModeToggle } from '@/components/main/mode-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderClean() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');

  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="section-container-wide">
        <nav
          className={`relative flex items-center justify-between rounded-3xl transition-all duration-700 ${
            scrolled
              ? 'px-6 py-4 bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50'
              : 'px-8 py-5 bg-black/40 backdrop-blur-md border border-white/5'
          }`}
        >
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative">
              {/* Animated Glow effect */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Logo box with better design */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-cyan-400 to-secondary flex items-center justify-center shadow-lg shadow-primary/50"
              >
                <span className="text-black font-black text-xl">B</span>
              </motion.div>
            </div>

            {/* Brand Name & Status */}
            <div className="hidden sm:block">
              <motion.span
                className="font-bold text-xl tracking-tight text-white block leading-none mb-1.5"
                whileHover={{ x: 2 }}
              >
                Benyamin
              </motion.span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-lg shadow-primary/50"></span>
                </span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  {locale === 'fa' ? 'آماده همکاری' : 'Available'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/[0.05] rounded-full px-2 py-2 border border-white/10 backdrop-blur-sm">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative group"
                >
                  <div
                    className={`relative px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {/* Active Background */}
                    {isActive(link.href) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover Background */}
                    {!isActive(link.href) && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}

                    {/* Link Text */}
                    <span className="relative z-10">{link.title}</span>

                    {/* Hover Underline Effect */}
                    {!isActive(link.href) && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "60%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Settings */}
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.05] rounded-full px-2 py-2 border border-white/10 backdrop-blur-sm">
              <LanguageSwitcher />
              <div className="w-px h-5 bg-white/20" />
              <ModeToggle />
            </div>

            {/* Mobile Settings */}
            <div className="flex sm:hidden items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <LanguageSwitcher />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ModeToggle />
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                isIconOnly
                variant="flat"
                size="md"
                className="md:hidden bg-white/[0.08] border border-white/10 hover:bg-white/[0.12] transition-all"
                onPress={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="md:hidden mt-4"
            >
              <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl shadow-black/50">
                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-2 mb-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-5 py-4 rounded-2xl text-base font-semibold transition-all ${
                          isActive(link.href)
                            ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary border border-primary/30 shadow-lg shadow-primary/20'
                            : 'text-white/70 hover:text-white hover:bg-white/[0.08] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.title}</span>
                          {isActive(link.href) && (
                            <Sparkles className="w-4 h-4 text-primary" />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-white/10"
                >
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-lg shadow-primary/50"></span>
                    </span>
                    <span className="text-sm text-primary font-bold uppercase tracking-wide">
                      {locale === 'fa' ? 'آماده برای پروژه‌های جدید' : 'Available for Projects'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
