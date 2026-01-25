"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { ArrowRight, ArrowLeft, Github, Linkedin, Mail, Sparkles, Code2, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface HeroCreativeProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroCreative({ name, title, description }: HeroCreativeProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');

  const techStack = [
    { name: 'Laravel', icon: '🔴', color: 'from-red-500/20 to-red-600/20' },
    { name: 'Vue.js', icon: '💚', color: 'from-green-500/20 to-emerald-600/20' },
    { name: 'React', icon: '⚛️', color: 'from-blue-500/20 to-cyan-600/20' },
    { name: 'TypeScript', icon: '🔷', color: 'from-blue-600/20 to-indigo-600/20' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-600/20 to-lime-600/20' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-32">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <AuroraBackground showRadialGradient={false}>
          <div className="absolute inset-0" />
        </AuroraBackground>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingParticles count={40} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/30 to-pink-500/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Content */}
      <div className="section-container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="max-w-3xl">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex mb-12"
            >
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full glass-card border border-primary/30">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary shadow-lg shadow-primary/50"></span>
                </span>
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-base font-bold text-primary uppercase tracking-wide">
                  {locale === 'fa' ? 'آماده برای پروژه‌های جدید' : 'Available for new projects'}
                </span>
              </div>
            </motion.div>

            {/* Main Heading with Text Reveal Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                {locale === 'fa' ? (
                  <>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="block text-white"
                    >
                      {name}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="block gradient-text text-glow mt-2"
                    >
                      {title || t('defaultTitle')}
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="block text-white/80 text-5xl sm:text-6xl lg:text-7xl"
                    >
                      Hi, I'm{' '}
                      <span className="gradient-text text-glow">
                        {name.split(' ')[0]}
                      </span>
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="block text-white/60 mt-2"
                    >
                      {title || t('defaultTitle')}
                    </motion.span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Description with Stagger Animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed mb-14 max-w-3xl"
            >
              {description}
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-white/40 uppercase tracking-wider font-semibold">
                  {locale === 'fa' ? 'تکنولوژی‌ها' : 'Tech Stack'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.0 + i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`group relative px-5 py-2.5 rounded-xl bg-gradient-to-br ${tech.color} border border-white/10 hover:border-primary/40 transition-all cursor-default overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center gap-2 text-base font-medium text-white/80">
                      <span className="text-xl">{tech.icon}</span>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons with Magnetic Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-wrap items-center gap-5"
            >
              <MagneticButton>
                <Button
                  as={Link}
                  href={`/${locale}/projects`}
                  size="lg"
                  className="group relative bg-gradient-to-r from-primary to-primary/80 text-black font-bold px-10 py-7 text-lg rounded-2xl hover:shadow-2xl hover:shadow-primary/40 transition-all overflow-hidden"
                  endContent={
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    </motion.div>
                  }
                >
                  <span className="relative z-10">{t('viewMyWork')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  as="a"
                  href="mailto:benyaminrmb@gmail.com"
                  size="lg"
                  variant="bordered"
                  className="group border-2 border-white/20 text-white hover:bg-white/5 hover:border-primary/50 px-10 py-7 text-lg rounded-2xl font-semibold backdrop-blur-sm transition-all"
                  startContent={<Mail className="h-5 w-5" />}
                >
                  {locale === 'fa' ? 'تماس با من' : 'Get in touch'}
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="flex items-center gap-5 mt-12"
            >
              <span className="text-sm text-white/40 uppercase tracking-wider">
                {locale === 'fa' ? 'شبکه‌های اجتماعی' : 'Connect'}
              </span>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: 'https://github.com/benyaminrmb', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/benyaminrmb', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:benyaminrmb@gmail.com', label: 'Email' },
                ].map((social, i) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.1, type: "spring" }}
                  >
                    <MagneticButton>
                      <Button
                        as="a"
                        href={social.href}
                        target={social.href.startsWith('mailto') ? undefined : '_blank'}
                        isIconOnly
                        size="lg"
                        className="glass-card border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all"
                      >
                        <social.icon className="h-5 w-5 text-white/70" />
                      </Button>
                    </MagneticButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Floating Terminal Card */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateX: [0, 5, 0],
                  rotateY: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[420px]"
              >
                {/* Terminal Card */}
                <div className="glass-card neon-border p-1.5 relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl blur-xl" />

                  <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                      <div className="flex gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50 cursor-pointer"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50 cursor-pointer"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50 cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-primary/70" />
                        <span className="text-xs text-white/50 font-mono">~/developer</span>
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 font-mono text-sm space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                      >
                        <span className="text-primary font-bold">$</span>
                        <span className="text-white/70 ml-2">whoami</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        className="text-white/90 pl-4 font-semibold"
                      >
                        Full-Stack Developer
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 }}
                        className="mt-4"
                      >
                        <span className="text-primary font-bold">$</span>
                        <span className="text-white/70 ml-2">experience --years</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 }}
                        className="text-secondary pl-4 font-bold text-lg"
                      >
                        6+ years
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.0 }}
                        className="mt-4"
                      >
                        <span className="text-primary font-bold">$</span>
                        <span className="text-white/70 ml-2">cat skills.json</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        className="text-white/80 pl-4 leading-relaxed"
                      >
                        <span className="text-white/50">{'{'}</span>
                        <br />
                        <span className="pl-4 text-primary">"backend"</span>:{' '}
                        <span className="text-green-400">"Laravel, Node.js"</span>,
                        <br />
                        <span className="pl-4 text-primary">"frontend"</span>:{' '}
                        <span className="text-cyan-400">"Vue, React, Next"</span>,
                        <br />
                        <span className="pl-4 text-primary">"passionate"</span>:{' '}
                        <span className="text-yellow-400">true</span>
                        <br />
                        <span className="text-white/50">{'}'}</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.4 }}
                        className="flex items-center gap-2 mt-4 pt-2"
                      >
                        <span className="text-primary font-bold">$</span>
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2.5 h-5 bg-primary/90 shadow-lg shadow-primary/50"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="absolute -left-24 top-20 glass-card px-5 py-4 border border-primary/30 rounded-xl"
                >
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <div className="text-xs text-white/60 mt-1">
                    {locale === 'fa' ? 'پروژه' : 'Projects'}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.8, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="absolute -left-20 bottom-24 glass-card px-5 py-4 border border-secondary/30 rounded-xl"
                >
                  <div className="text-3xl font-bold text-secondary">6+</div>
                  <div className="text-xs text-white/60 mt-1">
                    {locale === 'fa' ? 'سال تجربه' : 'Years'}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 uppercase tracking-wider">
            {locale === 'fa' ? 'اسکرول کنید' : 'Scroll'}
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
