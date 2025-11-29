'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/main/mode-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Menu, Github, Linkedin, Sparkles, X } from 'lucide-react';
import { useAppStore } from '@/store/app';

export default function HeaderRedesign() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { headerLinks } = useAppStore((state) => state);

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass-card shadow-xl' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold text-display hidden sm:block group-hover:gradient-text transition-all">
              BenyaminRmb
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {headerLinks.map((link, index) => (
              <Link key={index} href={link.url}>
                <Button
                  variant={isActive(link.url) ? 'default' : 'ghost'}
                  size="sm"
                  className={`relative ${
                    isActive(link.url)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  {link.title}
                  {isActive(link.url) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="glass-card" asChild>
                  <a
                    href="https://github.com/benyaminrmb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="glass-card" asChild>
                  <a
                    href="https://linkedin.com/in/benyaminrmb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              <Separator orientation="vertical" className="h-6" />
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card w-full sm:w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent text-white shadow-lg">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-display">
                      BenyaminRmb
                    </span>
                  </div>

                  <Separator />

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col gap-2">
                    {headerLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant={isActive(link.url) ? 'default' : 'ghost'}
                          className="w-full justify-start text-lg"
                        >
                          {link.title}
                        </Button>
                      </Link>
                    ))}
                  </nav>

                  <Separator />

                  {/* Mobile Social Links */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      Connect
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="flex-1" asChild>
                        <a
                          href="https://github.com/benyaminrmb"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" className="flex-1" asChild>
                        <a
                          href="https://linkedin.com/in/benyaminrmb"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Animated border bottom */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.header>
  );
}
