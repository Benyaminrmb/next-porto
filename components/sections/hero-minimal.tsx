"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { ArrowRight, ArrowLeft, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroMinimalProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroMinimal({ name, title, description }: HeroMinimalProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');

  const techStack = [
    { name: 'Laravel', icon: '🔴' },
    { name: 'Vue.js', icon: '💚' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Node.js', icon: '🟢' },
  ];

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 line-pattern opacity-50" />

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(94, 234, 212, 0)" />
              <stop offset="50%" stopColor="rgba(94, 234, 212, 0.5)" />
              <stop offset="100%" stopColor="rgba(94, 234, 212, 0)" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        </svg>
      </div>

      <div className="section-container-wide relative z-10">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-8"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">
                {locale === 'fa' ? 'آماده برای پروژه‌های جدید' : 'Available for new projects'}
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {locale === 'fa' ? (
                <>
                  <span className="text-white">{name}</span>
                  <br />
                  <span className="gradient-text">{title || t('defaultTitle')}</span>
                </>
              ) : (
                <>
                  <span className="text-white/90">Hi, I'm </span>
                  <span className="gradient-text text-glow">{name.split(' ')[0]}</span>
                  <br />
                  <span className="text-white/70">{title || t('defaultTitle')}</span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl"
          >
            {description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <span className="text-sm text-white/30 uppercase tracking-wider">
              {locale === 'fa' ? 'تکنولوژی‌ها' : 'Tech Stack'}
            </span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                >
                  <span className="mr-1.5">{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <Button
              as={Link}
              href={`/${locale}/projects`}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 text-black font-semibold px-8 rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all"
              endContent={isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            >
              {t('viewMyWork')}
            </Button>

            <Button
              as="a"
              href="mailto:benyaminrmb@gmail.com"
              size="lg"
              variant="bordered"
              className="border-white/20 text-white hover:bg-white/5 px-8 rounded-full"
            >
              {locale === 'fa' ? 'تماس با من' : 'Get in touch'}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm text-white/30">
              {locale === 'fa' ? 'شبکه‌های اجتماعی' : 'Connect'}
            </span>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: 'https://github.com/benyaminrmb', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/benyaminrmb', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:benyaminrmb@gmail.com', label: 'Email' },
              ].map((social) => (
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
          </motion.div>
        </div>

        {/* Floating Elements - Right Side */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            {/* Terminal Card */}
            <div className="w-80 glass-card p-1 neon-border">
              <div className="bg-black/60 rounded-xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-white/40 font-mono ml-2">~/developer</span>
                </div>

                {/* Terminal Content */}
                <div className="p-4 font-mono text-sm space-y-2">
                  <div>
                    <span className="text-primary">$</span>
                    <span className="text-white/60 ml-2">whoami</span>
                  </div>
                  <div className="text-white/80 pl-4">Full-Stack Developer</div>
                  <div className="mt-3">
                    <span className="text-primary">$</span>
                    <span className="text-white/60 ml-2">experience --years</span>
                  </div>
                  <div className="text-secondary pl-4">6+ years</div>
                  <div className="mt-3">
                    <span className="text-primary">$</span>
                    <span className="text-white/60 ml-2">cat skills.json</span>
                  </div>
                  <div className="text-white/70 pl-4">
                    <span className="text-white/40">{'{'}</span>
                    <br />
                    <span className="pl-4 text-primary">"backend"</span>: <span className="text-green-400">"Laravel, Node.js"</span>,
                    <br />
                    <span className="pl-4 text-primary">"frontend"</span>: <span className="text-green-400">"Vue, React"</span>,
                    <br />
                    <span className="pl-4 text-primary">"passionate"</span>: <span className="text-yellow-400">true</span>
                    <br />
                    <span className="text-white/40">{'}'}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-primary">$</span>
                    <span className="text-white/60">_</span>
                    <span className="w-2 h-4 bg-primary/80 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -left-20 top-10 px-4 py-3 glass-card"
            >
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-xs text-white/50">{locale === 'fa' ? 'پروژه' : 'Projects'}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute -left-16 bottom-20 px-4 py-3 glass-card"
            >
              <div className="text-2xl font-bold text-secondary">6+</div>
              <div className="text-xs text-white/50">{locale === 'fa' ? 'سال تجربه' : 'Years Exp'}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
